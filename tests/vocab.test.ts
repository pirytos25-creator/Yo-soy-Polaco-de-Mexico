import { describe, expect, it } from 'vitest';
import { entriesForKind, sourceStats, vocabEntries } from '../src/data/learning';

describe('vocab extraction', () => {
  it('keeps the core Word counts from hiszpanski-dla-macka.docx', () => {
    expect(sourceStats.tables).toBe(59);
    expect(sourceStats.counts.noun).toBe(200);
    expect(sourceStats.counts.adjective).toBe(100);
    expect(sourceStats.counts.verb).toBe(200);
  });

  it('maps Colombian phrases to Ciudad de Espejos', () => {
    const colombian = entriesForKind('colombian');
    expect(colombian.length).toBeGreaterThanOrEqual(20);
    expect(colombian.every((entry) => entry.reino === 'ciudad')).toBe(true);
  });

  it('contains practical phrases and not only vocabulary lists', () => {
    expect(vocabEntries.some((entry) => entry.es === '¿Qué más pues?')).toBe(true);
    expect(vocabEntries.some((entry) => entry.es === 'Soy polaco.')).toBe(false);
  });
});
