import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { reinoById } from '../../data/reinos';
import { talismanes } from '../../data/talismanes';
import { el } from '../../utils/dom';
import { icon } from '../../utils/icons';

export function talismanesScreen(ctx: AppContext): HTMLElement {
  const grid = el('section', {
    className: 'talisman-grid',
    children: talismanes.map((talisman) => {
      const unlocked = ctx.state.talismany.includes(talisman.id);
      const reino = reinoById[talisman.reino];
      const tile = el('article', {
        className: `talisman-tile ${unlocked ? 'unlocked' : 'sleeping'}`,
        children: [
          talismanSvg(reino.color, unlocked),
          el('p', { className: 'small-caps', text: reino.tituloPl }),
          el('h2', { text: talisman.nombre }),
          el('p', { className: 'narrative', text: unlocked ? talisman.descripcion : 'Jeszcze śpi pod warstwą złotego pyłu.' }),
        ],
      });
      tile.style.setProperty('--talisman-color', reino.color);
      return tile;
    }),
  });

  const summary = el('section', {
    className: 'pergamino talisman-summary',
    children: [
      icon('trophy'),
      el('div', {
        children: [
          el('h1', { text: 'Sala talismanów' }),
          el('p', { className: 'narrative', text: `${ctx.state.talismany.length} z ${talismanes.length} talismanów już odpowiada blaskiem.` }),
        ],
      }),
    ],
  });
  return shell(ctx, [summary, grid], { className: 'talismanes-page' });
}

function talismanSvg(color: string, unlocked: boolean): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.classList.add('talisman-sigil');
  svg.innerHTML = `
    <circle cx="60" cy="60" r="48" fill="${unlocked ? color : '#8F806B'}" stroke="#2B1D14" stroke-width="5"/>
    <path d="M60 18 72 48l32 2-25 20 8 32-27-17-27 17 8-32-25-20 32-2Z" fill="${unlocked ? '#F0BF4A' : '#C9AF83'}" stroke="#2B1D14" stroke-width="4"/>
  `;
  return svg;
}
