import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { saveState } from '../../core/persistence';
import { pickMany } from '../../core/prng';
import { markGamePlayed, markLearned } from '../../core/state';
import { entriesForKind, type VocabEntry } from '../../data/learning';
import { el } from '../../utils/dom';

export function carnavalGame(ctx: AppContext): HTMLElement {
  const pairs = pickMany(entriesForKind('colombian'), 8, `carnaval-${ctx.state.chispas}`);
  let selected: VocabEntry | null = null;
  let matched = 0;
  const board = el('section', { className: 'carnaval-board' });
  const left = el('div', { className: 'mask-column' });
  const right = el('div', { className: 'mask-column' });

  const meanings = pickMany(pairs, pairs.length, 'meanings');
  for (const entry of pairs) {
    left.append(maskButton(entry.es, () => {
      selected = entry;
      ctx.audio.chime('soft');
    }));
  }
  for (const entry of meanings) {
    right.append(maskButton(entry.pl, (button) => {
      if (!selected) return;
      if (selected.id === entry.id) {
        button.classList.add('found');
        const match = [...left.querySelectorAll<HTMLButtonElement>('button')].find((item) => item.textContent === entry.es);
        match?.classList.add('found');
        markLearned(ctx.state, entry.id, entry.kind, entry.reino, 5);
        saveState(ctx.state);
        selected = null;
        matched += 1;
        ctx.audio.chime('bright');
        if (matched >= 5) ctx.mutate((state) => markGamePlayed(state, 'ciudad', 24), 'Carnaval rozpoznał pięć masek');
      } else {
        ctx.audio.chime('crack');
      }
    }));
  }
  board.append(left, right);
  return shell(ctx, [el('section', { className: 'game-header', children: [el('p', { className: 'small-caps', text: 'La Ciudad de Espejos' }), el('h1', { text: 'Máscaras del Parcero' })] }), carnivalSvg(), board], { className: 'game-page carnaval-page' });
}

function maskButton(text: string, handler: (button: HTMLButtonElement) => void): HTMLButtonElement {
  const node = el('button', { className: 'mask-card', text, attrs: { type: 'button' }, onClick: () => handler(node) }) as HTMLButtonElement;
  return node;
}

function carnivalSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 780 220');
  svg.classList.add('carnival-scene');
  svg.innerHTML = `
    <rect x="26" y="38" width="728" height="156" rx="8" fill="#E0FBFC" stroke="#2B1D14" stroke-width="5"/>
    <path d="M66 80c80 60 160 60 240 0s160-60 240 0 120 60 168 0" fill="none" stroke="#17A2B8" stroke-width="18"/>
    <path d="M88 150c120-86 250-86 390 0 56 34 116 34 180 0" fill="none" stroke="#FFC857" stroke-width="18"/>
    <circle cx="188" cy="106" r="34" fill="#A55B7E" stroke="#2B1D14" stroke-width="5"/>
    <circle cx="388" cy="106" r="34" fill="#D2691E" stroke="#2B1D14" stroke-width="5"/>
    <circle cx="588" cy="106" r="34" fill="#0F7A5A" stroke="#2B1D14" stroke-width="5"/>
  `;
  return svg;
}
