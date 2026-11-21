# mgr Lucyna Grochowska — Gabinet Psychologiczny i Psychoterapeutyczny (Gdynia · Online)

Nowoczesna, edytorska strona prywatnej praktyki psychologicznej **mgr Lucyny Grochowskiej** (psycholog, psychotraumatolog, psychoterapeutka w nurcie psychodynamicznym i seksuolog kliniczny w trakcie certyfikacji), zsynchronizowana z oficjalnymi profilami:
- [ZnanyLekarz.pl](https://www.znanylekarz.pl/profil/lucyna-grochowska)
- [TwójPsycholog.pl](https://twojpsycholog.pl/profil-psychologa/lucyna-grochowska-11618)

Podgląd online (GitHub Pages): **https://bengolinirolande.github.io/gabinet-lucyna/**

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona działa pod adresem `http://localhost:5173`.

## Struktura strony (4 kompaktowe widoki)

- **Start** (`#/`) — otwarcie z prawdziwym portretem mgr Lucyny Grochowskiej, powolna wstęga specjalizacji i lokalizacji, katalog rozdziałów, pasek zaufania ZnanyLekarz `5,0`, ćwiczenie oddechu 4–4–6 oraz kadr Zatoki Gdańskiej.
- **Terapia** (`#/terapia`) — 6 obszarów wsparcia (stany lękowe/depresja, psychotraumatologia, relacje i pary, seksuologia kliniczna, tożsamość/osobowość, interwencja kryzysowa/uzależnienia), przebieg pierwszych spotkań oraz filozofia pracy.
- **O mnie** (`#/o-mnie`) — bio z prawdziwym zdjęciem w gabinecie, wykształcenie (UKW, Triada, UAM, Vis Salutis), 8-letnie doświadczenie kliniczne, standardy superwizji i zweryfikowane opinie 5,0 z ZnanyLekarz.pl.
- **Gabinety i cennik** (`#/gabinety`) — Gdynia Witomino (`ul. Chwarznieńska 136–138`), Gdynia Śródmieście (`Przychodnia Medyczna Gdynia, ul. gen. Bema 16/2`), Online (`PL / RU`), cennik od 200 zł, sekcja profili z mapą Gdyni oraz FAQ.

## Jak podpiąć docelowy e-mail pod rezerwacje (1 zmiana)

1. Otwórz plik `src/data/practice.ts`.
2. Zmień pole `bookingRecipientEmail` (oraz `email` i opcjonalnie prywatny `phoneDisplay`) na docelowy adres skrzynki gabinetu.
3. Po publikacji wyślij raz testowo formularz **Umów konsultację** i kliknij jednorazowy link aktywacyjny od **FormSubmit**, który przyjdzie na podany adres.
4. Od tego momentu każda rezerwacja ze strony trafia bezpośrednio jako tabela na wskazaną skrzynkę.

## Spis fotografii (`public/images/`)

- `portrait-lucyna.jpg` — prawdziwy portret główny mgr Lucyny Grochowskiej (z TwójPsycholog.pl)
- `lucyna-office.jpg` — prawdziwe zdjęcie mgr Lucyny Grochowskiej w gabinecie (z TwójPsycholog.pl)
- Pozostałe kadry (`gabinet-gdynia.jpg`, `gabinet-gdansk.jpg`, `baltic-shore-calm.jpg`, `baltic-pine-path.jpg`, `editorial-sanctuary-tea.jpg`, `editorial-light-architecture.jpg`, `still-life-calm.jpg`, `sanctuary-corner.jpg`, `lucyna-detail.jpg`, `gdansk-kamienica-entrance.jpg`) — spójne fotografie edytorskie klimatu Gdyni i Trójmiasta.
