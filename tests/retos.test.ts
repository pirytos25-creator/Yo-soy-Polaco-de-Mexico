import { describe, expect, it } from 'vitest';
import { reinos } from '../src/data/reinos';
import { retos } from '../src/data/retos';

describe('retos', () => {
  it('offers at least three playable mini-games', () => {
    const playable = new Set(retos.map((reto) => reto.tipo).filter((tipo) => tipo !== 'biblioteca'));
    expect(playable.size).toBeGreaterThanOrEqual(3);
  });

  it('keeps every reino reachable', () => {
    expect(reinos.map((reino) => reino.id)).toEqual(['pueblo', 'selva', 'desierto', 'montanas', 'ciudad']);
  });
});
