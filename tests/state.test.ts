import { describe, expect, it } from 'vitest';
import { cloneDefaultState, gainChispas, markGamePlayed, markLearned, updateDailyFlame } from '../src/core/state';

describe('traveler state', () => {
  it('starts a sacred flame on first visit', () => {
    const state = updateDailyFlame(cloneDefaultState(), new Date('2026-07-09T12:00:00Z'));
    expect(state.streak.dni).toBe(1);
    expect(state.streak.ostatniDzien).toBe('2026-07-09');
  });

  it('awards reputation and rank through chispas', () => {
    const state = gainChispas(cloneDefaultState(), 120, 'pueblo');
    expect(state.ranga).toBe('peregrino2');
    expect(state.reputacja.pueblo).toBeGreaterThan(0);
  });

  it('tracks learned kinds for talisman conditions', () => {
    const state = cloneDefaultState();
    for (let index = 0; index < 8; index += 1) {
      markLearned(state, `col-${index}`, 'colombian', 'ciudad', 1);
    }
    expect(state.learnedKinds.colombian).toBe(8);
    expect(state.talismany).toContain('vaso-de-tinto');
  });

  it('counts completed pruebas', () => {
    const state = cloneDefaultState();
    markGamePlayed(state, 'ciudad', 24);
    markGamePlayed(state, 'ciudad', 24);
    markGamePlayed(state, 'ciudad', 24);
    expect(state.gamesPlayed).toBe(3);
    expect(state.talismany).toContain('mascara-de-carnaval');
  });
});
