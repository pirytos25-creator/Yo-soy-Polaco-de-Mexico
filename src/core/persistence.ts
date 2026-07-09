import { cloneDefaultState, updateDailyFlame, type UserState } from './state';

const STORAGE_KEY = 'cincoreinos:state';

export function loadState(): UserState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return updateDailyFlame(cloneDefaultState());
    const parsed = JSON.parse(raw) as Partial<UserState>;
    const merged = {
      ...cloneDefaultState(),
      ...parsed,
      reputacja: { ...cloneDefaultState().reputacja, ...(parsed.reputacja ?? {}) },
      ustawienia: { ...cloneDefaultState().ustawienia, ...(parsed.ustawienia ?? {}) },
    };
    return updateDailyFlame(merged);
  } catch {
    return updateDailyFlame(cloneDefaultState());
  }
}

export function saveState(state: UserState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState(): UserState {
  localStorage.removeItem(STORAGE_KEY);
  return updateDailyFlame(cloneDefaultState());
}
