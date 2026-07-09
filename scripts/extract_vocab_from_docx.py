from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from docx import Document
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table
from docx.text.paragraph import Paragraph


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "hiszpanski-dla-macka.docx"
OUT = ROOT / "src" / "data" / "vocab.generated.ts"


@dataclass
class TableBlock:
    index: int
    context: list[str]
    rows: list[list[str]]


def iter_blocks(doc: Document) -> Iterable[Paragraph | Table]:
    for child in doc.element.body.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, doc)
        elif isinstance(child, CT_Tbl):
            yield Table(child, doc)


def clean_cell(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\n", " ")).strip()


def slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value.lower())
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii")
    ascii_value = re.sub(r"^(el|la|los|las|un|una|unos|unas)\s+", "", ascii_value)
    ascii_value = re.sub(r"[^a-z0-9]+", "-", ascii_value).strip("-")
    return ascii_value or "item"


def kingdom_for(kind: str, category: str, spanish: str) -> str:
    text = f"{category} {spanish}".lower()
    if kind == "colombian":
        return "ciudad"
    if kind in {"colombian", "phrase"}:
        if "restauracji" in text or "sklepie" in text or "kolumb" in text:
            return "ciudad"
        if "pożegnania" in text or "uprzejmość" in text or "poznanie" in text:
            return "pueblo"
    if kind == "noun":
        if any(key in text for key in ["ludzie", "rodzina", "dom", "jedzenie", "picie"]):
            return "pueblo"
        if any(key in text for key in ["ciało", "natura", "pogoda", "zwierzęta"]):
            return "selva"
        if any(key in text for key in ["czas", "praca", "szkoła", "pieniądze"]):
            return "desierto"
        return "ciudad"
    if kind == "adjective":
        if any(key in text for key in ["kolor", "stany"]):
            return "selva"
        return "montanas"
    if kind == "verb":
        if any(key in text for key in ["najważniejsze", "praca", "działanie"]):
            return "desierto"
        if any(key in text for key in ["codzienne"]):
            return "pueblo"
        if any(key in text for key in ["ruch", "podróż", "twórcze", "rozrywkowe"]):
            return "ciudad"
        if any(key in text for key in ["zmysły"]):
            return "selva"
        return "montanas"
    if kind in {"preposition", "conjunction", "question", "adverb", "number", "grammar"}:
        return "desierto"
    return "pueblo"


def kind_for_table(index: int) -> str | None:
    if 4 <= index <= 13:
        return "noun"
    if 15 <= index <= 16:
        return "adjective"
    if 18 <= index <= 25:
        return "verb"
    if index == 26:
        return "preposition"
    if index == 27:
        return "conjunction"
    if index == 28:
        return "question"
    if index == 30:
        return "adverb"
    if index == 31:
        return "number"
    if 33 <= index <= 39:
        return "phrase"
    if index == 55:
        return "colombian"
    return None


def category_from_context(context: list[str]) -> str:
    if not context:
        return "Ogólne"
    ignored = {
        "Przykłady:",
        "W środku znajdziesz:",
        "Vamos.",
        "◆ ◆ ◆",
    }
    for item in reversed(context):
        if len(item) <= 90 and item not in ignored and not item.startswith("•"):
            return item
    return context[-1]


def extract_tables() -> list[TableBlock]:
    doc = Document(SOURCE)
    context: list[str] = []
    tables: list[TableBlock] = []
    for block in iter_blocks(doc):
        if isinstance(block, Paragraph):
            text = block.text.strip()
            if text:
                context.append(text)
                context = context[-6:]
        else:
            rows = [[clean_cell(cell.text) for cell in row.cells] for row in block.rows]
            tables.append(TableBlock(index=len(tables), context=context[:], rows=rows))
    return tables


def make_entries(tables: list[TableBlock]) -> list[dict[str, object]]:
    entries: list[dict[str, object]] = []
    seen: set[str] = set()
    for table in tables:
        kind = kind_for_table(table.index)
        if not kind or len(table.rows) < 2:
            continue
        header = [cell.lower() for cell in table.rows[0]]
        if "hiszpański" not in header[0].lower() and table.index != 57:
            continue
        category = category_from_context(table.context)
        for row_index, row in enumerate(table.rows[1:], start=1):
            if len(row) < 2 or not row[0] or not row[1]:
                continue
            spanish, polish = row[0], row[1]
            entry_id = f"{kind}-{slug(category)}-{slug(spanish)}"
            if entry_id in seen:
                entry_id = f"{entry_id}-{row_index}"
            seen.add(entry_id)
            entries.append(
                {
                    "id": entry_id,
                    "es": spanish,
                    "pl": polish,
                    "kind": kind,
                    "category": category,
                    "reino": kingdom_for(kind, category, spanish),
                    "imageKey": slug(spanish),
                    "sourceTable": table.index,
                }
            )
    return entries


def make_pronunciation(tables: list[TableBlock]) -> list[dict[str, str]]:
    table = tables[1]
    return [
        {"spanish": row[0], "sound": row[1], "example": row[2]}
        for row in table.rows[1:]
        if len(row) >= 3 and row[0]
    ]


def make_notes(tables: list[TableBlock]) -> list[dict[str, object]]:
    notes: list[dict[str, object]] = []
    for table in tables:
        if len(table.rows) == 1 and len(table.rows[0]) == 1:
            text = table.rows[0][0].strip()
            if not text:
                continue
            first_line = text.split("\n", 1)[0].strip()
            notes.append(
                {
                    "id": f"nota-{table.index}-{slug(first_line)}",
                    "title": first_line[:80],
                    "body": text,
                    "category": category_from_context(table.context),
                    "sourceTable": table.index,
                }
            )
    return notes


def make_grammar(tables: list[TableBlock]) -> list[dict[str, object]]:
    grammar: list[dict[str, object]] = []
    for table in tables:
        if 40 <= table.index <= 54 and len(table.rows) > 1:
            grammar.append(
                {
                    "id": f"gramatyka-{table.index}-{slug(category_from_context(table.context))}",
                    "title": category_from_context(table.context),
                    "headers": table.rows[0],
                    "rows": table.rows[1:],
                    "sourceTable": table.index,
                }
            )
    return grammar


def emit_ts(name: str, value: object) -> str:
    return f"export const {name} = {json.dumps(value, ensure_ascii=False, indent=2)} as const;\n"


def main() -> None:
    tables = extract_tables()
    entries = make_entries(tables)
    notes = make_notes(tables)
    grammar = make_grammar(tables)
    pronunciation = make_pronunciation(tables)
    counts: dict[str, int] = {}
    for entry in entries:
        counts[entry["kind"]] = counts.get(entry["kind"], 0) + 1

    ts = """// Generated from hiszpanski-dla-macka.docx by scripts/extract_vocab_from_docx.py.
// Do not edit by hand; change the DOCX or extraction mapping and regenerate.

export type ReinoId = 'pueblo' | 'selva' | 'desierto' | 'montanas' | 'ciudad';
export type EntryKind = 'noun' | 'adjective' | 'verb' | 'preposition' | 'conjunction' | 'question' | 'adverb' | 'number' | 'phrase' | 'colombian';

"""
    ts += emit_ts("vocabEntries", entries)
    ts += "\n"
    ts += emit_ts("pronunciationRows", pronunciation)
    ts += "\n"
    ts += emit_ts("grammarTables", grammar)
    ts += "\n"
    ts += emit_ts("noteCards", notes)
    ts += "\n"
    ts += emit_ts(
        "sourceStats",
        {
            "source": SOURCE.name,
            "tables": len(tables),
            "entries": len(entries),
            "counts": counts,
        },
    )
    OUT.write_text(ts, encoding="utf-8")
    print(f"Wygenerowano {OUT.relative_to(ROOT)}: {len(entries)} haseł, {len(grammar)} tabel gramatyki, {len(notes)} not.")


if __name__ == "__main__":
    main()
