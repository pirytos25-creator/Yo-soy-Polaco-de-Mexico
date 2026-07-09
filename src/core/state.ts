import { talismanes } from '../data/talismanes';
import type { EntryKind, ReinoId } from '../data/vocab.generated';

export interface UserState {
  imie: string;
  ranga: 'peregrino1' | 'peregrino2' | 'peregrino3' | 'aventurero' | 'maestro';
  chispas: number;
  streak: {
    dni: number;
    ostatniDzien: string;
  };
  reputacja: Record<ReinoId, number>;
  talismany: string[];
  learnedEntries: string[];
  learnedKinds: Partial<Record<EntryKind, number>>;
  gamesPlayed: number;
  historiaChatow: Array<{
    persona: string;
    messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: number }>;
  }>;
  ustawienia: {
    dialektWymowy: 'co' | 'mx' | 'es';
    audioAmbient: boolean;
    audioSfx: boolean;
    predkoscMaszynopisu: number;
    ollamaUrl: string;
    ollamaModel: string;
  };
}

export const defaultState: UserState = {
  imie: 'Maciek',
  ranga: 'peregrino1',
  chispas: 0,
  streak: {
    dni: 0,
    ostatniDzien: '',
  },
  reputacja: {
    pueblo: 0,
    selva: 0,
    desierto: 0,
    montanas: 0,
    ciudad: 0,
  },
  talismany: [],
  learnedEntries: [],
  learnedKinds: {},
  gamesPlayed: 0,
  historiaChatow: [],
  ustawienia: {
    dialektWymowy: 'co',
    audioAmbient: false,
    audioSfx: true,
    predkoscMaszynopisu: 12,
    ollamaUrl: 'http://127.0.0.1:11434',
    ollamaModel: 'llama3.1:8b-instruct',
  },
};

export function cloneDefaultState(): UserState {
  return structuredClone(defaultState);
}

export function updateDailyFlame(state: UserState, today = new Date()): UserState {
  const iso = today.toISOString().slice(0, 10);
  if (state.streak.ostatniDzien === iso) return state;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayIso = yesterday.toISOString().slice(0, 10);
  state.streak.dni = state.streak.ostatniDzien === yesterdayIso ? state.streak.dni + 1 : 1;
  state.streak.ostatniDzien = iso;
  return state;
}

export function gainChispas(state: UserState, amount: number, reino?: ReinoId): UserState {
  state.chispas += amount;
  if (reino) state.reputacja[reino] = Math.min(100, state.reputacja[reino] + Math.ceil(amount / 2));
  state.ranga = state.chispas >= 700 ? 'maestro' : state.chispas >= 420 ? 'aventurero' : state.chispas >= 240 ? 'peregrino3' : state.chispas >= 90 ? 'peregrino2' : 'peregrino1';
  return checkTalismans(state);
}

export function markLearned(state: UserState, entryId: string, kind: EntryKind, reino: ReinoId, reward = 2): UserState {
  if (!state.learnedEntries.includes(entryId)) {
    state.learnedEntries.push(entryId);
    state.learnedKinds[kind] = (state.learnedKinds[kind] ?? 0) + 1;
    gainChispas(state, reward, reino);
  }
  return checkTalismans(state);
}

export function markGamePlayed(state: UserState, reino: ReinoId, reward: number): UserState {
  state.gamesPlayed += 1;
  return gainChispas(state, reward, reino);
}

export function checkTalismans(state: UserState): UserState {
  for (const talisman of talismanes) {
    if (state.talismany.includes(talisman.id)) continue;
    const condition = talisman.condition;
    let earned = false;
    if (condition.type === 'reputation' && condition.reino) {
      earned = state.reputacja[condition.reino] >= condition.amount;
    } else if (condition.type === 'reputation') {
      earned = Object.values(state.reputacja).every((value) => value >= condition.amount);
    } else if (condition.type === 'kind' && condition.kind) {
      earned = (state.learnedKinds[condition.kind] ?? 0) >= condition.amount;
    } else if (condition.type === 'games') {
      earned = state.gamesPlayed >= condition.amount;
    } else if (condition.type === 'streak') {
      earned = state.streak.dni >= condition.amount;
    } else if (condition.type === 'chispas') {
      earned = state.chispas >= condition.amount;
    }

    if (earned) state.talismany.push(talisman.id);
  }
  return state;
}
