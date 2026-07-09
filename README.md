# Cinco Reinos

Diegetyczna aplikacja do nauki hiszpańskiego dla Maćka: pięć królestw, słownictwo wydobyte z `hiszpanski-dla-macka.docx`, lokalny postęp w `localStorage` i opcjonalna Curandera przez Ollamę.

## Jak odpalić

1. `npm install`
2. `npm run dev`
3. Otwórz `http://127.0.0.1:5173`

Backend Fastify działa pod `http://127.0.0.1:3000`, a Vite przekazuje `/api` do backendu.

## Ollama

Curandera działa bez kont i bez chmury. Gdy Ollama nie jest uruchomiona, aplikacja przechodzi w tryb uśpionej curandery.

```
ollama pull llama3.1:8b-instruct
ollama serve
```

Zmienne można ustawić w `.env.local` według `.env.example`.

## Dane

`src/data/vocab.generated.ts` jest generowany z Worda przez:

```
python scripts/extract_vocab_from_docx.py
```

Aktualna ekstrakcja obejmuje 713 pozycji: 200 rzeczowników, 100 przymiotników, 200 czasowników, krótkie słowa funkcyjne, zwroty codzienne oraz kolumbijskie wyrażenia.

## Grafiki

`PROMPTS.md` zawiera pełny inwentarz grafik i promptów generacyjnych z apendyksu. Dopóki bitmapy nie istnieją w `public/art/`, aplikacja używa proceduralnych SVG w stylu retablo, map, murali i masek.

## Komendy

```
npm run test
npm run build
npm run preview
```
