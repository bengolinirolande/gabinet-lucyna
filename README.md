# Gabinet Psychologiczny i Psychoterapeutyczny — Trójmiasto (Gdańsk · Gdynia · Online)

Nowoczesna, edytorska strona prywatnej praktyki psychologicznej zaprojektowana w estetyce **Minimal Editorial Luxury** (Awwwards / FWA / Codrops / czołowe gabinety solo z NYC i LA).

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona działa pod adresem `http://localhost:5173`.

## Struktura strony (4 kompaktowe widoki)

Strona jest podzielona na 4 przejrzyste widoki z pełnoekranowym przejściem edytorskim (hash routing, bez przeładowania strony i gotowe pod dowolny hosting statyczny):

- **Start** (`#/`) — otwarcie z bieżącym statusem gabinetu, powolna wstęga Trójmiasta, katalog rozdziałów, Wizytówka Google 5,0, ćwiczenie oddechu 4–4–6 oraz kadr Zatoki Gdańskiej.
- **Terapia** (`#/terapia`) — obszary wsparcia z podglądem edytorskim, proces pierwszej wizyty i filozofia pracy.
- **O mnie** (`#/o-mnie`) — bio, kwalifikacje i akredytacje, manifest przewijany ze scrollem oraz opinie pacjentów.
- **Gabinety i cennik** (`#/gabinety`) — Gdańsk Wrzeszcz, Gdynia Śródmieście, Online, przejrzysty cennik, Wizytówka Google z mapą Zatoki Gdańskiej oraz FAQ.

## Budowanie wersji produkcyjnej

```bash
npm run build
```

Gotowe pliki statyczne trafią do folderu `dist/`.

---

## Jak podpiąć swój e-mail pod rezerwacje (1 zmiana!)

1. Otwórz plik `src/data/practice.ts`.
2. Na samej górze pliku zmień pole `bookingRecipientEmail` na swój prawdziwy adres e-mail (np. Gmail lub adres w domenie gabinetu):
   ```ts
   bookingRecipientEmail: 'twoj.email@gmail.com',
   ```
3. Otwórz stronę, wypełnij raz testowo panel **Umów konsultację** i kliknij **Wyślij rezerwację na e-mail gabinetu**.
4. Na podaną skrzynkę przyjdzie jednorazowy e-mail aktywacyjny od **FormSubmit** — kliknij przycisk potwierdzenia.
5. Od tego momentu **każda rezerwacja ze strony trafia automatycznie jako czytelna tabela na Twój e-mail** (z ustawionym `Reply-To` na adres pacjenta i ochroną antyspamową `_honey`).

## Podpięcie Wizytówki Google (Google Business Profile)

W tym samym pliku `src/data/practice.ts` w obiekcie `googleProfile` podmień:
- `rating` i `reviewCount` (aktualna ocena i liczba opinii),
- `profileUrl` (link do Twojej Wizytówki Google),
- `writeReviewUrl` (bezpośredni link „Poproś o opinie” z panelu Google),
- `mapsGdanskUrl` / `mapsGdyniaUrl` (linki nawigacji do gabinetów),
- `featuredReviews` (wybrane cytaty opinii).

## Spis fotografii edytorskich (`public/images/`)

- `portrait-lucyna.jpg` — portret główny (3:4)
- `lucyna-detail.jpg` — kadr detalu „O mnie” (4:3)
- `gabinet-gdansk.jpg` — wnętrze gabinetu Gdańsk Wrzeszcz (4:3)
- `gdansk-kamienica-entrance.jpg` — podwórze kamienicy Gdańsk Wrzeszcz (4:3)
- `gabinet-gdynia.jpg` — wnętrze gabinetu Gdynia Śródmieście (4:3)
- `baltic-shore-calm.jpg` — poranek nad Zatoką Gdańską / Orłowo (16:9)
- `baltic-pine-path.jpg` — nadmorska ścieżka sosnowa w Trójmieście (4:3)
- `editorial-sanctuary-tea.jpg` — kompozycja z herbatą na dębowym stole (4:3)
- `editorial-light-architecture.jpg` — architektura światła i trawertynu (3:4)
- `still-life-calm.jpg` — kompozycja nastrojowa do sekcji Filozofia pracy (3:4)
- `sanctuary-corner.jpg` — kącik z fotelem w sekcji FAQ (3:4)
