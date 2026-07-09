import type { AppContext } from '../app';
import { hud } from './Hud';
import { el } from '../utils/dom';
import { icon, iconButton } from '../utils/icons';

export function shell(ctx: AppContext, children: Node[], options: { title?: string; className?: string } = {}): HTMLElement {
  const root = el('div', { className: `page-shell ${options.className ?? ''}`.trim() });
  root.append(nav(ctx), hud(ctx.state));
  const inner = el('div', { className: 'inner' });
  if (options.title) {
    inner.append(el('h1', { className: 'screen-title', text: options.title }));
  }
  inner.append(...children);
  root.append(inner);
  return root;
}

function nav(ctx: AppContext): HTMLElement {
  const node = el('nav', { className: 'diegetic-nav', attrs: { 'aria-label': 'Mapa podróży' } });
  const left = el('div', { className: 'nav-cluster' });
  const brand = el('button', {
    className: 'brand-mark',
    attrs: { type: 'button', title: 'Cinco Reinos' },
    onClick: () => ctx.navigate({ name: 'mapa' }),
    children: [icon('spark'), el('span', { text: 'Cinco Reinos' })],
  });
  left.append(
    brand,
    iconButton('map', 'Mapa mundi', () => ctx.navigate({ name: 'mapa' })),
    iconButton('book', 'Biblioteca', () => ctx.navigate({ name: 'biblioteca' })),
    iconButton('chat', 'Casa de Esperanza', () => ctx.navigate({ name: 'curandera' })),
    iconButton('trophy', 'Sala talismanów', () => ctx.navigate({ name: 'talismanes' })),
  );

  const right = el('div', { className: 'nav-cluster' });
  right.append(
    iconButton(ctx.state.ustawienia.audioSfx ? 'sound' : 'mute', 'Dzwoneczki', () => {
      ctx.mutate((state) => {
        state.ustawienia.audioSfx = !state.ustawienia.audioSfx;
      });
    }),
    iconButton('gear', 'El pacto', () => ctx.navigate({ name: 'pacto' })),
  );
  node.append(left, right);
  return node;
}
