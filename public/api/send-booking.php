<?php
declare(strict_types=1);

/**
 * Boutique HTML Booking Mailer for grochowskapsycholog.pl (OVH PHP 8.x)
 * - Delivers a custom editorial HTML + plain-text email to euro169@wp.pl
 * - Sends an optional bilingual (PL / RU) confirmation email to the patient
 * - Hardened against CRLF header injection, XSS, spam bots, and burst abuse
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

const RECIPIENT_EMAIL = 'euro169@wp.pl';
const SENDER_EMAIL = 'rezerwacje@grochowskapsycholog.pl';
const SENDER_NAME = 'Gabinet mgr Lucyny Grochowskiej';
const PRACTICE_PHONE = '+48 664 411 496';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Lightweight Origin / Host sanity check
$allowedHosts = [
    'grochowskapsycholog.pl',
    'www.grochowskapsycholog.pl',
    'grochol.cluster129.hosting.ovh.net',
];
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $originHost = strtolower((string) parse_url((string) $_SERVER['HTTP_ORIGIN'], PHP_URL_HOST));
    if ($originHost !== '' && !in_array($originHost, $allowedHosts, true)) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'forbidden_origin']);
        exit;
    }
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

// Silent drop for spam bots filling hidden honeypot
if (!empty($data['_honey'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Simple per-IP rate limiting (max 8 requests per 15 minutes)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/lucyna_booking_' . hash('sha256', $ip) . '.json';
$now = time();
$window = 900;
$hits = [];
if (is_file($rateFile)) {
    $decoded = json_decode((string) @file_get_contents($rateFile), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static fn($ts) => is_int($ts) && ($now - $ts) < $window));
    }
}
if (count($hits) >= 8) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'rate_limited']);
    exit;
}
$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

function cleanLine(mixed $val, int $maxLen = 220): string {
    $s = is_string($val) ? trim($val) : '';
    $s = str_replace(["\r", "\n"], ' ', $s);
    $s = preg_replace('/\s{2,}/u', ' ', $s) ?? $s;
    return mb_substr($s, 0, $maxLen, 'UTF-8');
}

function cleanMultiline(mixed $val, int $maxLen = 2000): string {
    $s = is_string($val) ? trim($val) : '';
    $s = str_replace("\r\n", "\n", $s);
    return mb_substr($s, 0, $maxLen, 'UTF-8');
}

function esc(string $val): string {
    return htmlspecialchars($val, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function encodeHeader(string $val): string {
    return '=?UTF-8?B?' . base64_encode($val) . '?=';
}

$lang = ($data['lang'] ?? 'pl') === 'ru' ? 'ru' : 'pl';
$name = cleanLine($data['name'] ?? '', 120);
$phone = cleanLine($data['phone'] ?? '', 40);
$email = cleanLine($data['email'] ?? '', 160);
$sessionType = cleanLine($data['sessionType'] ?? '', 200);
$location = cleanLine($data['location'] ?? '', 120);
$preferredDay = cleanLine($data['preferredDay'] ?? '', 80);
$preferredTime = cleanLine($data['preferredTime'] ?? '', 80);
$note = cleanMultiline($data['note'] ?? '', 2000);

if ($name === '' || ($phone === '' && $email === '')) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'missing_required_fields']);
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

date_default_timezone_set('Europe/Warsaw');
$timestamp = date('d.m.Y, H:i');
$langBadge = $lang === 'ru' ? 'RU · Rosyjski' : 'PL · Polski';

$phoneCleanHref = preg_replace('/[^\d+]/', '', $phone) ?? '';
$phoneHtml = $phone !== ''
    ? '<a href="tel:' . esc($phoneCleanHref) . '" style="color:#2B423B;text-decoration:none;font-weight:600;">' . esc($phone) . '</a>'
    : '<span style="color:#8A928D;">Nie podano</span>';

$emailHtml = $email !== ''
    ? '<a href="mailto:' . esc($email) . '" style="color:#2B423B;text-decoration:underline;">' . esc($email) . '</a>'
    : '<span style="color:#8A928D;">Nie podano</span>';

$noteHtml = $note !== ''
    ? nl2br(esc($note))
    : '<span style="color:#8A928D;font-style:italic;">Brak dodatkowej wiadomości</span>';

$actionButtonsHtml = '';
if ($phone !== '') {
    $actionButtonsHtml .= '<a href="tel:' . esc($phoneCleanHref) . '" style="display:inline-block;background:#2B423B;color:#F6F3EE;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;font-weight:600;margin-right:10px;margin-bottom:8px;">Zadzwoń do pacjenta</a>';
}
if ($email !== '') {
    $replySubj = rawurlencode('Re: Konsultacja psychologiczna — mgr Lucyna Grochowska');
    $actionButtonsHtml .= '<a href="mailto:' . esc($email) . '?subject=' . $replySubj . '" style="display:inline-block;background:#EFEAE1;color:#1D2220;border:1px solid #D8CFC2;text-decoration:none;padding:11px 22px;border-radius:999px;font-size:13px;font-weight:600;margin-bottom:8px;">Odpowiedz e-mailem</a>';
}

// =========================================================================
// 1. LUXURY EDITORIAL HTML EMAIL TO LUCYNA (euro169@wp.pl)
// =========================================================================
$ownerSubject = sprintf('[Rezerwacja · %s] %s — %s', strtoupper($lang), $name, $location);

$escName = esc($name);
$escLocation = esc($location);
$escDay = esc($preferredDay);
$escTime = esc($preferredTime);
$escSession = esc($sessionType);

$ownerHtml = <<<HTML
<!doctype html>
<html lang="pl">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#F6F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1D2220;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F6F3EE;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:#FAF8F4;border:1px solid #E2DBD0;">
          <!-- Deep Pine Header -->
          <tr>
            <td style="background-color:#1A2723;padding:28px 32px;">
              <p style="margin:0;font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#C9A484;">
                NOWE ZAPYTANIE ZE STRONY · GROCHOWSKAPSYCHOLOG.PL
              </p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;line-height:1.2;color:#F6F3EE;">
                Prośba o konsultację — {$escName}
              </h1>
              <p style="margin:10px 0 0;font-size:12px;color:#C5CFCB;">
                {$timestamp} · Język formularza: <strong style="color:#F6F3EE;">{$langBadge}</strong>
              </p>
            </td>
          </tr>

          <!-- Highlight Strip -->
          <tr>
            <td style="background-color:#EFEAE1;padding:14px 32px;border-bottom:1px solid #E2DBD0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="font-size:12px;color:#5D6560;">
                    <strong style="color:#1D2220;">{$escLocation}</strong> &nbsp;·&nbsp; {$escDay} &nbsp;·&nbsp; {$escTime}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Details Table -->
          <tr>
            <td style="padding:26px 32px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;width:36%;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">Imię pacjenta</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:15px;font-weight:600;color:#1D2220;">{$escName}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">Telefon</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:15px;color:#1D2220;">{$phoneHtml}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">E-mail</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:14px;color:#1D2220;">{$emailHtml}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">Forma spotkania</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:14px;color:#1D2220;">{$escSession}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">Lokalizacja</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:14px;color:#1D2220;">{$escLocation}</td>
                </tr>
                <tr>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:#8C5E3E;vertical-align:top;">Preferowany termin</td>
                  <td style="padding:11px 0;border-bottom:1px solid #EBE5DC;font-size:14px;color:#1D2220;">{$escDay} · {$escTime}</td>
                </tr>
              </table>

              <!-- Message Box -->
              <div style="margin-top:20px;background-color:#F6F3EE;border-left:3px solid #8C5E3E;padding:16px 18px;">
                <p style="margin:0 0 6px;font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:#8C5E3E;">Wiadomość od pacjenta</p>
                <p style="margin:0;font-size:14px;line-height:1.68;color:#3F4642;">{$noteHtml}</p>
              </div>

              <!-- Quick Actions -->
              <div style="margin-top:24px;">
                {$actionButtonsHtml}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #EBE5DC;font-size:11.5px;line-height:1.6;color:#5D6560;">
              Zgoda RODO potwierdzona w formularzu. Kliknięcie „Odpowiedz” w programie pocztowym skieruje wiadomość bezpośrednio do pacjenta.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$ownerPlain = "NOWE ZAPYTANIE O KONSULTACJĘ (grochowskapsycholog.pl)\n"
    . "Data: {$timestamp} | Język: {$langBadge}\n"
    . "--------------------------------------------------\n"
    . "Imię: {$name}\n"
    . "Telefon: " . ($phone !== '' ? $phone : 'Nie podano') . "\n"
    . "E-mail: " . ($email !== '' ? $email : 'Nie podano') . "\n"
    . "Forma spotkania: {$sessionType}\n"
    . "Lokalizacja: {$location}\n"
    . "Preferowany termin: {$preferredDay} · {$preferredTime}\n"
    . "Wiadomość:\n" . ($note !== '' ? $note : '(brak dodatkowej wiadomości)') . "\n"
    . "--------------------------------------------------\n"
    . "Zgoda RODO: Tak\n";

function sendMultipartMail(
    string $to,
    string $subject,
    string $plainText,
    string $htmlBody,
    string $replyTo
): bool {
    $boundary = 'b_' . bin2hex(random_bytes(12));
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . encodeHeader(SENDER_NAME) . ' <' . SENDER_EMAIL . '>',
        'Reply-To: ' . $replyTo,
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        'X-Mailer: GrochowskaPsycholog-Booking/1.0',
    ];

    $body = "--{$boundary}\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($plainText)) . "\r\n"
        . "--{$boundary}\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($htmlBody)) . "\r\n"
        . "--{$boundary}--\r\n";

    $sent = @mail($to, encodeHeader($subject), $body, implode("\r\n", $headers), '-f ' . SENDER_EMAIL);
    if (!$sent) {
        // Fallback without -f envelope flag if OVH cluster wrapper restricts additional_params
        $sent = @mail($to, encodeHeader($subject), $body, implode("\r\n", $headers));
    }
    return $sent;
}

$ownerSent = sendMultipartMail(
    RECIPIENT_EMAIL,
    $ownerSubject,
    $ownerPlain,
    $ownerHtml,
    $email !== '' ? $email : RECIPIENT_EMAIL
);

if (!$ownerSent) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'mail_delivery_failed']);
    exit;
}

// =========================================================================
// 2. WARM BILINGUAL AUTO-CONFIRMATION TO PATIENT (if patient provided email)
// =========================================================================
if ($email !== '') {
    $escName = esc($name);
    $escSession = esc($sessionType);
    $escLoc = esc($location);
    $escDay = esc($preferredDay);
    $escTime = esc($preferredTime);
    $phoneHref = 'tel:+48664411496';

    if ($lang === 'ru') {
        $patSubject = 'Запрос получен — mgr Луцина Гроховская (психолог, Гдыня / онлайн)';
        $patHeading = "Спасибо за сообщение, {$escName}.";
        $patIntro = 'Я получила ваш запрос на консультацию. Отвечу лично в течение 24 часов в рабочие дни, чтобы согласовать точное время встречи.';
        $patSummaryTitle = 'Детали вашего запроса';
        $patContactNote = 'Если вам удобнее связаться быстрее, вы можете позвонить по номеру ';
        $patFooter = 'mgr Луцина Гроховская · Психолог, психотравматолог · Гдыня (ul. Chwarznieńska 136–138 / ul. 3 Maja 30/21) и онлайн · grochowskapsycholog.pl';
        $patPlain = "Здравствуйте, {$name}!\n\nЯ получила ваш запрос на консультацию и отвечу лично в течение 24 часов в рабочие дни.\n\n"
            . "Детали запроса:\n- Формат: {$sessionType}\n- Локация: {$location}\n- Предпочитаемое время: {$preferredDay} · {$preferredTime}\n\n"
            . "Контакт: " . PRACTICE_PHONE . " | " . RECIPIENT_EMAIL . "\n"
            . "mgr Луцина Гроховская · https://grochowskapsycholog.pl\n";
    } else {
        $patSubject = 'Potwierdzenie zgłoszenia — mgr Lucyna Grochowska (psycholog Gdynia / online)';
        $patHeading = "Dziękuję za wiadomość, {$escName}.";
        $patIntro = 'Otrzymałam Twoje zapytanie o konsultację. Odpowiem osobiście w ciągu 24 godzin w dni robocze z propozycją dokładnej godziny spotkania.';
        $patSummaryTitle = 'Podsumowanie Twojego zgłoszenia';
        $patContactNote = 'W pilniejszych sprawach możesz też zadzwonić bezpośrednio pod numer ';
        $patFooter = 'mgr Lucyna Grochowska · Psycholog, psychotraumatolog · Gdynia (ul. Chwarznieńska 136–138 / ul. 3 Maja 30/21) i online · grochowskapsycholog.pl';
        $patPlain = "Dzień dobry, {$name}!\n\nOtrzymałam Twoje zapytanie o konsultację i odpowiem osobiście w ciągu 24 godzin w dni robocze.\n\n"
            . "Podsumowanie:\n- Forma: {$sessionType}\n- Lokalizacja: {$location}\n- Preferowany termin: {$preferredDay} · {$preferredTime}\n\n"
            . "Kontakt: " . PRACTICE_PHONE . " | " . RECIPIENT_EMAIL . "\n"
            . "mgr Lucyna Grochowska · https://grochowskapsycholog.pl\n";
    }

    $patHtml = <<<HTML
<!doctype html>
<html lang="{$lang}">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#F6F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1D2220;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F6F3EE;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;background-color:#FAF8F4;border:1px solid #E2DBD0;">
          <tr>
            <td style="background-color:#1A2723;padding:26px 32px;">
              <p style="margin:0;font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#C9A484;">
                GROCHOWSKAPSYCHOLOG.PL
              </p>
              <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#F6F3EE;">
                {$patHeading}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 32px;">
              <p style="margin:0;font-size:15px;line-height:1.75;color:#3F4642;">{$patIntro}</p>

              <div style="margin-top:20px;background-color:#F6F3EE;border:1px solid #E5DDD1;padding:16px 20px;">
                <p style="margin:0 0 8px;font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:#8C5E3E;">{$patSummaryTitle}</p>
                <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#1D2220;">{$escSession}</p>
                <p style="margin:0;font-size:13.5px;color:#4E5551;">{$escLoc} · {$escDay} · {$escTime}</p>
              </div>

              <p style="margin:20px 0 0;font-size:13.5px;line-height:1.7;color:#4E5551;">
                {$patContactNote}<a href="{$phoneHref}" style="color:#2B423B;font-weight:600;text-decoration:none;">+48 664 411 496</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 22px;border-top:1px solid #EBE5DC;font-size:11.5px;line-height:1.6;color:#5D6560;">
              {$patFooter}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

    // Best-effort confirmation to patient (never fails the primary booking)
    sendMultipartMail($email, $patSubject, $patPlain, $patHtml, RECIPIENT_EMAIL);
}

echo json_encode(['ok' => true]);
