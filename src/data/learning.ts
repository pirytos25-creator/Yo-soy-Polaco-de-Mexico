import { grammarTables, noteCards, pronunciationRows, sourceStats, vocabEntries, type EntryKind, type ReinoId } from './vocab.generated';

export type VocabEntry = (typeof vocabEntries)[number];
export type GrammarTable = (typeof grammarTables)[number];
export type NoteCard = (typeof noteCards)[number];
export type PronunciationRow = (typeof pronunciationRows)[number];

export { grammarTables, noteCards, pronunciationRows, sourceStats, vocabEntries };

export function entriesForReino(reino: ReinoId): VocabEntry[] {
  return vocabEntries.filter((entry) => entry.reino === reino);
}

export function entriesForKind(kind: EntryKind): VocabEntry[] {
  return vocabEntries.filter((entry) => entry.kind === kind);
}

export function categoriesForReino(reino: ReinoId): string[] {
  return Array.from(new Set(entriesForReino(reino).map((entry) => entry.category))).sort((a, b) => a.localeCompare(b, 'pl'));
}

export function sampleEntries(entries: readonly VocabEntry[], amount: number, seed = 7): VocabEntry[] {
  const copy = [...entries];
  let state = seed || 1;
  for (let index = copy.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swap = state % (index + 1);
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy.slice(0, amount);
}

export function normalizeAnswer(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[¿?¡!.,;:()«»"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isCloseAnswer(input: string, expected: string): boolean {
  const left = normalizeAnswer(input);
  const right = normalizeAnswer(expected);
  return left === right || right.includes(left) || left.includes(right);
}

export function findEntry(id: string): VocabEntry | undefined {
  return vocabEntries.find((entry) => entry.id === id);
}
