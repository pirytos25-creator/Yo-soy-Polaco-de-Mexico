# CINCO REINOS — Apendyks wizualny
## Pełny inwentarz grafik, style guide, prompty generacyjne

> **Ten dokument jest suplementem do `CINCO_REINOS_instrukcje_dla_codexa.md`.**
> Wrzuć oba pliki jednocześnie do repozytorium Codexa. Ten dokument
> zastępuje i rozwija sekcję "8. Grafiki — sposób zdobycia" w głównym
> pliku.

---

## 0. Odpowiedź na pytanie: ile grafik było w pierwszym poleceniu?

**Poprzednia wersja: ~71 grafik konkretnych** (1 mapa świata + 5 portretów
głównych NPC + 5 teł królestw + ~60 ilustracji słownictwa + 2 talismany
+ trzykropek "...").

To za mało jak na projekt z ambicją "gra RPG / interaktywna książka".

**Nowa wersja: ~360 grafik w 22 kategoriach.** Każda z pełnym promptem
generacyjnym, metadanymi (rozmiar, format), i konkretnym miejscem w
kodzie gdzie się pojawia.

---

## 1. Filozofia warstwy wizualnej — rozszerzona

### 1.1. Warstwy gęstości wizualnej

W każdej scenie muszą współistnieć trzy warstwy:

**Warstwa 1: Tło diegetyczne (parallax, ambient)**
Duże ilustracje krajobrazu / wnętrza, delikatnie animowane (parallax na
scrollu, subtelny sway, cząsteczki). Nie zawierają informacji krytycznej.

**Warstwa 2: Elementy funkcjonalne (kompozycyjne)**
Bramy, retabla, księgi, pergaminy, ołtarze — to są "obiekty gry" z
którymi user wchodzi w interakcję. Muszą być stylistycznie spójne z tłem,
ale wystarczająco czytelne żeby user wiedział że są klikalne.

**Warstwa 3: Ozdobniki (ramki, textury, motywy powtarzalne)**
Papel picado, tkane obramowania, khipu, hieroglify — powtarzalne wzory
generowane jako SVG lub tileable PNG. Wypełniają "puste miejsca" i
utrzymują estetykę nawet w mniej ważnych sekcjach.

**Zasada:** żaden pusty prostokąt CSS nie może istnieć w widocznym
obszarze. Jeśli nie ma tam ilustracji, musi tam być tekstura albo wzór.

### 1.2. Zasada "jeśli słowo istnieje w danych, ma ilustrację"

Wszystkie top ~120 rzeczowników mają odpowiednik graficzny (jest to
najczęściej używana klasa słów, ilustracje pomagają zapamiętać). Verby
mają uproszczone symbole akcji (SVG generowane). Przymiotniki i
przyimki — bez ilustracji, ale w retabło pojawiają się z ozdobną ramką
w kolorze królestwa gdzie się uczą.

### 1.3. Klimat vs. read-time

W miarę jak user wchodzi głębiej w sesję nauki, warstwa dekoracyjna
delikatnie się wycofuje (opacity spada z 1.0 do 0.7), żeby nie
przeszkadzała w skupieniu. Efekt "zaciemniania świata dookoła nauki"
kontrolowany przez `document.body.dataset.focus = 'true'` po X minutach.

---

## 2. Style guide dla wszystkich generacji

### 2.1. Bazowy prompt-fragment (używany w KAŻDEJ generacji jako sufiks)

```
[BASE_STYLE]
hand-painted illustration, mestizo mesoamerican-spanish colonial fantasy,
inspired by Aztec codex, Colombian folk art, Mexican folk art (Amate
paintings, Huichol yarn art), Oaxacan alebrijes, warm earthy palette
with saturated jewel tone accents, thick outline aesthetic mixed with
watercolor washes, subtle paper grain texture, non-photorealistic,
storybook-illustration quality, intricate ornamental borders, 4k detail
--niji 6 --stylize 500
```

### 2.2. Kolor-key per królestwo (dodawany do promptu regionalnego)

| Królestwo | Kolory bazowe | Akcenty | Tekstury dominujące |
|-----------|---------------|---------|---------------------|
| **Pueblo del Alba** | terracotta #D2691E, ochre #F4A261 | pale gold #FCE38A, deep umber #6B2A0B | adobe walls, warm sunrise light, papel picado |
| **Selva de Jade** | jade green #0F7A5A, turquoise #2A9D8F | pale mint #B7E4C7, deep forest #063D2A | wet leaves, dappled light, moss, jaguar spots |
| **Desierto de los Huesos** | rust orange #B8621B, sand #D4A574 | wheat #F5DEB3, deep sienna #52260B | bleached wood, ceramic, woven textiles, cracked earth |
| **Montañas del Corazón** | mountain purple #6B4C93, amaranth pink #A55B7E | rose #F2C6D3, deep aubergine #2E1A3D | mist, wool textiles, aguayo patterns, high-altitude light |
| **Ciudad de Espejos** | Caribbean turquoise #17A2B8, gold #FFC857 | ice mint #E0FBFC, teal deep #05505C | mother-of-pearl, carnival glitter (subtle), colonial tile |

### 2.3. Zasady kompozycji

- **Portrety NPC:** ¾ view, patrzenie w kierunku widza z lekkim odchyleniem, tło rozmyte w kolorach królestwa, wysokość klatki 3:4, oświetlenie golden-hour.
- **Tła krajobrazu:** 16:9, głęboka perspektywa, dwa plany (front + horizon), warstwa nieba zajmuje 40% powierzchni.
- **Ilustracje słówek:** kwadrat 1:1, izolowany obiekt na jasnym pergaminowym tle, delikatny cień, cel = natychmiastowa rozpoznawalność.
- **Ozdobniki:** transparentne PNG lub SVG, na białym tle do składu.
- **Karty i talismany:** okrągłe lub owalne z ozdobnym obramowaniem, symetria radialna.

### 2.4. Negative prompt (do dodania w każdej generacji)

```
[NEGATIVE]
photorealistic, 3d render, cgi, realistic skin, low quality, blurry,
watermark, text, letters, signature, extra fingers, deformed, modern
clothing, corporate design, generic fantasy, tolkien-esque, european
medieval, anime, chibi, kawaii, cartoon simple, flat vector
```

---

## 3. INWENTARZ — 360 grafik

Format każdego wpisu:
- **Ścieżka** — dokładna lokalizacja pliku
- **Rozmiar** — piksele + orientacja
- **Użycie w kodzie** — plik.ts:linia + krótki opis kontekstu
- **Prompt** — konkretna instrukcja generacyjna (dopięć + [BASE_STYLE])

Ilustracje pogrupowane od najbardziej krytycznych do dekoracyjnych.

---

## 3.1. MAPA I ORIENTACJA (7 grafik)

### mapa-mundi.webp
- **Ścieżka:** `public/art/world/mapa-mundi.webp`
- **Rozmiar:** 1920×1080 (16:9)
- **Użycie:** `screens/mapa/index.ts` — tło głównej sceny mapy
- **Prompt:** *aged parchment world map showing five distinct kingdoms in one frame, sunrise adobe village on the left, jade jungle with pyramid center-left, terracotta desert with mission church center, misty andean mountains center-right, coastal carnival city right, sepia parchment base with turquoise sea, compass rose with quetzalcoatl feather serpent in top-right, decorative papel picado border, aztec glyphs corners, National Geographic antique map aesthetic, ink and watercolor* + [BASE_STYLE]

### mapa-mundi-noc.webp
- **Ścieżka:** `public/art/world/mapa-mundi-noc.webp`
- **Rozmiar:** 1920×1080
- **Użycie:** `screens/mapa/index.ts` — tryb nocny (po 18:00 lokalnego czasu)
- **Prompt:** *same map as mapa-mundi but at night, deep indigo sky with stars, moonlight reflecting on the sea, faint bioluminescent glow from the jungle, campfires in the villages, constellations shaped like animals* + [BASE_STYLE]

### mapa-region-pueblo.webp
- **Ścieżka:** `public/art/world/regions/pueblo-detail.webp`
- **Rozmiar:** 800×800 (1:1)
- **Użycie:** `screens/mapa/index.ts` — zoom-in na Pueblo del Alba przy hoverze
- **Prompt:** *closeup of adobe pueblo village at sunrise, terracotta roofs, cobblestone paths, tiny NPC figures visible, warm golden light, cempasúchil marigolds in windowboxes* + [BASE_STYLE]

### mapa-region-selva.webp
- **Ścieżka:** `public/art/world/regions/selva-detail.webp`
- **Rozmiar:** 800×800
- **Użycie:** j.w. dla Selva
- **Prompt:** *dense mesoamerican jungle from bird view, jade colors, mayan pyramid emerging through canopy, hidden jaguar silhouette, tropical birds in flight, misty humid atmosphere* + [BASE_STYLE]

### mapa-region-desierto.webp
- **Ścieżka:** `public/art/world/regions/desierto-detail.webp`
- **Rozmiar:** 800×800
- **Prompt:** *sun-bleached desert with adobe mission church, tall saguaro cacti, whitened animal bones on the ground, distant mesa, dust devil* + [BASE_STYLE]

### mapa-region-montanas.webp
- **Ścieżka:** `public/art/world/regions/montanas-detail.webp`
- **Rozmiar:** 800×800
- **Prompt:** *andean mountain range from mid-air view, three snowcapped peaks, small stone village at foot of the mountains, hanging bridges, alpaca herds* + [BASE_STYLE]

### mapa-region-ciudad.webp
- **Ścieżka:** `public/art/world/regions/ciudad-detail.webp`
- **Rozmiar:** 800×800
- **Prompt:** *colonial caribbean city on a coastal island, colorful facades in yellow/pink/turquoise, church domes, port with sailboats, carnival banners across streets* + [BASE_STYLE]

---

## 3.2. GŁÓWNI NPC — 5 portretów pełnych + 5 portretów alternatywnych (10 grafik)

### personas/dona-esperanza.webp
- **Ścieżka:** `public/art/personas/dona-esperanza.webp`
- **Rozmiar:** 900×1200 (3:4 portret)
- **Użycie:** `screens/curandera/index.ts`, `screens/mapa/index.ts` (róg z portretem)
- **Prompt:** *warm elderly mestizo curandera, 60 years old, long silver hair with two braids adorned with red ribbons, weathered kind face with deep smile lines, wearing embroidered white blouse with floral patterns and rust-orange rebozo shawl, holding a bundle of herbs (chamomile, sage), soft golden-hour light through wooden shutters, blurred background of clay pots and hanging chiles, gentle motherly expression, three-quarter view* + [BASE_STYLE]

### personas/dona-esperanza-mysli.webp
- **Ścieżka:** `public/art/personas/dona-esperanza-mysli.webp`
- **Rozmiar:** 900×1200
- **Użycie:** wariant "myślący" gdy Ollama pracuje nad odpowiedzią (loading)
- **Prompt:** j.w. ale *eyes half-closed in contemplation, one hand touching her temple, listening intently, faint wisp of copal smoke from a small burner beside her*

### personas/guardian-jaguar.webp
- **Ścieżka:** `public/art/personas/guardian-jaguar.webp`
- **Rozmiar:** 900×1200
- **Użycie:** `screens/reino/selva.ts`
- **Prompt:** *mystical jaguar spirit guardian, black jaguar with jade rosettes and glowing amber eyes with human-like intelligence, standing on ancient stone temple ruin covered in vines, ceremonial obsidian pendant hanging from its neck, aura of green mist, forest depth behind* + [BASE_STYLE]

### personas/guardian-jaguar-humano.webp
- **Ścieżka:** `public/art/personas/guardian-jaguar-humano.webp`
- **Rozmiar:** 900×1200
- **Użycie:** wariant humanoidalny gdy dialog dłuższy
- **Prompt:** *humanoid form of jaguar spirit, tall figure with feline features, obsidian mask, feathered cloak in jade and gold, ceremonial staff topped with quetzal feathers, mayan hieroglyphs floating around him*

### personas/tejedora.webp
- **Ścieżka:** `public/art/personas/tejedora.webp`
- **Rozmiar:** 900×1200
- **Prompt:** *middle-aged mestizo woman weaver at a backstrap loom, long black hair with grey streaks, wearing traditional woven huipil with geometric patterns in ochre and deep red, hands mid-weave with colorful threads, desert light through open door, spools of colored yarn hanging around her, spider web motif behind her (symbolic of time)* + [BASE_STYLE]

### personas/tejedora-krosno.webp
- **Ścieżka:** `public/art/personas/tejedora-krosno.webp`
- **Rozmiar:** 1600×900 (16:9)
- **Użycie:** `games/tejedora/index.ts` — tło mini-gry
- **Prompt:** *close view of backstrap loom in isometric perspective, colored threads stretched taut, wooden tools, half-finished textile with geometric maya pattern, warm daylight, workshop setting*

### personas/cantor.webp
- **Ścieżka:** `public/art/personas/cantor.webp`
- **Rozmiar:** 900×1200
- **Prompt:** *young andean man singer, indigenous features, wearing wool poncho with pink and purple stripes and chullo hat with earflaps, holding a wooden charango (small stringed instrument), mid-song with open mouth, mountain peaks and clouds visible behind him, breath visible in cold thin air* + [BASE_STYLE]

### personas/cantor-nocturno.webp
- **Ścieżka:** `public/art/personas/cantor-nocturno.webp`
- **Rozmiar:** 900×1200
- **Prompt:** j.w. *at night around a campfire in the mountains, other singers barely visible, sparks rising, milky way overhead*

### personas/parcero-diego.webp
- **Ścieżka:** `public/art/personas/parcero-diego.webp`
- **Rozmiar:** 900×1200
- **Prompt:** *young 22-year-old Colombian man from Medellín, mid-length curly black hair, warm brown skin, wearing colorful street style (yellow t-shirt, denim jacket), casual confident smile, holding a can of Aguila beer, standing in front of graffiti art of a woman in colonial dress, urban Bogotá vibe, natural light* + [BASE_STYLE]

### personas/parcero-diego-carnaval.webp
- **Ścieżka:** `public/art/personas/parcero-diego-carnaval.webp`
- **Rozmiar:** 900×1200
- **Prompt:** j.w. *dancing at Carnaval de Barranquilla, wearing colorful cumbia costume with straw hat and red kerchief, blur of dancers behind him, confetti in the air, night atmosphere*

---

## 3.3. TŁA KRÓLESTW — po 3 warianty czas dnia + wnętrze (25 grafik)

### Pueblo del Alba (5 wariantów)

- `reinos/pueblo/pueblo-alba-swit.webp` (1920×1080) — *sunrise view of adobe village on plateau, misty valley below, first golden light hitting rooftops, women carrying water, roosters crowing feeling* + [BASE_STYLE]
- `reinos/pueblo/pueblo-alba-dzien.webp` — *midday, bright warm light, market activity in the plaza, colorful papel picado strung between buildings*
- `reinos/pueblo/pueblo-alba-noc.webp` — *night with lanterns, warm windows, families around outdoor fires, stars above*
- `reinos/pueblo/pueblo-alba-plac.webp` — *town square of the pueblo, fountain, church facade on one side, market stalls, iguana on a wall*
- `reinos/pueblo/pueblo-alba-taras.webp` — *rooftop terrace of a house looking over the whole village, drying chiles on lines, hummingbird feeder*

### Selva de Jade (5 wariantów)

- `reinos/selva/selva-jade-poranek.webp` — *jungle at dawn, mist rising, howler monkeys silhouette, dew on giant leaves, pyramid partially visible* + [BASE_STYLE]
- `reinos/selva/selva-jade-poludnie.webp` — *dappled sunlight through canopy, macaws in flight, tropical humidity, sacred cenote pool*
- `reinos/selva/selva-jade-zmierzch.webp` — *jungle at dusk, fireflies emerging, jaguar eyes glowing in the shadows*
- `reinos/selva/selva-jade-piramida.webp` — *close view of mayan pyramid overgrown with vines, offerings at the base, stone glyphs, hidden stairs*
- `reinos/selva/selva-jade-cenote.webp` — *turquoise cenote pool from above, sunlight beam hitting the water, fish and turtles visible*

### Desierto de los Huesos (5 wariantów)

- `reinos/desierto/desierto-poludnie.webp` — *bright harsh desert light, cracked earth, mission church in distance, buzzard circling* + [BASE_STYLE]
- `reinos/desierto/desierto-zachod.webp` — *sunset painting the desert in red and gold, elongated saguaro shadows*
- `reinos/desierto/desierto-noc.webp` — *desert night, milky way visible, coyote silhouette, single lantern at the mission*
- `reinos/desierto/desierto-misja.webp` — *interior of adobe mission church, wooden pews, retablo on the wall, sunbeams through small windows*
- `reinos/desierto/desierto-warsztat-tkacki.webp` — *weaver's workshop room inside adobe building, backstrap loom, colorful threads, pots of natural dyes, spider on the ceiling web*

### Montañas del Corazón (5 wariantów)

- `reinos/montanas/montanas-swit.webp` — *first light on andean peaks, valleys in shadow, condor gliding, terraced fields visible* + [BASE_STYLE]
- `reinos/montanas/montanas-mgla.webp` — *misty mountain morning, clouds below peaks, stone bridge over gorge*
- `reinos/montanas/montanas-noc.webp` — *snowy mountain night, aurora-like glow, warm windows of stone huts, alpacas huddled*
- `reinos/montanas/montanas-wioska.webp` — *small stone and adobe mountain village, houses stacked on hillside, terraced potato fields*
- `reinos/montanas/montanas-swietowanie.webp` — *festival scene, villagers in colorful traditional attire, singers with instruments, communal fire, papas cooking in earthenware*

### Ciudad de Espejos (5 wariantów)

- `reinos/ciudad/ciudad-dzien.webp` — *colonial caribbean city street, colorful facades, laundry on balconies, cathedral in background, street vendors* + [BASE_STYLE]
- `reinos/ciudad/ciudad-noc.webp` — *same street at night, warm lantern light, music emanating from a bar, couples dancing salsa on the street*
- `reinos/ciudad/ciudad-karnawal.webp` — *street carnival parade in full swing, dancers in cumbia costumes, brass band, confetti*
- `reinos/ciudad/ciudad-plaza.webp` — *main plaza with cathedral, fountain, colonial architecture, palm trees, people gathered*
- `reinos/ciudad/ciudad-port.webp` — *harbor with wooden sailing ships, market on the docks, seagulls, morning haze over the water*

---

## 3.4. WNĘTRZA i SCENY KLUCZOWE (15 grafik)

- `interiors/casa-esperanza.webp` (1600×900) — *interior of Doña Esperanza's home/apothecary, wooden shelves crammed with jars of herbs and dried plants, hanging bundles, table with candles and copal burner, wooden altar with saints and calaveras, warm homey feel* + [BASE_STYLE]
- `interiors/biblioteca.webp` (1600×900) — *monastery library interior, tall wooden shelves with old leather books, ladders on rails, single monk reading at wooden desk, sunbeam through stained glass, dust motes* + [BASE_STYLE]
- `interiors/biblioteca-2.webp` (1600×900) — *reading corner of the library, cushioned bench, open book on stand, candle, botanical illustrations pinned to wall*
- `interiors/altar-muertos.webp` (1200×1600 portret) — *traditional day of the dead ofrenda altar, three tiers, marigolds cascading, photos of ancestors, sugar skulls, pan de muerto, candles, incense smoke, papel picado above* + [BASE_STYLE]
- `interiors/mercado.webp` (1920×1080) — *outdoor tropical market with stalls of fruits, vegetables, spices, textiles, colorful umbrellas, buyers and sellers haggling, warm afternoon light* + [BASE_STYLE]
- `interiors/mercado-fruta.webp` (1200×800) — *closeup of fruit stall with mangoes, papayas, guanabana, granadilla, sold by an elderly vendor*
- `interiors/mercado-textiles.webp` (1200×800) — *textile market with woven blankets, huipiles, ponchos hanging displayed*
- `interiors/carnaval-plaza.webp` (1920×1080) — *main plaza during carnival, big papier-maché figures, dancers with feathered headdresses, brass band*
- `interiors/cocina-tradicional.webp` (1600×900) — *traditional kitchen with wood stove, comal, molcajete on the counter, hanging pots, dried chiles, tomatoes ripening*
- `interiors/patio-hacienda.webp` (1600×900) — *colonial hacienda courtyard, fountain, potted plants, arched walkways, tiled floor*
- `interiors/iglesia-interior.webp` (1200×1600 portret) — *interior of colonial baroque church, ornate golden altar, candles, hispanic santos, stained glass*
- `interiors/cueva-oraculo.webp` (1600×900) — *cave interior with mystical natural light from above, ancient carvings on walls, small altar with obsidian mirror, sense of oracle/prophecy* + [BASE_STYLE]
- `interiors/warsztat-alquimista.webp` (1600×900) — *alchemist workshop with retorts, herbs drying, magical tomes, hanging bones, jars with luminescent liquids*
- `interiors/dormitorio-viajero.webp` (1600×900) — *traveler's bedroom in an inn, hammock, wooden trunk, oil lamp, maps on the wall, personal effects*
- `interiors/observatorio.webp` (1600×900) — *astronomical observatory in adobe tower, sextants, star maps, telescopes, night sky visible through open dome*

---

## 3.5. ILUSTRACJE SŁÓWEK — po ~30 na królestwo (150 grafik)

Wszystkie w formacie 512×512 PNG z transparentnym tłem lub jasnym
pergaminowym. Styl: pojedynczy obiekt izolowany, ozdobna sygnatura w rogu.

### Pueblo del Alba — słownictwo domu, rodziny, jedzenia

`vocab/pueblo/` (30 plików):
- el-hombre, la-mujer, el-nino, la-nina, el-abuelo, la-abuela, el-padre, la-madre, la-familia
- la-casa, la-puerta, la-ventana, la-cocina, la-cama, la-silla, la-mesa, la-llave
- el-pan, la-leche, el-cafe, el-agua, el-huevo, el-queso, la-manzana, el-arroz
- la-vela, el-sombrero, la-guitarra, el-perro, el-gato

**Prompt template dla każdego:** *isolated illustration of {OBIEKT}, folk art style, single subject on pale parchment background, ornamental corner flourishes, warm palette, subtle drop shadow* + [BASE_STYLE]

**Konkretne przykłady:**
- `el-cafe.webp` — *steaming ceramic cup of black coffee on a small saucer, wisps of steam curling like decorative flourishes, coffee bean beside cup*
- `la-guitarra.webp` — *traditional Spanish guitar with intricate rosette, resting against an adobe wall*
- `la-vela.webp` — *lit beeswax candle in a small clay holder, dripping wax, warm glow*

### Selva de Jade — natura, zwierzęta, kolory

`vocab/selva/` (30 plików):
- el-jaguar, el-colibri, el-tucan, el-mono, la-iguana, la-serpiente, la-mariposa, la-abeja, el-quetzal, la-rana
- el-arbol, la-hoja, la-flor, el-rio, la-lluvia, la-nube, el-sol, la-luna, la-estrella, la-piedra
- rojo, verde, azul, amarillo, blanco, negro, dorado, morado, naranja, rosa (dla kolorów: paleta z jaskrawym akcentem)

**Konkretne przykłady:**
- `el-jaguar.webp` — *stylized jaguar head in profile with jade rosettes, aztec-inspired ornamental frame*
- `el-quetzal.webp` — *resplendent quetzal bird with long tail feathers, iridescent green and red, on a branch with morning dew*
- `el-colibri.webp` — *ruby-throated hummingbird mid-flight sipping from a red flower, wings frozen in blur*

### Desierto de los Huesos — czas, przedmioty, geometria

`vocab/desierto/` (30 plików):
- Elementy czasu: el-dia, la-noche, el-ano, el-mes, la-hora, el-reloj, hoy, ayer, manana, el-momento
- Przedmioty: el-libro, el-papel, la-pluma, la-carta, el-mapa, la-brujula, la-lampara, el-cofre, la-llave, el-espejo
- Liczby wizualnie: uno (1 obiekt), dos (2), tres (3)... do diez (10) — narysowane jako grupy przedmiotów

**Konkretne przykłady:**
- `el-reloj.webp` — *ornate old pocket watch with roman numerals, chain, open showing gears inside*
- `el-mapa.webp` — *unrolled aged map with compass rose and dotted route*
- `la-brujula.webp` — *brass compass with intricate details, needle pointing north*

### Montañas del Corazón — emocje, cechy, ciało

`vocab/montanas/` (30 plików):
- Ciało: el-ojo, la-mano, el-corazon, el-pelo, la-cara, la-boca, el-diente, el-pie, el-brazo, la-espalda
- Emocje (jako abstrakcyjne ilustracje w klimacie): feliz, triste, enamorado, cansado, enojado, sorprendido, orgulloso, celoso, tranquilo, valiente
- Relacje: el-amigo, la-novia, la-familia, el-corazon-roto, el-beso, el-abrazo, la-cancion, la-lagrima, la-sonrisa, la-esperanza

**Konkretne przykłady:**
- `el-corazon.webp` — *anatomical heart illustrated as sacred heart (Sagrado Corazón), with flames and thorns, mystical folk style*
- `enamorado.webp` — *stylized figure with hearts floating around head, cheeks flushed, small hummingbirds*
- `la-lagrima.webp` — *single decorative teardrop with a small flower growing from it, symbolic*

### Ciudad de Espejos — miejski slang, kultura, kolumbijskie potrawy

`vocab/ciudad/` (30 plików):
- Kolumbianizmy jako obrazki: chevere (thumbs-up gesture ozdobiony), parcero (dwie osoby fist-bump), bacano, chimba, listo, uy, ay, plata (moneta), rumba (glowing dance floor)
- Potrawy: la-arepa, el-tinto, el-ajiaco, la-bandeja-paisa, el-mango, el-tamale, el-chocolate-caliente, el-aguardiente, el-buñuelo, la-obleas
- Miejskie: el-taxi, el-autobus, el-metro, la-calle, la-plaza, el-bar, el-museo, el-mercado, la-tienda, el-hotel

**Konkretne przykłady:**
- `la-arepa.webp` — *golden grilled arepa split with cheese oozing out, on a woven mat*
- `el-tinto.webp` — *small ceramic cup of strong black Colombian coffee, thermos beside it*
- `la-bandeja-paisa.webp` — *full traditional Colombian platter with rice, beans, egg, plantain, arepa, chicharrón, all illustrated as a colorful spread*

---

## 3.6. LOTERÍA MEXICANA — 54 klasyczne karty (54 grafiki)

Wszystkie 512×768 (3:4 karta gry), z ozdobnym obramowaniem, numerkiem
w rogu, hiszpańską nazwą u dołu w kaligraficznej czcionce.

`games/loteria/cards/`:

1. `01-el-gallo.webp` — kogut
2. `02-el-diablito.webp` — diabełek
3. `03-la-dama.webp` — dama
4. `04-el-catrin.webp` — dżentelmen
5. `05-el-paraguas.webp` — parasol
6. `06-la-sirena.webp` — syrena
7. `07-la-escalera.webp` — drabina
8. `08-la-botella.webp` — butelka
9. `09-el-barril.webp` — beczka
10. `10-el-arbol.webp` — drzewo
11. `11-el-melon.webp` — melon
12. `12-el-valiente.webp` — dzielny
13. `13-el-gorrito.webp` — czapeczka
14. `14-la-muerte.webp` — śmierć (kalawera)
15. `15-la-pera.webp` — gruszka
16. `16-la-bandera.webp` — flaga (Meksyku)
17. `17-el-bandolón.webp` — mandolina
18. `18-el-violoncello.webp` — wiolonczela
19. `19-la-garza.webp` — czapla
20. `20-el-pajaro.webp` — ptak
21. `21-la-mano.webp` — ręka (dłoń)
22. `22-la-bota.webp` — but
23. `23-la-luna.webp` — księżyc
24. `24-el-cotorro.webp` — papuga
25. `25-el-borracho.webp` — pijak
26. `26-el-negrito.webp` — mężczyzna
27. `27-el-corazon.webp` — serce (sagrado)
28. `28-la-sandia.webp` — arbuz
29. `29-el-tambor.webp` — bęben
30. `30-el-camaron.webp` — krewetka
31. `31-las-jaras.webp` — strzały
32. `32-el-musico.webp` — muzyk
33. `33-la-arana.webp` — pająk
34. `34-el-soldado.webp` — żołnierz
35. `35-la-estrella.webp` — gwiazda
36. `36-el-cazo.webp` — patelnia (wok)
37. `37-el-mundo.webp` — świat (globus)
38. `38-el-apache.webp` — wojownik
39. `39-el-nopal.webp` — kaktus opuncja
40. `40-el-alacran.webp` — skorpion
41. `41-la-rosa.webp` — róża
42. `42-la-calavera.webp` — czaszka
43. `43-la-campana.webp` — dzwon
44. `44-el-cantarito.webp` — dzbanek
45. `45-el-venado.webp` — jeleń
46. `46-el-sol.webp` — słońce
47. `47-la-corona.webp` — korona
48. `48-la-chalupa.webp` — łódź
49. `49-el-pino.webp` — sosna
50. `50-el-pescado.webp` — ryba
51. `51-la-palma.webp` — palma
52. `52-la-maceta.webp` — doniczka
53. `53-el-arpa.webp` — harfa
54. `54-la-rana.webp` — żaba

**Wspólny prompt template:**
*loteria mexicana card illustration of {OBIEKT}, colorful traditional folk style like Don Clemente cards but more refined, ornate border, subject centered, deep saturated colors, painted look* + [BASE_STYLE]

---

## 3.7. TALISMANY — 20 osiągnięć (20 grafik)

Wszystkie 512×512, styl medalion / pieczęć / talizman, symetryczne
kompozycje. Format: PNG z transparencją.

`public/art/talismanes/`:

1. `colibri-de-oro.webp` — golden hummingbird medallion, wings spread, laurel wreath around — *nauka 10 słów w jeden dzień*
2. `serpiente-emplumada.webp` — quetzalcoatl feathered serpent forming a circle biting its tail — *7 dni streaka*
3. `voz-del-jaguar.webp` — jaguar head with sound waves emanating — *50 poprawnych trybów rozkazujących*
4. `sombra-del-volcan.webp` — silhouette of volcano with rising smoke, framed by obsidian — *wszystkie zadania Pustyni*
5. `corazon-amaranth.webp` — sacred heart in amaranth pink surrounded by amaranth flowers — *pierwsza wiadomość po hiszpańsku*
6. `puente-colombiano.webp` — colonial stone bridge with Colombian flag colors — *20 kolumbijskich zwrotów*
7. `ojo-del-espejo.webp` — mirror shaped like an eye, mystical — *100% na próbie ser vs estar*
8. `flor-de-cempasuchil.webp` — marigold flower medallion — *ukończenie Ofrendy*
9. `mascara-carnaval.webp` — carnival mask talisman with feathers — *ukończenie Carnaval del Slang*
10. `khipu-de-nudos.webp` — knotted rope talisman — *policzenie w hiszpańskim do 100*
11. `alebrije-guardian.webp` — colorful alebrije creature medallion — *odblokowanie wszystkich 5 królestw*
12. `piedra-de-jade.webp` — jade stone amulet with mayan glyph — *50 słówek Selvy*
13. `sombrero-de-charro.webp` — traditional charro hat medallion — *ukończenie wszystkich zwrotów uprzejmościowych*
14. `tinto-caliente.webp` — steaming coffee cup medallion — *użyj słowa "tinto" 5 razy z curanderą*
15. `parcero-eterno.webp` — two fists bumping medallion — *ukończenie ścieżki Diego*
16. `voz-del-canto.webp` — mouth open in song with musical notes — *ukończenie 5 poziomów Ritmo del Colibrí*
17. `libro-abierto.webp` — open book with light emanating — *odczytanie wszystkich lore cards*
18. `mano-tejedora.webp` — hand with woven thread medallion — *20 zdań zbudowanych w Tejedorze*
19. `luz-de-la-vela.webp` — single candle flame medallion — *nie stracisz streaka przez 30 dni*
20. `estrella-del-alba.webp` — 8-pointed morning star — *osiągnięcie rangi Maestro*

**Prompt template:** *ornate talisman medallion of {SYMBOL}, symmetrical composition, embossed metal look with jewel accents, decorative border with mesoamerican patterns, isolated on transparent background, mystical glow* + [BASE_STYLE]

---

## 3.8. KARTY LORE — 5 na królestwo (25 grafik)

Karty kulturowe do zbierania, format 768×1024 (3:4 karta).

### Pueblo del Alba (5 kart)

- `lore/pueblo/01-copal.webp` — *illustration of copal resin burning in a small clay burner, sacred smoke rising, altar in background* → o kadzidle copal
- `lore/pueblo/02-nixtamalizacion.webp` — *woman grinding corn on a metate, tortillas being pressed, kitchen scene* → o nixtamalizacji
- `lore/pueblo/03-quinceanera.webp` — *young girl in pink princess dress with tiara during her 15th birthday celebration* → o quinceañera
- `lore/pueblo/04-piñata.webp` — *colorful piñata being hit at a party, candy spilling out* → o piñacie
- `lore/pueblo/05-mariachi.webp` — *mariachi band in full traje de charro playing trumpets and vihuelas* → o mariachi

### Selva de Jade (5 kart)

- `lore/selva/01-quetzal.webp` — *sacred quetzal bird in ancient maya text style* → o quetzalu jako świętym ptaku
- `lore/selva/02-cenote.webp` — *underground cenote pool with beam of light, offerings floating* → o cenotach
- `lore/selva/03-glifos.webp` — *mayan hieroglyphs carved on a stele, half-eroded* → o piśmie majów
- `lore/selva/04-cacao.webp` — *cacao pod split open showing beans, xocolatl (Aztec chocolate drink) in a cup* → o kakao i czekoladzie
- `lore/selva/05-chichenitza.webp` — *aerial view of Chichen Itza pyramid with the serpent shadow effect* → o piramidach

### Desierto de los Huesos (5 kart)

- `lore/desierto/01-tierradelfuego.webp` — *cracked earth with a single yellow flower emerging* → o życiu na pustyni
- `lore/desierto/02-mezcal.webp` — *agave plant with a jimador cutting off the piña* → o mezcalu i agawie
- `lore/desierto/03-charro.webp` — *charro on horseback with elaborate saddle* → o charro i vaquero
- `lore/desierto/04-adobe.webp` — *adobe brick being made from mud and straw* → o architekturze adobe
- `lore/desierto/05-santos.webp` — *shelf of hand-carved santos figurines* → o santos folkowej rzeźbie

### Montañas del Corazón (5 kart)

- `lore/montanas/01-condor.webp` — *andean condor soaring, wings fully spread over the mountains* → o kondorze
- `lore/montanas/02-quinoa.webp` — *quinoa field with red and gold seed heads swaying in the wind* → o quinoi
- `lore/montanas/03-machupicchu.webp` — *machu picchu ruins at sunrise, mist below* → o Inkach
- `lore/montanas/04-charango.webp` — *charango instrument made from armadillo shell (traditional)* → o instrumentach andyjskich
- `lore/montanas/05-pachamama.webp` — *offering to Pachamama at a stone altar, coca leaves, corn* → o Pachamamie

### Ciudad de Espejos (5 kart)

- `lore/ciudad/01-cumbia.webp` — *couple dancing cumbia in traditional dress with a candle* → o cumbii
- `lore/ciudad/02-cartagena.webp` — *colorful street in Cartagena walled city* → o Cartagenie
- `lore/ciudad/03-gabo.webp` — *stylized portrait of Gabriel García Márquez with butterflies* → o realizmie magicznym
- `lore/ciudad/04-carnaval.webp` — *Barranquilla carnival scene with big papier-maché heads* → o Karnawale
- `lore/ciudad/05-shakira.webp` — *stylized illustration of a modern Colombian singer* → o kolumbijskiej muzyce współczesnej

**Prompt template:** *lore card illustration of {TEMAT}, painted like a page from an old anthropology book but with vivid folk colors, ornamental border, single subject, storytelling composition* + [BASE_STYLE]

---

## 3.9. OFRENDA — elementy ołtarza (15 grafik)

Wszystkie z transparencją, ok. 400×600, ustawiane na ołtarzu w mini-grze.

`games/ofrenda/elements/`:

1. `vela-blanca.webp` — biała świeca w klasycznym świeczniku
2. `vela-negra.webp` — czarna świeca
3. `vela-morada.webp` — fioletowa świeca (kolor żałoby)
4. `cempasuchil.webp` — pęk marigoldów
5. `cempasuchil-camino.webp` — ścieżka z płatków marigoldów
6. `pan-de-muerto.webp` — chleb zmarłych z ozdobnymi "kośćmi" z ciasta
7. `calavera-azucar.webp` — cukrowa czaszka ozdobiona
8. `agua-vaso.webp` — szklanka wody
9. `sal-plato.webp` — talerzyk z solą
10. `copal-quemador.webp` — kadzielnica z copalem
11. `foto-antepasado.webp` — ramka na zdjęcie przodka (puste w środku)
12. `papel-picado-morado.webp` — fioletowa wycinanka
13. `mezcal-vaso.webp` — kieliszek mezcalu
14. `mole-plato.webp` — talerzyk z mole
15. `crucifijo.webp` — mały krzyżyk drewniany

**Prompt template:** *isolated {ELEMENT} on transparent background, day of the dead altar item, folk art style, hand-painted feel* + [BASE_STYLE]

---

## 3.10. MASKI KARNAWAŁOWE — Carnaval del Slang (16 grafik)

`games/carnaval/masks/` — po 8 masek dla dwóch znaczeń slangu.

Grupa "SUPER" (masks dla synonimów "chévere/bacano/chimba"):
1. `mask-chevere.webp` — maska z uśmiechem, kolory neonowe
2. `mask-bacano.webp` — maska z gwiazdami
3. `mask-chimba.webp` — maska z płomieniami
4. `mask-brutal.webp` — maska z ostrymi kątami
5. `mask-heavy.webp` — maska z ciężkimi ozdobami metalowymi
6. `mask-genial.webp` — maska z złotymi laurami
7. `mask-espectacular.webp` — maska z pióropuszem
8. `mask-buenisimo.webp` — maska w sercach

Grupa "KOLEGA" (masks dla synonimów "parcero/parce/mano/hermano"):
9. `mask-parcero.webp` — maska z uściskiem dłoni
10. `mask-parce.webp` — maska prostota
11. `mask-mano.webp` — maska z dłonią
12. `mask-hermano.webp` — maska z bratnimi wzorami
13. `mask-loco.webp` — maska szaleńca
14. `mask-guey.webp` — maska meksykańska
15. `mask-compadre.webp` — maska dojrzała
16. `mask-carnal.webp` — maska ciepła

**Prompt template:** *ornate carnival mask illustration, front view, papier-mâché look, feathers and beads, {STYLE_MODIFIER}, folk carnival de Barranquilla aesthetic* + [BASE_STYLE]

---

## 3.11. INSTRUMENTY (Cantores) — 10 grafik

`games/ritmo/instruments/`:

1. `charango.webp` — mały charango z pancerza armadillo
2. `quena.webp` — andyjski flet quena
3. `zampona.webp` — andyjska fujarka pan (siku)
4. `bombo.webp` — andyjski bęben
5. `guitarra-espanola.webp` — hiszpańska gitara klasyczna
6. `maracas.webp` — para maracas
7. `guiro.webp` — tarka güiro
8. `marimba.webp` — marimba drewniana
9. `arpa-jarocho.webp` — meksykańska harfa
10. `vihuela.webp` — mała gitara mariachi

---

## 3.12. STRAGANY MERCADO — 12 grafik

`games/mercado/stalls/`:

- `stall-frutas.webp` — stragan z owocami tropikalnymi
- `stall-verduras.webp` — stragan z warzywami
- `stall-especias.webp` — stragan z przyprawami (piramidy sypkich)
- `stall-flores.webp` — stragan z kwiatami
- `stall-textiles.webp` — stragan z tkaninami
- `stall-hierbas.webp` — stragan zielarski
- `stall-carnes.webp` — stragan mięsny
- `stall-pescado.webp` — stragan rybny
- `stall-panaderia.webp` — piekarnia (chleby)
- `stall-tortilleria.webp` — tortilleria
- `stall-artesanias.webp` — rękodzieło (maski, ceramika)
- `stall-juguetes.webp` — zabawki tradycyjne

Każdy stragan z osobnym NPC-sprzedawcą narysowanym w środku sceny.

---

## 3.13. PRZEDMIOTY CURANDERY — 20 grafik małych, SVG-friendly

Wszystkie dostępne w chacie curandery jako klikalne "easter eggi" które
gdy klikniesz dają jakąś anegdotę.

`curandera/objects/`:

1. `frasco-hierbas.webp` — słoik ziół
2. `manojo-salvia.webp` — pęczek szałwii
3. `piedra-obsidiana.webp` — obsydianowy kamień
4. `mortero.webp` — moździerz i tłuczek
5. `abanico.webp` — wachlarz z piór
6. `estatua-santa.webp` — figurka świętej
7. `gato-viejo.webp` — stary kot curandery (śpi)
8. `perro-viejo.webp` — pies curandery (patrzy)
9. `hamaca.webp` — hamak
10. `chocolate-taza.webp` — czekolada w kubku
11. `talco-frasco.webp` — talk
12. `flor-seca.webp` — zasuszony kwiat
13. `escoba-hierbas.webp` — miotełka z ziół (do limpia)
14. `campana-pequena.webp` — dzwoneczek
15. `veladora.webp` — wotywna świeca w szkle
16. `sombrero-viejo.webp` — stary kapelusz
17. `libro-recetas.webp` — księga receptur ziołowych
18. `pluma-quetzal.webp` — pióro quetzala
19. `moneda-vieja.webp` — stara moneta
20. `retrato-antepasado.webp` — obrazek przodka

---

## 3.14. ZWIERZĘTA — dodatkowe 15 grafik (poza vocab)

Do animowanych ambienów, easter eggów, cutscenek:

`animals/`:
- `condor-vuelo.webp` — kondor w locie
- `jaguar-pareja.webp` — para jaguarów
- `llama-manada.webp` — lama i alpaki
- `armadillo.webp` — armadyl
- `tapir.webp` — tapir amazoński
- `perezoso.webp` — leniwiec
- `flamingo.webp` — flamingo
- `caiman.webp` — kajman
- `capibara.webp` — kapibara
- `puma.webp` — puma
- `mono-arana.webp` — małpa pająk
- `escarabajo-jade.webp` — chrząszcz jadeitowy
- `pez-tropical.webp` — ryba tropikalna
- `oceleto.webp` — ocelot
- `tortuga-marina.webp` — żółw morski

---

## 3.15. ROŚLINY — 15 grafik dekoracyjnych i edukacyjnych

`plants/`:
- `cempasuchil-kwiat.webp` — kwiat marigoldu
- `agave-blue.webp` — agawa niebieska
- `saguaro.webp` — kaktus saguaro
- `nopal.webp` — kaktus opuncja z owocami
- `orchidea.webp` — orchidea
- `bromelia.webp` — bromelia
- `heliconia.webp` — heliconia
- `guanabana-owoc.webp` — owoc guanabana
- `granadilla.webp` — granadilla
- `mango-drzewo.webp` — drzewo mango
- `ceiba.webp` — święta ceiba
- `cacao-drzewo.webp` — drzewo kakaowca
- `coca-krzew.webp` — krzew koki
- `maiz-kolba.webp` — kolba kukurydzy
- `chile-strak.webp` — strąki chili

---

## 3.16. POTRAWY I NAPOJE — 15 grafik

`food/`:
- `arepa-queso.webp` — arepa z serem
- `bandeja-paisa.webp` — bandeja paisa
- `ajiaco.webp` — zupa ajiaco
- `tamale.webp` — tamale w liściu bananowca
- `tacos-al-pastor.webp` — tacos al pastor
- `mole-poblano.webp` — mole poblano
- `chiles-rellenos.webp` — chiles rellenos
- `pan-de-muerto-detail.webp` — pan de muerto z bliska
- `chocolate-caliente.webp` — gorąca czekolada z pianką
- `aguardiente-botella.webp` — butelka aguardiente
- `mezcal-copita.webp` — mezcal w małym kieliszku
- `tinto-porron.webp` — dzbanek z tinto
- `arroz-con-leche.webp` — ryż z mlekiem (deser)
- `dulce-de-leche.webp` — dulce de leche
- `salsa-molcajete.webp` — salsa w molcajete

---

## 3.17. ARCHITEKTURA — 15 grafik ozdobników

`architecture/`:
- `arco-piedra.webp` — kamienny łuk (do brama królestwa)
- `campanario.webp` — dzwonnica kolonialnej misji
- `fuente-central.webp` — kolonialna fontanna
- `balkon-frontowy.webp` — balkon z ozdobną kutą kratą
- `puerta-antigua.webp` — stare drewniane drzwi z żelaznymi okuciami
- `ventana-reja.webp` — okno z ozdobną kratą
- `patio-mudejar.webp` — patio z płytkami mudéjar
- `piramida-maya.webp` — piramida majów w perspektywie
- `templo-inca.webp` — świątynia Inków
- `iglesia-fasada.webp` — fasada kolonialnego kościoła
- `hacienda-portal.webp` — brama hacjendy
- `mercado-arcada.webp` — arkady miejskiego rynku
- `pozo-village.webp` — wioskowa studnia
- `puente-piedra.webp` — kamienny most
- `wall-adobe.webp` — mur adobe (tileable tekstura)

---

## 3.18. TEKSTURY I WZORY — do tileable użycia jako tła (10 grafik + 5 SVG)

**PNG tileable (2048×2048, seamless):**

`textures/`:
- `pergamin-podklad.webp` — pergaminowy podkład (używany jako baza wielu widoków)
- `piedra-tallada.webp` — kamień rzeźbiony (majańskie wzory)
- `tela-ayacay.webp` — andyjska tkanina aguayo
- `mosaico-talavera.webp` — talavera mosaic tiles
- `papel-amate.webp` — meksykański papier amate
- `oro-repujado.webp` — repuszowane złoto (do detali luksusowych)
- `jade-polerowany.webp` — polerowany jadeit
- `arena-desert.webp` — piasek pustynny
- `hoja-jungla.webp` — liść dżungli
- `agua-caribe.webp` — powierzchnia wody karaibskiej

**SVG patterns generowane w kodzie (nie do generacji AI):**
- `papel-picado.svg` — łańcuch wycinanek (`components/FramePicado.ts`)
- `khipu.svg` — sznur khipu z węzełkami (paski postępu)
- `glifos-mayas.svg` — powtarzalny wzór glifów majańskich
- `azteca-frize.svg` — aztecki fryz geometryczny
- `alpaca-wool.svg` — wzór wełny alpaki

---

## 3.19. KSIĘGI BIBLIOTEKI — 12 okładek

`biblioteca/books/`:
- `libro-nombres.webp` — księga rzeczowników (brązowa okładka z hieroglifami)
- `libro-verbos.webp` — księga czasowników (czerwona z płomieniem)
- `libro-adjetivos.webp` — księga przymiotników (fioletowa z gwiazdami)
- `libro-numeros.webp` — księga liczb (złota z abakusem)
- `libro-colores.webp` — księga kolorów (tęczowa)
- `libro-tiempo.webp` — księga czasu (turkusowa z zegarem)
- `libro-animales.webp` — księga zwierząt (zielona z jaguarem)
- `libro-cuerpo.webp` — księga ciała (różowa z sercem)
- `libro-emociones.webp` — księga emocji (niebieska z twarzami)
- `libro-comida.webp` — księga jedzenia (pomarańczowa z arepą)
- `libro-colombia.webp` — księga Kolumbii (żółto-niebiesko-czerwona)
- `libro-gramatica.webp` — księga gramatyki (skórzana z tkanym oplotem)

**Prompt template:** *antique leather-bound book cover of "{TYTUŁ}", ornate metal corners, gilded title in Cinzel font, mesoamerican decorative motifs embossed, single closed book from ¾ angle* + [BASE_STYLE]

---

## 3.20. KARTY GRAMATYKI — 10 wizualnych metafor

`gramatyka/cards/`:

- `ser-vs-estar.webp` — *ilustracja: dwie postacie w tej samej scenie — jedna ma stałą aurę (SER), druga otoczoną znikającymi ptakami (ESTAR — zmienna); podpisy pod obrazem*
- `los-articulos.webp` — *cztery klucze (el, la, un, una) w różnych rozmiarach otwierające cztery drzwi*
- `tener.webp` — *ręce trzymające pęk kluczy, monet i serc — symbol "mieć"*
- `ir.webp` — *ilustrowana ścieżka na mapie z zaznaczonymi trzema formami (voy, vas, va)*
- `gustar.webp` — *scena "mnie się podoba kawa" — kawa "podchodzi" do człowieka, nie odwrotnie*
- `pretérito.webp` — *ilustrowana klepsydra z piaskiem który już opadł, symbolizująca dokonaną przeszłość*
- `subjuntivo.webp` — *dwie ścieżki rozdzielające się we mgle, symbolizujące niepewność trybu*
- `por-vs-para.webp` — *dwa mosty — jeden przez rzekę (POR - przez), drugi do konkretnego domu (PARA - do celu)*
- `pronombres.webp` — *pięć maleńkich postaci z podpisami: yo, tú, él, ella, nosotros*
- `plurales.webp` — *jedno drzewo z boku, pięć drzew z drugiej strony, strzałka "-s" łącząca*

---

## 3.21. RANGI UCZNIA — 5 portretów awatarowych

`ranks/`:
- `rango-1-peregrino.webp` — początkujący podróżnik, prosty strój, sandały, sakwa
- `rango-2-explorador.webp` — uczy się mapy, kompas w ręku, kapelusz
- `rango-3-aventurero.webp` — pewny siebie, pełny ekwipunek, laska podróżna
- `rango-4-sabio.webp` — mądry, siwe włosy pojawiają się, książki pod pachą
- `rango-5-maestro.webp` — mistrz, ceremonialna szata z motywami wszystkich pięciu królestw

**Prompt template:** *portrait of a traveler in {RANK} stage of journey, mesoamerican fantasy adventurer, {DETAIL}, waist-up view* + [BASE_STYLE]

---

## 3.22. INTRO CUTSCENE — 8 klatek pierwszego uruchomienia

Krótka sekwencja graficzna gdy user pierwszy raz odpala aplikację.
Kolejne obrazki po sobie z fade i tekstem narracyjnym.

`intro/`:
1. `intro-01-noc.webp` — noc, gwiazdy nad pustynią, sylwetka podróżnika
2. `intro-02-esperanza.webp` — curandera przy ogniu wita podróżnika
3. `intro-03-mapa.webp` — curandera rozkłada mapę na stole
4. `intro-04-piec-krolestw.webp` — mapa pięciu królestw ożywa (subtelny animowany element)
5. `intro-05-obietnica.webp` — curandera daje podróżnikowi mały amulet
6. `intro-06-swit.webp` — świt nad Pueblo del Alba, podróżnik wchodzi do wioski
7. `intro-07-lud.webp` — mieszkańcy pueblo witają podróżnika
8. `intro-08-tytul.webp` — tytuł "Cinco Reinos" wyłania się nad krajobrazem

**Prompt template:** *cinematic storybook illustration, {SCENE}, {MOOD_LIGHT}* + [BASE_STYLE]

---

## 4. WYKORZYSTANIE W KODZIE — mapowanie grafik do modułów

Poniżej tabela która grafiki są krytyczne dla którego pliku TypeScript.
Codex ma to potraktować jako listę zależności — nie może pominąć żadnego
z tych placeholderów w SVG.

| Moduł | Wymaga grafik | Fallback |
|-------|---------------|----------|
| `screens/portada/index.ts` | mapa-mundi, intro-08-tytul, alebrijes SVG | placeholder-sunset.svg |
| `screens/mapa/index.ts` | mapa-mundi, 5× mapa-region-*, portret esperanza | placeholder gradient |
| `screens/reino/pueblo.ts` | 5× reinos/pueblo/*, 3-5× casa-esperanza, karty lore/pueblo/* | placeholder terracotta |
| `screens/reino/selva.ts` | 5× reinos/selva/*, guardian-jaguar, karty lore/selva/*, animals | placeholder jade |
| `screens/reino/desierto.ts` | 5× reinos/desierto/*, tejedora, karty lore/desierto/* | placeholder sand |
| `screens/reino/montanas.ts` | 5× reinos/montanas/*, cantor, karty lore/montanas/* | placeholder purple |
| `screens/reino/ciudad.ts` | 5× reinos/ciudad/*, parcero-diego, karty lore/ciudad/* | placeholder turquoise |
| `screens/curandera/index.ts` | dona-esperanza, dona-esperanza-mysli, casa-esperanza, 20× curandera/objects/* | placeholder home |
| `screens/biblioteca/index.ts` | interiors/biblioteca (2 warianty), 12× biblioteca/books/* | placeholder library |
| `screens/talismanes/index.ts` | 20× talismanes/* | SVG glow placeholder |
| `screens/retos/index.ts` | zależne od retos | — |
| `games/loteria/index.ts` | 54× loteria/cards/* + planszę | wygeneruj SVG karty proceduralnie |
| `games/mercado/index.ts` | 12× stalls/*, interiors/mercado, food/* | placeholder market |
| `games/tejedora/index.ts` | personas/tejedora-krosno, tekstura tkaniny | pattern SVG |
| `games/ritmo/index.ts` | 10× instruments/*, cantor-nocturno | placeholder note |
| `games/ofrenda/index.ts` | interiors/altar-muertos, 15× ofrenda/elements/* | placeholder altar |
| `games/carnaval/index.ts` | 16× carnaval/masks/*, ciudad-karnawal | placeholder mask |

---

## 5. INSTRUKCJA GENEROWANIA — dla usera

Codex nie generuje bitmap. Twoim (Maciek) zadaniem — lub zadaniem
osoby technicznej — jest wygenerowanie tych ~360 grafik przez:

**Opcja A: Midjourney (rekomendowane dla jakości)**
- Załóż konto, subskrypcja Standard
- Wklejaj każdy prompt z tego dokumentu
- Do bazowego prompt dokleisz `--niji 6 --stylize 500 --ar {aspect}` (odpowiednio 1:1, 3:4, 16:9)
- Downloaduj najlepszy wariant, konwertuj do WebP (`cwebp -q 85 in.png -o out.webp`)
- Wrzucaj do `public/art/` zachowując strukturę katalogów

**Opcja B: Stable Diffusion (lokalnie, za darmo)**
- Zainstaluj **Automatic1111** albo **ComfyUI**
- Pobierz model: `dreamshaperXL_v21TurboDPMSDE` albo `juggernautXL_v9`
- Ustaw sampler: DPM++ 2M SDE Karras, 25 kroków
- CFG scale: 7-8
- Wklejaj prompty, dodaj negative prompt z sekcji 2.4
- Konwertuj do WebP

**Opcja C: Zlecenie ludzkiemu ilustratorowi**
- Ten dokument jest gotowym briefem — możesz wysłać go osobie która
  rysuje w tym stylu (poszukaj na behance, artstation lub instagram
  tagów: #mesoamericanart #latinamericanillustration #folkart)
- Budget: ~15-30 USD za ilustrację środkowej jakości, szybciej dla
  masówki (jak vocab).

**Opcja D: Postawić na SVG-only** (najtańsze)
- Codex ma zaimplementować pełne fallbacki SVG dla wszystkich pozycji
- Jakość niższa ale utrzymuje spójność stylistyczną
- Punkty startowe do generowania proceduralnego są w
  `src/utils/placeholderGenerators/` (Codex ma to zaimplementować)

**Opcja E: Miks A+D**
- Wygeneruj krytyczne 40-50 grafik (mapy, portrety NPC, tła królestw,
  intro) w MJ
- Reszta w SVG proceduralnie
- Najlepszy stosunek jakość/czas

---

## 6. PODSUMOWANIE LICZB

| Kategoria | Liczba grafik |
|-----------|--------------|
| Mapa i orientacja | 7 |
| Główni NPC (portrety + warianty) | 10 |
| Tła królestw (5 królestw × 5 wariantów) | 25 |
| Wnętrza i sceny | 15 |
| Ilustracje słówek (5 królestw × 30) | 150 |
| Lotería Mexicana | 54 |
| Talismany | 20 |
| Karty lore (5 królestw × 5) | 25 |
| Elementy Ofrendy | 15 |
| Maski karnawału | 16 |
| Instrumenty | 10 |
| Stragany Mercado | 12 |
| Przedmioty curandery | 20 |
| Zwierzęta dodatkowe | 15 |
| Rośliny | 15 |
| Potrawy | 15 |
| Architektura | 15 |
| Tekstury i wzory (PNG) | 10 |
| Wzory SVG (proceduralne) | 5 |
| Księgi biblioteki | 12 |
| Karty gramatyki | 10 |
| Rangi ucznia | 5 |
| Intro cutscene | 8 |
| **RAZEM** | **489** |

Faktyczna liczba to **~489 grafik** (włącznie z SVG proceduralnymi). Rdzeń wizualny to
**~340 bitmap** i **~150 SVG generowanych w kodzie**. Duży, ambitny projekt.

Jeśli chcesz to zawęzić do MVP: zostaw krytyczne kategorie
(mapa + NPC + tła + Lotería + talismany + intro + karty gramatyki) —
tj. około **150 bitmap** — a resztę zaimplementuj jako proceduralne SVG.

---

*Koniec apendyksu.*
