import type { UserState } from '../core/state';
import { reinos } from '../data/reinos';
import { icon } from '../utils/icons';
import { el } from '../utils/dom';

export function hud(state: UserState): HTMLElement {
  const node = el('section', { className: 'hud-strip', attrs: { 'aria-label': 'Khipu podróżnika' } });
  const flame = state.streak.dni > 0 ? 'żywy' : 'uśpiony';
  node.append(
    stat('Rango', state.ranga.replace('peregrino', 'peregrino ')),
    stat('Chispas', String(state.chispas)),
    stat('Llama sagrada', `${state.streak.dni} dni · ${flame}`),
    stat('Talismanes', `${state.talismany.length}`),
  );
  const reputation = el('div', { className: 'reputation-row' });
  for (const reino of reinos) {
    const item = el('span', { className: 'reputation-knot', attrs: { title: `${reino.nombre}: ${state.reputacja[reino.id]}` } });
    item.style.setProperty('--knot-color', reino.color);
    item.style.setProperty('--knot-fill', `${state.reputacja[reino.id]}%`);
    reputation.append(item);
  }
  node.append(reputation);
  return node;
}

function stat(label: string, value: string): HTMLElement {
  const node = el('div', { className: 'hud-stat' });
  const iconWrap = el('span', { className: 'hud-icon' });
  iconWrap.append(icon(label === 'Chispas' ? 'spark' : label === 'Llama sagrada' ? 'flame' : label === 'Talismanes' ? 'trophy' : 'map'));
  node.append(iconWrap, el('span', { className: 'small-caps', text: label }), el('strong', { text: value }));
  return node;
}
