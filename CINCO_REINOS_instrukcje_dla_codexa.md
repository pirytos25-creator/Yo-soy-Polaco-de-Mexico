# CINCO REINOS — Interaktywna nauka hiszpańskiego
## Pełna specyfikacja projektu dla Codexa

---

## 0. Metadane projektu

**Nazwa robocza:** Cinco Reinos (Pięć Królestw)
**Cel biznesowy:** aplikacja do nauki hiszpańskiego (kolumbijsko-latynoamerykański wariant) dla polskojęzycznego początkującego, który uczy się żeby zaskoczyć koleżankę z Kolumbii.
**Cel estetyczny:** doświadczenie ma NIE wyglądać jak generyczna aplikacja edukacyjna ani jak generyczny czat AI. Ma wyglądać jak gra RPG / interaktywna książka z klimatem mezoamerykańsko-hiszpańskim high-fantasy.
**Metafora rdzeniowa:** użytkownik jest podróżnikiem, który przemierza pięć królestw fikcyjnego świata. Każde królestwo to inna sekcja/kategoria nauki. Postępy = reputacja w królestwach. Zadania = próby lokalnych mieszkańców. AI-asystent = towarzysząca w podróży postać (curandera, przewodniczka).

**Poziom ambicji:** przyjmij że masz nieograniczony budżet czasu. Wolno Ci zbudować rzeczy nieoczywiste, długie, szczegółowe. Jeżeli mam wybór między "prosto ale generycznie" a "skomplikowanie ale nieszablonowo" — zawsze wybieraj to drugie.

---

## 1. Filozofia projektu — twarde zasady

Codex, zanim napiszesz jakąkolwiek linijkę, przeczytaj i przyjmij:

1. **Diegetyczny UI.** Żadne "menu", "postęp", "score", "dashboard", "notifications". Zamiast tego: "mapa świata", "reputacja u ludu", "monety miedziane / srebrne / złote", "zwoje", "pergaminy", "sen wieszczy". Każdy element interfejsu istnieje w świecie przedstawionym. Napisy "Loading...", "Error 404", "Submit" są zakazane — mają być zastąpione klimatycznymi odpowiednikami ("Gwiazdy się przesuwają...", "Ścieżka zaginęła w mgle", "Wypowiedz zaklęcie").

2. **Nie wygląda jak Duolingo, Anki, Babbel ani ChatGPT.** Jeżeli robisz coś co widziałeś na 100 innych stronach — przemyśl to jeszcze raz. Zielona sowa jest zakazana. Karuzela fiszek jest zakazana. Emoji flag jest zakazane. Standardowy chat bubble z awatarem robota jest zakazany.

3. **Bogata warstwa wizualna.** Strona ma być pełna ilustracji, ozdobników, ramek, tekstur (papel picado, tkaniny wolne, hieroglify, mozaiki). Grafika nie jest dekoracją — jest częścią nauki. Słowo "el jaguar" pojawia się razem z ilustracją jaguara, nie samo.

4. **Immersja przez ścieżkę dźwiękową i mikro-animacje.** Kliknięcie robi "chime" jak dzwoneczek. Przejścia to fade + subtelne particles. Hover na słowie żarzy się złotem. Poprawna odpowiedź to płomień świecy, błędna to trzask. Wszystko delikatne — nigdy dyskoteka.

5. **Zero placeholderów typu "lorem ipsum" i "TODO".** Jeśli czegoś nie masz — wygeneruj sensowną treść. Jeśli grafiki brakuje — narysuj SVG. Nigdy nie zostawiaj `<img src="placeholder.jpg">`.

6. **Fallbacki dla Ollamy.** Ollama może nie być uruchomiona. Kod ma to obsłużyć elegancko: przełączyć się na tryb "asystent milczy" (klimatycznie: "Curandera zasnęła... spróbuj zbudzić ją później") i pokazać instrukcję jak odpalić Ollamę.

---

## 2. Świat przedstawiony — kanon

### Pięć Królestw (Cinco Reinos)

Każde królestwo to jedna główna zakładka i kategoria wiedzy. Zbudowano je tak, żeby pokrywały tematy nauki hiszpańskiego bez wyglądania jak zakładki nauki hiszpańskiego.

| # | Królestwo | Tema in-world | Tema edukacyjna | Kolor motywu | Element |
|---|-----------|---------------|-----------------|--------------|---------|
| 1 | **El Pueblo del Alba** (Miasto Świtu) | Miasteczko na płaskowyżu, mieszkańcy handlują z podróżnikami | Podstawy: powitania, przedstawienia, rodzina, dom, jedzenie | Bursztyn + terakota | Ogień (świt) |
| 2 | **La Selva de Jade** (Nefrytowa Dżungla) | Wilgotny las pełen jaguarów, tukanów i duchów-alebrijes | Natura, zwierzęta, kolory, ciało | Zieleń nefrytowa + turkus | Woda / roślinność |
| 3 | **El Desierto de los Huesos** (Pustynia Kości) | Wielka pustynia z misjami-świątyniami; strażniczki tkają czas | Czas, liczby, gramatyka (odmiana, ser/estar) | Ochra + czerwień | Ziemia (piasek) |
| 4 | **Las Montañas del Corazón** (Góry Serca) | Wysokogórskie wioski; ludzie mówią o uczuciach śpiewając | Emocje, przymiotniki, relacje, gustar | Fiolet górski + róż amaranth | Powietrze |
| 5 | **La Ciudad de Espejos** (Miasto Luster) | Metropolia na wyspie; nowoczesne slangi, karnawał | Slang kolumbijski, kultura Karnawału, ¡chévere!, ¡chimba! | Turkus karaibski + złoto | Duch (odbicie) |

### Postacie NPC (do wyprowadzenia w treści i asystentach)

- **Doña Esperanza** — curandera z Pueblo del Alba, siwa kobieta z ziołami, główna towarzyszka; obsługuje asystenta AI (Ollama). Mówi ciepło, matczyno, cierpliwie, po polsku z hiszpańskim akcentem (wtrącenia typu "mijo", "ay, corazón").
- **El Guardián del Jaguar** — nema strażniczka Selvy, komunikuje się rebusami i głosem jaguara; prowadzi zadania w królestwie 2.
- **La Tejedora del Tiempo** — tkaczka na pustyni, wyjaśnia gramatykę jak sploty nici; królestwo 3.
- **Los Cantores** — chór z gór, uczy odmiany przez śpiew; królestwo 4.
- **Parcero Diego** — luzacki miejski kolumbijski chłopak (nawiązanie do "parce"), uczy slangu; królestwo 5.

Każda postać ma **własny styl mówienia** (definiowany w kodzie jako `persona.systemPrompt` dla Ollamy) i **własny wizerunek** (ilustracja SVG lub PNG).

### Terminologia diegetyczna (obowiązująca w UI)

| Standardowa nazwa | Nasza nazwa |
|-------------------|-------------|
| Level / poziom | Rango (ranga podróżnika) |
| XP / punkty | Chispas (iskry) |
| Streak (seria dni) | Llama sagrada (święty płomień — gaśnie gdy się nie ćwiczy) |
| Osiągnięcia | Talismanes (talizmany) |
| Fiszki | Papelitos (karteczki-wróżby) |
| Test | Prueba (próba) |
| Reset | Renacer (odrodzenie) |
| Settings | El pacto (pakt z curanderą) |
| Logout | Adiós, viajero |
| Loading | Las estrellas se alinean... |
| Error | El camino se perdió |
| Submit | ¡Dilo! (Powiedz to!) |

---

## 3. Stos technologiczny

**Frontend:** czysty **Vite + Vanilla TypeScript** (bez React). Powód: nieszablonowość, kontrola nad każdym pikselem, brak overhead frameworka na proste UI, łatwo pisać niestandardowe animacje SVG bez walki z re-renderami.

**Styling:** CSS zmienne (design tokens), moduły CSS, `postcss-nested`. NIE tailwind (za bardzo utility-first, nie pasuje do bogatej estetyki). Dodatkowo **CSS Houdini / @property** dla animowanych gradientów.

**Animacje:** GSAP dla scen wchodzenia i przejść między zakładkami, natywne CSS animations dla mikro-interakcji.

**Grafiki:**
- **SVG** — dla wszystkich ikon, ozdobników, mini-postaci, dekoracji ramek. Piszemy w kodzie (nie importujemy pojedynczych plików SVG do znaczników).
- **PNG/WEBP** — dla większych ilustracji postaci, mapy świata, tła krajobrazu królestw. Przechowywane w `public/art/`.
- **Prompty do generowania:** wszystkie brakujące PNG mają towarzyszący plik `PROMPTS.md` (patrz sekcja 8).

**Backend:** minimalny **Node.js + Fastify** (nie Express — Fastify jest lżejsze i szybsze) tylko po to, żeby proxować Ollamę (unikać CORS) i serwować pliki statyczne w produkcji. W dev — `vite dev` z proxy na `/api → localhost:3000`.

**Ollama:** klient rozmawia z lokalną Ollamą przez proxy `/api/chat`. Model domyślny: `llama3.1:8b-instruct` (jeśli user ma). Fallback: `qwen2.5:7b`. Konfigurowalne w `.env.local`.

**Persistence:** `localStorage` dla postępu ucznia (brak konta, brak bazy danych — świadomie). Klucze pod jednym prefixem `cincoreinos:*`.

**Testing:** Vitest dla logiki (sprawdzanie odpowiedzi, generowanie zadań, redukcja stanu ucznia).

---

## 4. Struktura katalogów

```
cinco-reinos/
├── README.md                          # Krótki opis, jak odpalić
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example                       # OLLAMA_URL, MODEL_NAME
├── PROMPTS.md                         # Prompty dla generowania grafik AI (Stable Diffusion / MJ)
│
├── server/
│   ├── index.ts                       # Fastify server, proxy do Ollamy
│   └── personas.ts                    # Systemy 5 postaci (system prompts)
│
├── public/
│   ├── art/
│   │   ├── mapa-mundi.webp            # Mapa 5 królestw (ilustracja mestizo-fantasy)
│   │   ├── personas/
│   │   │   ├── dona-esperanza.webp    # Portret curandery
│   │   │   ├── guardian-jaguar.webp
│   │   │   ├── tejedora.webp
│   │   │   ├── cantor.webp
│   │   │   └── parcero-diego.webp
│   │   ├── reinos/
│   │   │   ├── pueblo-alba-bg.webp    # Tło królestwa 1 (parallax)
│   │   │   ├── selva-jade-bg.webp
│   │   │   ├── desierto-huesos-bg.webp
│   │   │   ├── montanas-corazon-bg.webp
│   │   │   └── ciudad-espejos-bg.webp
│   │   ├── vocab/                     # Ilustracje słówek dla trybu wizualnej fiszki
│   │   │   ├── el-jaguar.webp
│   │   │   ├── el-colibri.webp
│   │   │   ├── la-luna.webp
│   │   │   └── ...                    # ~60 kluczowych rzeczowników
│   │   └── talismanes/                # Ikony osiągnięć w stylu prekolumbijskim
│   │       ├── colibri-de-oro.svg
│   │       ├── serpiente-emplumada.svg
│   │       └── ...
│   ├── fonts/
│   │   ├── Cinzel-Decorative-Regular.woff2  # tytuły, mistyczne
│   │   ├── Cormorant-Garamond-Regular.woff2 # narracja
│   │   ├── Chivo-Regular.woff2              # UI podstawowy
│   │   └── PT-Serif-Italic.woff2            # dialogi postaci
│   └── audio/
│       ├── chime-correct.ogg
│       ├── flame-extinguish.ogg
│       ├── page-turn.ogg
│       ├── jungle-ambient.ogg           # Loopy tła królestw (opcjonalne)
│       └── desert-wind.ogg
│
├── src/
│   ├── main.ts                          # Bootstrap: init state, router, mount pierwsza scena
│   ├── styles/
│   │   ├── tokens.css                   # CSS variables — kolory 5 królestw, spacing, radius
│   │   ├── typography.css               # @font-face + skala
│   │   ├── decor.css                    # Ozdobniki: papel picado border, ramki w stylu retablo
│   │   ├── animations.css               # keyframes: flicker, breathe, sway
│   │   └── global.css                   # Reset, base
│   │
│   ├── core/
│   │   ├── state.ts                     # Store: postęp, chispas, ranga, talismany, streak
│   │   ├── persistence.ts               # localStorage wrapper
│   │   ├── router.ts                    # Prosta zmiana widoków (hash routing)
│   │   ├── audio.ts                     # Cichy manager dźwięków z toggle
│   │   ├── i18n.ts                      # Statyczne teksty PL (główny język UI)
│   │   └── prng.ts                      # Seedowany PRNG do wróżb i zadań
│   │
│   ├── data/
│   │   ├── vocab.ts                     # 1000+ słów podzielone po królestwach + metadane
│   │   ├── frases.ts                    # 200+ zwrotów kolumbijskich i uniwersalnych
│   │   ├── gramatyka.ts                 # 8 lekcji gramatyki z przykładami
│   │   ├── retos.ts                     # Definicje zadań/prób (min. 5 typów × 5 królestw)
│   │   ├── talismanes.ts                # Definicje osiągnięć z warunkami
│   │   └── loreCards.ts                 # "Karty świata" – kulturowe ciekawostki jako zbieralne
│   │
│   ├── screens/
│   │   ├── portada/                     # Scena tytułowa (patrz sekcja 5)
│   │   ├── mapa/                        # Mapa 5 królestw
│   │   ├── reino/                       # Widok pojedynczego królestwa
│   │   ├── curandera/                   # Chat z Ollamą (Doña Esperanza)
│   │   ├── biblioteka/                  # Encyklopedia słów + gramatyki (drewniana biblioteka)
│   │   ├── talismanes/                  # Galeria osiągnięć
│   │   ├── retos/                       # Widok pojedynczego zadania
│   │   └── pacto/                       # Ustawienia
│   │
│   ├── games/                           # Modułowe mini-gry — patrz sekcja 6
│   │   ├── loteria/                     # Lotería mexicana z hiszpańskimi słowami
│   │   ├── mercado/                     # Symulacja targu — dialog handlowy
│   │   ├── tejedora/                    # Puzzle gramatyczne (splot słów)
│   │   ├── ritmo/                       # Rhythm-game do wymowy z Web Speech API
│   │   ├── ofrenda/                     # Układanka słów jako ofiara Dnia Zmarłych
│   │   └── carnaval/                    # Slang match — kolumbijskie wyrażenia
│   │
│   ├── components/                      # Powtarzalne bloki (klasy TS renderujące HTMLElement)
│   │   ├── FramePicado.ts               # Ramka w stylu papel picado (SVG)
│   │   ├── FlameStreak.ts               # Płomień streaka (świeca, animowany)
│   │   ├── CoinChispa.ts                # Moneta chispa (SVG animowany hover)
│   │   ├── ScrollText.ts                # Tekst na zwoju z rozwijaniem
│   │   ├── Retablo.ts                   # Retabło (tabliczka wotywna) do wyświetlania słowa+ilustracji
│   │   ├── Alebrije.ts                  # Animowany duch-alebrije (fruwa po tle)
│   │   ├── DialogueBox.ts               # Ramka dialogowa NPC (nie chat bubble)
│   │   └── TypeWriter.ts                # Efekt maszynopisu z dźwiękiem
│   │
│   ├── curandera/                       # Warstwa AI
│   │   ├── ollamaClient.ts              # Fetch do /api/chat, streaming SSE
│   │   ├── conversation.ts              # Historia rozmowy, tryby
│   │   └── promptBuilder.ts             # Buduje system prompt na podstawie stanu ucznia
│   │
│   └── utils/
│       ├── dom.ts                       # Helpery: h(), css(), on()
│       ├── svg.ts                       # SVG helpery (path builder, filter helper)
│       └── words.ts                     # Normalizacja hiszpańskich znaków, akcenty
│
└── tests/
    ├── vocab.test.ts
    ├── retos.test.ts
    └── state.test.ts
```

---

## 5. Ekran po ekranie — pełny scenariusz UX

### 5.1. Portada (ekran startowy)

**Co widzi user gdy pierwszy raz otwiera stronę:**

Pełnoekranowy krajobraz — ilustracja pięciu królestw zszytych na jednym płótnie (art/mapa-mundi.webp jako tło, przyciemnione filtrem). Na tym:

- **Tytuł** dużymi literami Cinzel Decorative: **CINCO REINOS**. Litery pojawiają się jedna po drugiej z lekkim rozbłyskiem złota, wypełnione teksturą starego pergaminu (efekt CSS: `background-clip: text` + subtelna animacja shimmer).
- **Podtytuł:** *Un viaje para aprender español* (mniejszy, kursywą Cormorant Garamond, kolor terakoty).
- **Trzy przyciski w formie pieczęci lakowych** ułożone jak monety wpuszczone w kamień:
  - "🕯️ Comenzar el viaje" (rozpocznij podróż) — dla nowego użytkownika
  - "📜 Continuar la ruta" (kontynuuj) — jeśli jest zapisany stan
  - "🎭 Sobre este mundo" (o świecie) — objaśnienie koncepcji
- **Ambient audio:** cichy loop wiatru i dalekich fletów pan (`audio/desert-wind.ogg`), z ikoną wycisz w rogu.

**Interakcja:** hover na przycisku → pieczęć się obraca 3D + świeci wewnętrznie. Klik → transition: cała scena płonie od dołu (efekt płomieni SVG na masce) i przechodzi do mapy.

**Efekty ambientowe:**
- Po tle powoli fruwają dwa alebrije (kolibry-duchy) po zapętlonych krzywych Béziera — narysowane SVG, kolorystyka: fuksja + turkus + żółty (klasyczne mexican folk colors).
- Cząsteczki iskier (mini SVG circle animated) unoszą się od dołu ku górze.

### 5.2. Mapa Świata (Mapa Mundi)

Widok główny po zalogowaniu. Interaktywna mapa pięciu królestw ułożona jak stara mapa żeglarska:

- **Pergaminowe tło** (tekstura SVG generowana proceduralnie: subtelny szum + starcia).
- **Kompas w rogu** kręci się powoli.
- **Pięć terenów** na mapie, każdy narysowany jako mała ilustracja:
  1. Pueblo del Alba — gliniane domki z terakotowymi dachami, świt za nimi
  2. Selva de Jade — gęsty las, pyramida wyłania się spomiędzy koron drzew
  3. Desierto de los Huesos — piasek, misja z dzwonnicą, kaktusy saguaro
  4. Montañas del Corazón — trzy szczyty, mała wioska pod nimi
  5. Ciudad de Espejos — miasto z kopułami, port, karnawał
- **Każdy teren jest klikalny.** Hover: teren podnosi się delikatnie w skośnej perspektywie, obwódka z papel picado pojawia się wokół, kolor motywu królestwa pulsuje na obwódce. Kliknięcie: kamera "leci" do królestwa (transform: scale + translate, blur na innych regionach).
- **Wskaźniki stanu** przy każdym królestwie:
  - Reputacja u ludu (0-100%) — mały słupek w formie sznura z węzełkami (khipu Inków)
  - Ilość zebranych papelitos — miniatura zwoju z liczbą
  - Talizman zdobyty (lub nie) — mała ikonka lub puste miejsce

- **HUD górny (na tle mapy):** dyskretny pasek z:
  - **Ranga podróżnika** (Peregrino I, Peregrino II, ..., Maestro): wykaligrafowane
  - **Chispas** (iskry): animowana moneta + liczba
  - **Święty płomień** (streak dni): świeca z płomieniem — jeśli user ćwiczył dziś, płomień się kołysze; jeśli nie, zaczyna migotać niepokojąco; gdy streak przepadł, świeca zgaszona (dym się unosi).
  - **Portret Doñi Esperanzy** w rogu — klik → wysuwa się z boku panel czatu.

- **Ambientowe ozdobniki:** po brzegach mapy narysowane potworki morskie i wiatr z ustami (klasyczne mapy XVI wieku).

### 5.3. Widok Królestwa (np. Selva de Jade)

Po kliknięciu królestwa użytkownik ląduje w tej lokacji:

- **Duże ilustracyjne tło** (art/reinos/selva-jade-bg.webp) — dżungla, gra świateł, jaguar wyłaniający się z liści. Parallax na scrollu (subtelny).
- **Nakładka: papel picado** u góry (dekoracyjny łańcuch z wycinanek).
- **Centralnie: brama do królestwa** narysowana jako kamienny łuk z hieroglifami. Za bramą widać "co można zrobić":
  - **Ścieżka słów** — nauka słownictwa danego królestwa (fiszki jako karty Loterii)
  - **Ścieżka gramatyki** — jeśli dane królestwo obejmuje gramatykę (Desierto)
  - **Zadania (Retos)** — mini-gry i wyzwania specyficzne dla królestwa (patrz sekcja 6)
  - **Rozmowa z NPC-tym-królestwa** — chat z lokalną postacią (Ollama z odpowiednim persona)
  - **Zwoje** — 3-5 "kart lore" opisujących kulturę: ciekawostki, przysłowia, historyjki

- **Muzyka:** loop ambient specyficzny dla królestwa (opcjonalne PNG audio: dżungla ma cykady i dalekie krzyki tukanów).

- **Powrót:** w rogu ikona kompasu → wraca na mapę z transition typu unfold.

### 5.4. Chat z Doña Esperanzą (Curandera)

**KLUCZOWE: to nie ma wyglądać jak ChatGPT.**

Wygląd:
- Tło: wnętrze chaty curandery — półka z ziołami, świece, gliniane figurki (ilustracja SVG złożona z komponentów).
- Doña Esperanza siedzi po lewej — jej ilustracja (webp) z subtelną animacją oddechu (transform: scale 1↔1.005, `animation: breathe 4s ease-in-out infinite`). Kiedy mówi, jej ilustracja "unosi się" delikatnie.
- Po prawej: **karta pergaminu**. To tu pojawia się jej odpowiedź — nie w chat-bubble, tylko wypisywana efektem maszynopisu na pergaminie (jak stary list). Efekt dźwiękowy: pióro skrzypi po papierze (bardzo cicho).
- Twoje pytania piszesz **na drugim, mniejszym pergaminie na dole**, z animowanym opuszczaniem pióra gdy klikasz textarea.
- Wysłanie (**"¡Envíale!"**) — pergamin zwija się w rulon i "leci" przez ekran do Doñi.
- Odpowiedź: rozwija się nowy pergamin, tekst pojawia się jak pisany piórem.

Historia rozmowy: 3-5 ostatnich wymian w formie **stosu zwojów** po prawej stronie, klikalnych do rozwinięcia.

Preset promptów w formie **tabliczek wotywnych** obok pergaminu:
- "Jak mam zapytać jak się nazywa?"
- "Powtórz z wolniejszą wymową"
- "Ćwiczmy odmianę tener"
- "Naucz mnie jednego kolumbijskiego zwrotu"

**Konfiguracja Ollamy:** patrz sekcja 7.

### 5.5. Biblioteka (Encyklopedia)

Ta sekcja jest "słownikiem" ale wyglądającym jak biblioteka klasztorna:

- Rzędy półek narysowanych w perspektywie, na nich księgi z tytułami hiszpańskich kategorii (Los Nombres, Los Verbos, Los Colores...).
- Klik na księgę → księga wychodzi, otwiera się na środku ekranu z animacją odwracania stron.
- W środku: pełny słownik, ale każda strona to **kaligrafowane wpisy** z ilustracją słowa obok (dla top 60 rzeczowników — mamy PNG w `public/art/vocab/`).
- Search: wpisujesz — słowa niepasujące zamazują się w atramencie (opacity: 0.2 filter: blur(2px)), pasujące zostają wyraźne.
- Klik na słowo → wysuwa się **retablo** (mała tabliczka wotywna) ze:
  - słowem po hiszpańsku
  - wymową
  - polskim tłumaczeniem
  - przykładem w zdaniu
  - przyciskiem "posłuchaj" (Web Speech API, głos es-CO)
  - przyciskiem "dodaj do papelitos" (zapisuje do fiszek osobistego zestawu)

### 5.6. Talismany (Osiągnięcia)

Widok galerii — jak muzeum:

- Ciemna sala z gablotami. Talismany zdobyte świecą (glow SVG), niezdobyte są ciemne z pytajnikiem.
- Hover na talismanie → cała gablota podświetla się, wyskakuje ramka z opisem osiągnięcia i sposobem zdobycia.
- Kilka propozycji talismanów (nie musimy wszystkich implementować w MVP, ale zdefiniujmy):
  - **Colibrí de Oro** — nauczyć 10 słów w jeden dzień
  - **Serpiente Emplumada** — 7 dni streaka
  - **Voz del Jaguar** — użyć poprawnie 50 razy tryb rozkazujący (advanced)
  - **Sombra del Volcán** — ukończyć wszystkie zadania Pustyni
  - **Corazón de Amaranth** — wysłać wiadomość po hiszpańsku w chacie z curanderą
  - **Puente Colombiano** — użyć 20 kolumbijskich zwrotów
  - **Ojo del Espejo** — zdobyć 100% na próbie gramatycznej ser vs estar

### 5.7. Pakt (Ustawienia)

Nazwane "El pacto con la curandera". Formularz w postaci kartki umowy z lakową pieczęcią, gdzie użytkownik:
- Ustawia swoje imię (do personalizacji rozmów)
- Wybiera tryb wymowy (kolumbijski / meksykański / kastylijski)
- Włącza/wyłącza audio ambient i sfx
- Reguluje szybkość maszynopisu
- Ustawia URL Ollamy i model (dla technicznych)
- Resetuje postęp: "Renacer" ("Odrodzenie") — z dramatycznym potwierdzeniem: "Czy naprawdę porzucisz wszystkie swoje talismany? Ten czyn jest nieodwracalny."

---

## 6. Mini-gry (jedna gra przypisana do 1-2 królestw)

### 6.1. La Lotería (Pueblo del Alba)

Gra oparta na meksykańskiej Lotería (Bingo-podobna).

- Plansza 4×4 obrazków (klasycznych figur Lotería: El Sol, La Luna, El Corazón, El Pescado, El Nopal, La Mano, itd.) — każda ilustracja to SVG lub PNG w stylu ludowym.
- Ekran obok: "El Gritón" (krzykacz) losuje słowo. Wygrywa animowaną szkicową kartę z hiszpańską nazwą.
- User musi kliknąć odpowiadającą figurę na planszy zanim Gritón wylosuje następną (5 sekund).
- Za 4 w rzędzie: "¡Lotería!" — animacja wypełnienia planszy złotem, +30 chispas.
- Za każdą poprawną: +2 chispas, dźwięk dzwoneczka.

Cel edukacyjny: łączenie obrazu z hiszpańskim słowem, szybka rozpoznawalność.

### 6.2. El Mercado (Selva de Jade + Ciudad de Espejos)

Symulacja targu — dialog handlowy.

- Widok: stragan z owocami/przedmiotami w tropikalnym targu.
- Sprzedawca (NPC w formie sprite z portretem) mówi po hiszpańsku (tekst + Web Speech API).
- User musi wybrać poprawną odpowiedź (multiple choice) lub wpisać (advanced).
- Symulacja: "¿Cuánto cuesta este mango?" → "Dos mil pesos" → wybór jedne z opcji zakupu.
- Progresja: łatwe transakcje → bardziej złożone (negocjacje).

Cel: praktyczne umiejętności językowe w kontekście podróży.

### 6.3. La Tejedora (Desierto de los Huesos)

Puzzle gramatyczne — user "tka" zdanie z rozsypanych słów-nici.

- Widok: warsztat tkacki, krosno w perspektywie izometrycznej.
- Na dole: bank słów (rzeczowniki, czasowniki w bezokolicznikach, przymiotniki) w formie kolorowych nici.
- Zadanie: "Utkaj zdanie znaczące: 'Ona jest zmęczona'". User przeciąga nici na krosno w odpowiedniej kolejności, wybierając właściwą formę.
- Gdy zdanie jest poprawne, na krośnie pojawia się wzór (SVG generowany proceduralnie na podstawie długości zdania).
- Za błędy: nić się zrywa (SVG animation), Tejedora mówi "Rozpleć i spróbuj ponownie".

Cel: budowanie zdań, praktyka odmiany.

### 6.4. Ritmo del Colibrí (Montañas del Corazón)

Rhythm game do ćwiczenia wymowy z Web Speech API.

- Ekran: strumień słów płynie z prawej do lewej, jak nuty na pięciolinii.
- Pod każdą "nutą" (słowem) jest zapisana wymowa fonetyczna.
- User czyta słowo na głos gdy słowo dochodzi do celownika (środek ekranu). Web Speech Recognition (webkitSpeechRecognition) sprawdza czy wymowa jest zbliżona.
- Poprawnie wymówione: kolibr pojawia się nad słowem i zabiera je w powietrze + chispas.
- Niepoprawnie: "spadający liść" animacja + Cantor śpiewa poprawną wersję.

Cel: praktyka wymowy, słuchanie własnego głosu.

Uwaga: Web Speech Recognition nie działa w każdej przeglądarce (najlepiej Chrome). Fallback: user słucha wzorca 3× i klika "Wymówiłem/łam prawidłowo" (self-report).

### 6.5. La Ofrenda (Wszystkie królestwa, meta-gra na Día de Muertos)

Dostępna w specjalnej lokacji, poza królestwami — "Ołtarz Zmarłych".

- Widok: ołtarz z 3 poziomami (jak klasyczna ofrenda), na nim puste miejsca na przedmioty: świece, cempasúchil (marigold), zdjęcie, chleb (pan de muerto), słona woda, papel picado.
- Zadanie: na każde miejsce user musi położyć **słowo hiszpańskie** wypowiadając/pisząc jego znaczenie. Kartki układają się z animacją.
- Gdy ołtarz kompletny — "duchy" słów, których się nauczyłeś w tym tygodniu, wyłaniają się na chwilę z dymu kadzidła i machają.
- Nagroda: +20 chispas, talizman "Corazón de Amaranth".

Cel: powtarzanie długoterminowe (spaced repetition wrapper w klimacie).

### 6.6. Carnaval del Slang (Ciudad de Espejos)

Match-3 style z kolumbijskim slangiem.

- Plansza karnawałowych masek. Na każdej — jedno kolumbijskie słowo (chévere, bacano, chimba, parcero, plata, tinto, etc.).
- Cel: łączyć **3 synonimy** w rzędzie (np. 3 słowa oznaczające "super": chévere + bacano + chimba).
- Klik na maski żeby zamieniać. Klasyczny match-3, ale w klimacie karnawałowego kalejdoskopu (particles konfetti, dźwięki bębnów cumbia w tle).

Cel: nauka slangowych synonimów.

---

## 7. Ollama — integracja i persona

### Backend proxy (server/index.ts)

Prosty Fastify serwer:

```typescript
import Fastify from 'fastify';
import { personas } from './personas.js';

const app = Fastify({ logger: true });
const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://localhost:11434';
const MODEL = process.env.MODEL_NAME ?? 'llama3.1:8b-instruct';

// Serwuje pliki statyczne z dist/ w produkcji
app.register(require('@fastify/static'), { root: `${__dirname}/../dist` });

app.post('/api/chat', async (req, reply) => {
  const { persona, messages, userLevel } = req.body as any;
  const systemPrompt = personas[persona].build(userLevel);

  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ];

  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache');
  reply.raw.setHeader('Connection', 'keep-alive');

  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      body: JSON.stringify({ model: MODEL, messages: fullMessages, stream: true }),
    });
    if (!res.body) throw new Error('brak strumienia od Ollamy');
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      reply.raw.write(`data: ${dec.decode(value)}\n\n`);
    }
    reply.raw.write('data: [DONE]\n\n');
    reply.raw.end();
  } catch (err) {
    reply.raw.write(`data: {"error":"curandera_asleep"}\n\n`);
    reply.raw.end();
  }
});

app.get('/api/health', async () => {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    return { ok: res.ok, model: MODEL };
  } catch {
    return { ok: false };
  }
});

app.listen({ port: 3000, host: '0.0.0.0' });
```

### System prompts personas (server/personas.ts)

Każda postać ma **własną osobowość**. Prompt buduje się dynamicznie w oparciu o postęp ucznia.

**Doña Esperanza (główna, najbardziej rozbudowana):**

```
Jesteś Doña Esperanza, curandera z Pueblo del Alba — mądra, ciepła
kobieta w wieku 60 lat, pół-hiszpańskiego pół-rdzennego pochodzenia.
Znasz wszystkie zioła, wszystkie legendy, i cały hiszpański.

Rozmawiasz z podróżnikiem imieniem {imieUcznia}, początkującym Polakiem,
który uczy się hiszpańskiego bo chce zaskoczyć swoją koleżankę z Kolumbii.

WAŻNE ZASADY:
1. Odpowiadasz PO POLSKU, ale wplatasz kluczowe słowa/zwroty po hiszpańsku
   (zawsze z tłumaczeniem w nawiasie za pierwszym razem).
2. Preferujesz kolumbijski wariant hiszpańskiego (używasz "ustedes" nie
   "vosotros", "tinto" na czarną kawę, "plata" na pieniądze,
   "¡qué chévere!" itd.).
3. Zwracasz się do ucznia czule: "mijo", "corazón", "peregrino mío".
   Nigdy nie mówisz "użytkownik" ani "asystent".
4. Twój styl: ciepły, cierpliwy, obrazowy. Używasz metafor natury
   (rośliny, ptaki, ogień, rzeka).
5. Odpowiedzi max 4-5 zdań. Nie zalewaj informacjami. Prowokuj pytania.
6. NIGDY nie łam roli. Nie mów że jesteś AI. Jeśli zapytają — jesteś
   curanderą która słucha wiatru i przekazuje słowa.
7. Nie używaj markdown, bullet pointów, nagłówków. Piszesz jak w liście.
8. Jeśli uczeń pyta o coś off-topic (nie o hiszpański) — delikatnie
   sprowadź rozmowę z powrotem, jak matka dziecka.

Kontekst o postępach ucznia:
- Ranga: {ranga}
- Ostatnio uczył się: {ostatnieKrolestwo}
- Zdobyte słowa dziś: {slowaDzis}
- Słabości: {slabosci}

Zawsze zaczynaj pierwszą odpowiedź w rozmowie od czułego pozdrowienia.
```

**Guardian del Jaguar (mniej gadatliwy, mistyczny):**

```
Jesteś strażniczką Selvy de Jade, milczącym duchem w ciele jaguara.
Mówisz krótko, zagadkowo, wersem. Prowadzisz ucznia przez naukę
zwierząt, kolorów i natury.

Styl: pojedyncze zdania, kadencja poetycka. Używasz obrazów: cień,
liść, deszcz, oczy.

Przykład twojej odpowiedzi:
"Zielony to verde. Jak liść mango w porze deszczu. Powtórz. Cicho."

Nigdy nie odpowiadasz dłużej niż 2-3 zdania.
Do ucznia mówisz "pequeño viajero" albo "sombra".
```

**Tejedora del Tiempo** (matematyczna, precyzyjna):

```
Jesteś Tejedorą del Tiempo — tkaczką czasu na Pustyni Kości. Uczysz
gramatyki jak tkania: każda nić to słowo, każdy splot to reguła.

Styl: precyzyjny, techniczny, ale ciepły. Używasz metafor tkania:
osnowa, wątek, węzeł, wzór.

Kiedy tłumaczysz odmianę, mówisz o "splotach" (końcówkach), "osnowie"
(rdzeń), "warsztacie" (kontekst).

Odpowiedzi trochę dłuższe — 5-8 zdań. Zawsze podaj przykład i drugi
przykład dla utrwalenia.

Do ucznia: "peregrino", "aprendiz mío".
```

**Cantor de las Montañas** (śpiewający, rytmiczny):

```
Jesteś jednym z Cantores — górskim śpiewakiem uczącym emocji przez
melodie. Kiedy wyjaśniasz nowe słowo lub odmianę, sugerujesz
mnemotechniki oparte na rytmie.

Możesz proponować rymowanki, kupletowe wersy, sposoby zapamiętania
z powtórzeniem.

Odpowiedzi: 3-6 zdań, często z propozycją "zaśpiewajmy" (co user
w rzeczywistości ma przeczytać na głos).

Do ucznia: "corazón peregrino", "hermano".
```

**Parcero Diego** (miejski, luzacki, młody):

```
Jesteś Diego, młodym Kolumbijczykiem z Ciudad de Espejos.
20 lat, luzak, gada slangiem. Uczysz slangu kolumbijskiego,
kultury karnawału, potocznej mowy.

Styl: swobodny, wtrącasz stale "parce", "¡uy!", "¿sí o qué?".
Piszesz jak młody chłopak do kumpla. Piszesz w polskim, ale sypiesz
kolumbianizmami co drugie zdanie.

Możesz opowiadać o Bogocie, Medellín, Cartagena. O muzyce (Karol G,
Shakira, cumbia, vallenato). O tym co się je (bandeja paisa, ajiaco,
arepas).

Odpowiedzi: krótkie, energiczne. 2-4 zdania.
Do ucznia: "parce", "hermano", "loco".
```

### Klient (src/curandera/ollamaClient.ts)

Streaming SSE do UI:

```typescript
export async function* streamChat(persona: string, messages: Msg[], userLevel: UserLevel) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ persona, messages, userLevel }),
  });
  if (!res.ok || !res.body) throw new Error('curandera_asleep');

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += dec.decode(value);
    const lines = buffer.split('\n\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (payload === '[DONE]') return;
      try {
        const chunk = JSON.parse(payload);
        if (chunk.error === 'curandera_asleep') {
          throw new Error('curandera_asleep');
        }
        if (chunk.message?.content) yield chunk.message.content;
      } catch { /* pomiń */ }
    }
  }
}
```

### Fallback gdy Ollama nie działa

Jeśli `/api/health` zwraca `{ ok: false }` przy pierwszym wejściu do chatu:
- Wyświetl scenkę: Doña Esperanza śpi (jej ilustracja + zamknięte oczy CSS filter).
- Tekst na pergaminie: *"Curandera zasnęła w swoim krześle na słońcu. Wróć później, mijo — a jeśli chcesz ją zbudzić, uruchom Ollamę w tle."*
- Przycisk *"Jak uruchomić Ollamę?"* → wyskakujące okienko z instrukcją:
  ```
  1. Pobierz i zainstaluj Ollama: https://ollama.com/download
  2. W terminalu: ollama pull llama3.1:8b-instruct
  3. Uruchom: ollama serve
  4. Odśwież tę stronę
  ```

---

## 8. Grafiki — sposób zdobycia

Codex nie może generować bitmap. Ale może:
1. **Rysować SVG bezpośrednio w kodzie** — dla ikon, ozdobników, prostych ilustracji, ramek papel picado, kompasu, khipu, alebrijes, monet chispa, świec.
2. **Zdefiniować listę potrzebnych PNG** z promptami do wygenerowania.

Utwórz plik `PROMPTS.md` w rocie projektu z listą wszystkich potrzebnych PNG. Format:

```
### mapa-mundi.webp
Rozmiar: 1920x1080
Styl: ilustrowana mapa z XVI wieku spotkana z mezoamerykańskim ornamentem,
pergaminowy podkład, obwódka z papel picado i motywami węży.
Kolorystyka: sepia, ciepłe brązy, akcenty turkusu i cynobru.
Zawiera: pięć oddzielnych terenów (patrz opisy niżej).

Prompt Stable Diffusion / MJ:
"aged parchment world map, five distinct kingdoms illustrated in
Mesoamerican-Spanish colonial fantasy style, terracotta desert with
mission church, jade jungle with pyramid, mountain villages, coastal
carnival city, sunrise village, decorative papel picado border,
Aztec glyphs, compass rose with quetzalcoatl, sepia and turquoise
palette, hand-painted ink and watercolor, National Geographic
antique style, ultra detailed, 4k --ar 16:9 --style raw"
```

Powtórz to samo dla każdego z:
- `personas/dona-esperanza.webp` (portret curandery)
- `personas/guardian-jaguar.webp` (jaguar z ludzkimi oczami)
- `personas/tejedora.webp` (kobieta przy krośnie, tło pustyni)
- `personas/cantor.webp` (śpiewak w andyjskim poncho)
- `personas/parcero-diego.webp` (młody Kolumbijczyk street style)
- `reinos/pueblo-alba-bg.webp` (świt nad gliniana wioską)
- `reinos/selva-jade-bg.webp` (dżungla z jaguarem i piramidą)
- `reinos/desierto-huesos-bg.webp` (pustynia z misją)
- `reinos/montanas-corazon-bg.webp` (andyjskie szczyty)
- `reinos/ciudad-espejos-bg.webp` (kolumbijska metropolia karnawał)
- 60 ilustracji rzeczowników w `vocab/` (styl: prosta ludowa akwarela, kolorowa, izolowany obiekt na jasnym tle)

**Ważne:** dopóki plik PNG nie istnieje, kod ma używać placeholder SVG (rysowany proceduralnie) który wygląda **stylistycznie zgodnie** z docelową ilustracją. Nie wolno zostawiać złamanych obrazków.

Utwórz helper `src/utils/placeholderSvg.ts` który generuje ładne placeholdery:

```typescript
export function placeholderIllustration(word: string, color: string): SVGElement {
  // Generuje SVG z ozdobną ramką + kaligrafowanym słowem
  // + prostym geometrycznym symbolem (np. dla "jaguar" - stylizowana głowa
  // złożona z geometrycznych kształtów w stylu prekolumbijskim)
  // ...
}
```

---

## 9. Design system — konkretne wartości

### Kolory (styles/tokens.css)

```css
:root {
  /* Rdzeń — pergamin, atrament, złoto */
  --pergamin-jasny: #F5E9D3;
  --pergamin-sredni: #E8D5B0;
  --pergamin-ciemny: #C9AF83;
  --atrament: #2B1D14;
  --atrament-wyblakly: #5D4432;
  --zloto: #C9992D;
  --zloto-swietliste: #F0BF4A;

  /* Krolestwo 1: Pueblo del Alba (bursztyn/terakota) */
  --r1-primary: #D2691E;
  --r1-secondary: #F4A261;
  --r1-accent: #FCE38A;
  --r1-shadow: #6B2A0B;

  /* Krolestwo 2: Selva de Jade (jade/turkus) */
  --r2-primary: #0F7A5A;
  --r2-secondary: #2A9D8F;
  --r2-accent: #B7E4C7;
  --r2-shadow: #063D2A;

  /* Krolestwo 3: Desierto de los Huesos (ochra/rdza) */
  --r3-primary: #B8621B;
  --r3-secondary: #D4A574;
  --r3-accent: #F5DEB3;
  --r3-shadow: #52260B;

  /* Krolestwo 4: Montañas del Corazón (fiolet górski/amarant) */
  --r4-primary: #6B4C93;
  --r4-secondary: #A55B7E;
  --r4-accent: #F2C6D3;
  --r4-shadow: #2E1A3D;

  /* Krolestwo 5: Ciudad de Espejos (turkus karaibski/złoto) */
  --r5-primary: #17A2B8;
  --r5-secondary: #FFC857;
  --r5-accent: #E0FBFC;
  --r5-shadow: #05505C;

  /* Semantyczne */
  --plomien-zywy: #FF6B35;
  --plomien-slaby: #F8B84E;
  --plomien-zgasly: #5C4A3D;
  --sukces: #52B788;
  --blad: #C1121F;

  /* Typografia */
  --font-tytul: 'Cinzel Decorative', 'Cinzel', serif;
  --font-narracja: 'Cormorant Garamond', 'Georgia', serif;
  --font-ui: 'Chivo', 'Inter', system-ui, sans-serif;
  --font-dialog: 'PT Serif', Georgia, serif;

  /* Skala */
  --skala-mikro: 0.75rem;
  --skala-drobna: 0.875rem;
  --skala-bazowa: 1rem;
  --skala-duza: 1.25rem;
  --skala-tytul: 2rem;
  --skala-bohater: 3.5rem;

  /* Odstępy */
  --odstep-1: 0.25rem;
  --odstep-2: 0.5rem;
  --odstep-3: 1rem;
  --odstep-4: 1.5rem;
  --odstep-5: 2.5rem;

  /* Zaokrąglenia */
  --radius-mikro: 4px;
  --radius-bazowy: 8px;
  --radius-duzy: 16px;
  --radius-pieczec: 50%;

  /* Cienie */
  --cien-delikatny: 0 2px 8px rgba(43, 29, 20, 0.15);
  --cien-glęboki: 0 8px 24px rgba(43, 29, 20, 0.35);
  --cien-swiaty: 0 0 20px rgba(240, 191, 74, 0.6);
}
```

### Typografia — hierarchia

- **H1 (tytuł strony/królestwa):** Cinzel Decorative, 3rem, złoto z lekkim shadow, spacing +2px.
- **H2 (nazwa sekcji):** Cinzel Decorative, 1.75rem, atrament, spacing +1px.
- **H3 (podnagłówek):** Cormorant Garamond kursywa, 1.4rem, atrament wyblakły.
- **Body (narracja):** Cormorant Garamond, 1.125rem, line-height 1.7, atrament.
- **Dialog NPC:** PT Serif Italic, 1rem, atrament + drop cap na pierwszej literze.
- **UI (przyciski, labels):** Chivo, 0.875rem, uppercase spacing +3px, atrament wyblakły.
- **Hiszpański tekst (podświetlony):** Cormorant Garamond, 1.25rem, kolor złoty, kursywa.
- **Wymowa (fonetyka):** Chivo mono, 0.85rem, kolor atrament wyblakły, w nawiasach kwadratowych.

### Mikro-animacje (styles/animations.css)

```css
@keyframes flicker {
  0%, 100% { opacity: 1; transform: translateY(0) rotate(-1deg); }
  50%      { opacity: 0.85; transform: translateY(-1px) rotate(1deg); }
}
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.008); }
}
@keyframes shimmer {
  0%   { background-position: -200% 50%; }
  100% { background-position:  200% 50%; }
}
@keyframes sway {
  0%, 100% { transform: rotate(-2deg); }
  50%      { transform: rotate(2deg); }
}
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px var(--zloto); }
  50%      { box-shadow: 0 0 24px var(--zloto-swietliste); }
}
@keyframes float-up {
  0%   { transform: translateY(0);   opacity: 0; }
  20%  { opacity: 1; }
  100% { transform: translateY(-60px); opacity: 0; }
}
@keyframes unroll {
  0%   { transform: scaleY(0); transform-origin: top; }
  100% { transform: scaleY(1); }
}
```

### Komponent: FramePicado (ramka papel picado)

Rysowana SVG-em, ma być używana wszędzie tam gdzie potrzeba dekoracyjnej ramki (chat curanderą, retablo, modaltalismana). Nie może być statyczna — subtelnie kołysać się na wietrze (`animation: sway 4s ease-in-out infinite`).

Prompt do implementacji:
```typescript
export function framePicado(width: number, height: number, color: string): SVGElement {
  // SVG który generuje:
  // - Górną i dolną krawędź z klasycznym wzorem papel picado (wycinanki)
  //   z motywami: serca, kwiaty, ptaki
  // - Boczne krawędzie z prostym łańcuchem
  // - Kolor konfigurowalny (z palety królestwa)
  // - Wewnętrzna sekcja transparentna (dla treści)
  // - `<animateTransform>` subtelne kołysanie (rotate ±1° na 4s)
}
```

---

## 10. State ucznia (src/core/state.ts)

```typescript
export interface UserState {
  imie: string;
  ranga: 'peregrino1' | 'peregrino2' | 'peregrino3' | 'aventurero' | 'maestro';
  chispas: number;
  streak: {
    dni: number;
    ostatniDzien: string; // ISO date
  };
  reputacja: {
    puebloAlba: number;      // 0-100
    selvaJade: number;
    desiertoHuesos: number;
    montanasCorazon: number;
    ciudadEspejos: number;
  };
  talismany: string[];       // id zdobytych talismanów
  papelitos: {               // fiszki użytkownika (własny zestaw)
    es: string;
    pl: string;
    dodane: string;
    nastepnyReview: string;  // SRS
  }[];
  historiaChatow: {
    persona: string;
    messages: Array<{ role: 'user'|'assistant'; content: string; timestamp: number }>;
  }[];
  ustawienia: {
    dialektWymowy: 'co' | 'mx' | 'es';
    audioAmbient: boolean;
    audioSfx: boolean;
    predkoscMaszynopisu: number; // ms na znak
    ollamaUrl: string;
    ollamaModel: string;
  };
}

// Funkcje: zdobądźChispy, sprawdźTalismany (auto-nagradzanie po każdej akcji),
// resetPostepu, załadujZeStorage, zapiszDoStorage
```

---

## 11. Kolejność implementacji (dla Codexa)

Nie zaczynaj od wszystkiego naraz. Wykonaj w tej kolejności — każdy krok zamknięty w commit z krótkim komunikatem po polsku:

1. **Setup** (commit: "setup: vite + fastify + tsconfig")
   - Zainicjalizuj Vite z TypeScript vanilla
   - Dodaj Fastify jako backend proxy
   - Skonfiguruj vite proxy `/api → localhost:3000`
   - `.env.example`, README z krokami odpalenia

2. **Design system** (commit: "styl: design tokens + typografia + font faces")
   - `styles/tokens.css` (pełna paleta 5 królestw)
   - `styles/typography.css` z @font-face
   - Fonty do `public/fonts/` (pobierz z Google Fonts, zapisz lokalnie)
   - Testowy `index.html` który pokazuje typografię i kolory

3. **Portada** (commit: "ekran: portada z animowanym tytułem")
   - Statyczne tło (placeholder gradient jeśli nie ma png)
   - Tytuł Cinzel z shimmer
   - 3 przyciski-pieczęcie z hover 3D
   - Alebrijes fruwające po tle (SVG animowane)
   - Cząsteczki iskier

4. **Core state + routing** (commit: "core: store + hash router + persistence")
   - `core/state.ts` z pełnym interfejsem
   - `core/persistence.ts` (localStorage)
   - `core/router.ts` (hash-based)
   - Test w tests/state.test.ts

5. **Mapa Mundi** (commit: "ekran: mapa świata z pięcioma królestwami")
   - Pergaminowe tło (SVG generowane proceduralnie: teksture + starcia)
   - 5 klikalnych regionów z hover
   - HUD z rangą, chispami, świecą streaka
   - Kompas obracający się
   - Portret Doñi Esperanzy w rogu

6. **Widok Królestwa** (commit: "ekran: pojedyncze królestwo z bramą i ścieżkami")
   - Layout z parallax tłem
   - Kamienny łuk z 4-5 ścieżkami
   - Powrót do mapy

7. **Dane** (commit: "dane: słownictwo + gramatyka + retos")
   - Zaimportuj słownictwo z załączonych plików (200 rzeczowników, 100 przymiotników, 200 czasowników - dokument który już masz)
   - Podziel je między królestwa
   - Zdefiniuj minimum 5 zadań na królestwo
   - `data/talismanes.ts` z 15 talismanami

8. **Biblioteka** (commit: "ekran: biblioteka słownictwa jak klasztor")
   - Ilustrowane półki z księgami
   - Otwieranie księgi z animacją
   - Search z efektem atramentu
   - Klik na słowo → retablo

9. **Curandera** (commit: "curandera: chat z ollama + streaming + fallback")
   - Fastify proxy z SSE
   - Ollama client w TS
   - UI z pergaminami zamiast bubbles
   - Efekt maszynopisu z dźwiękiem
   - Fallback "curandera zasnęła"

10. **Pierwsza gra: Lotería** (commit: "gra: Lotería del Pueblo del Alba")
    - Plansza 4×4
    - Gritón losujący
    - Chispas + dźwięki

11. **Talismany** (commit: "ekran: galeria talismanów + auto-nagrody")
    - Sala gablot
    - Auto-detekcja zdobytych talismanów po każdej akcji
    - Toast "Zdobyłeś talizman!" z animacją

12. **Pozostałe gry** (5 osobnych commitów) — Mercado, Tejedora, Ritmo, Ofrenda, Carnaval

13. **Pakt** (commit: "ekran: ustawienia jako pakt z curanderą")
    - Formularz w formie umowy
    - Reset postępu z ostrzeżeniem
    - Konfiguracja Ollamy

14. **Polish** (commit: "polish: mikroanimacje, audio, edge cases")
    - Wszystkie mikroanimacje działają płynnie
    - Sound manager z global mute
    - Testy responsywności (min 1024px, docelowo desktop-first)
    - Sprawdź czy fallbacki działają

15. **PROMPTS.md** (commit: "dokumentacja: prompty do generowania grafik")
    - Pełna lista brakujących grafik z promptami

---

## 12. Sprawdzenie końcowe — akceptacja

Zanim uznasz projekt za skończony, upewnij się że:

- [ ] Nigdzie nie ma napisu "loading", "error", "submit", "cancel" po angielsku
- [ ] Wszystkie interakcje mają feedback wizualny w klimacie (nie standardowe browser default)
- [ ] Aplikacja odpala się `npm run dev` bez błędów w konsoli
- [ ] Ollama fallback działa (przetestuj wyłączając Ollamę)
- [ ] `npm run build` daje działający `dist/`
- [ ] Wszystkie 5 królestw jest dostępne z mapy
- [ ] Curandera odpowiada gdy Ollama jest uruchomiona
- [ ] Zapisany postęp przetrwa refresh strony
- [ ] Zdobycie talismana pokazuje animowany toast
- [ ] Minimum 3 mini-gry są w pełni grywalne
- [ ] `PROMPTS.md` zawiera prompty do wszystkich brakujących PNG
- [ ] README wyjaśnia jak odpalić projekt w 3 krokach
- [ ] Testy vitest przechodzą (min. 10 testów)

---

## 13. Notatki dla implementatora

- **Nie używaj tailwinda ani żadnego frameworka UI** — pisz własne komponenty. Ma być charakterystyczne.
- **Nie używaj React ani Vue** — vanilla TS. Komponenty jako klasy renderujące HTMLElement lub jako czyste funkcje.
- **Priorytet ma stylistyka nad kompletnością gier** — lepiej 3 gry pięknie zrobione niż 6 średnich.
- **Emoji tylko w wyjątkowych przypadkach** — świeczka (🕯️), księga (📜), maska (🎭) można. Ale każde inne emoji powinno być zastąpione SVG-em w klimacie.
- **Pisz kod TypeScript strict.** Explicit types wszędzie. No `any` bez powodu.
- **Nazwy zmiennych po polsku i angielsku mieszane** — publiczne API i typy po angielsku (`UserState`, `saveProgress`), ale wewnętrzne nazwy zmiennych w kontekście świata mogą być hiszpańskie (`chispas`, `krolestwoAktywne`, `personaWybrana`).
- **Nie proś użytkownika o zalogowanie się.** Wszystko lokalnie.
- **Nie wysyłaj żadnej telemetrii ani analytics.**

Jeśli coś jest niejasne — zbuduj w sposób który uważasz za zgodny z duchem tego dokumentu i udokumentuj decyzję w komentarzu.

Powodzenia. Vamos, peregrino.

---

*Koniec specyfikacji. Autor: Maciek, wspomagany przez Claude.*
