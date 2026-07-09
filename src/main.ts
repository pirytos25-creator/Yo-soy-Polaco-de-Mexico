import './styles/tokens.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/decor.css';
import './styles/screens.css';
import './styles/global.css';

import { createContext, type AppContext } from './app';
import { clear } from './utils/dom';
import { loadState, saveState } from './core/persistence';
import { parseRoute, type Route } from './core/router';
import { portadaScreen } from './screens/portada';
import { mapaScreen } from './screens/mapa';
import { reinoScreen } from './screens/reino';
import { bibliotecaScreen } from './screens/biblioteca';
import { curanderaScreen } from './screens/curandera';
import { talismanesScreen } from './screens/talismanes';
import { pactoScreen } from './screens/pacto';
import { loteriaGame } from './games/loteria';
import { mercadoGame } from './games/mercado';
import { tejedoraGame } from './games/tejedora';
import { carnavalGame } from './games/carnaval';
import type { UserState } from './core/state';

const mount = document.querySelector<HTMLElement>('#app');

if (!mount) {
  throw new Error('El camino se perdió');
}

const stateRef: { current: UserState } = { current: loadState() };
let ctx: AppContext;

function render(): void {
  saveState(stateRef.current);
  const route = parseRoute(window.location.hash);
  clear(mount);
  mount.append(renderRoute(route, ctx));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderRoute(route: Route, context: AppContext): HTMLElement {
  if (route.name === 'portada') return portadaScreen(context);
  if (route.name === 'mapa') return mapaScreen(context);
  if (route.name === 'reino') return reinoScreen(context, route.reino);
  if (route.name === 'biblioteca') return bibliotecaScreen(context, route.reino);
  if (route.name === 'curandera') return curanderaScreen(context, route.persona);
  if (route.name === 'talismanes') return talismanesScreen(context);
  if (route.name === 'pacto') return pactoScreen(context);
  if (route.name === 'game') {
    if (route.game === 'loteria') return loteriaGame(context, route.reino);
    if (route.game === 'mercado') return mercadoGame(context);
    if (route.game === 'tejedora') return tejedoraGame(context);
    return carnavalGame(context);
  }
  return mapaScreen(context);
}

ctx = createContext(stateRef, render);
window.addEventListener('hashchange', render);
render();
