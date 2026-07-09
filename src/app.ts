import { AudioManager } from './core/audio';
import type { Route } from './core/router';
import { routeToHash } from './core/router';
import { saveState } from './core/persistence';
import type { UserState } from './core/state';

export interface AppContext {
  state: UserState;
  navigate: (route: Route) => void;
  mutate: (updater: (state: UserState) => void, toast?: string) => void;
  audio: AudioManager;
  toast: (message: string) => void;
}

export function createContext(stateRef: { current: UserState }, rerender: () => void): AppContext {
  const audio = new AudioManager(() => stateRef.current.ustawienia.audioSfx);
  return {
    get state() {
      return stateRef.current;
    },
    navigate(route) {
      window.location.hash = routeToHash(route);
    },
    mutate(updater, toast) {
      const previousTalismans = new Set(stateRef.current.talismany);
      updater(stateRef.current);
      saveState(stateRef.current);
      rerender();
      if (toast) showToast(toast);
      const newTalismans = stateRef.current.talismany.filter((id) => !previousTalismans.has(id));
      for (const talisman of newTalismans) showToast(`Talizman obudzony: ${talisman}`);
    },
    audio,
    toast: showToast,
  };
}

function showToast(message: string): void {
  let stack = document.querySelector<HTMLElement>('.toast-stack');
  if (!stack) {
    stack = document.createElement('div');
    stack.className = 'toast-stack';
    document.body.append(stack);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  stack.append(toast);
  window.setTimeout(() => toast.remove(), 2600);
}
