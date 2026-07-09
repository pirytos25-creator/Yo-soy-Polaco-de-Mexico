import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { entriesForReino, sourceStats } from '../../data/learning';
import { reinos } from '../../data/reinos';
import { retos } from '../../data/retos';
import { el } from '../../utils/dom';
import { icon } from '../../utils/icons';
import { mapBackdropSvg } from '../../utils/placeholderSvg';

export function mapaScreen(ctx: AppContext): HTMLElement {
  const mapWrap = el('section', { className: 'mapa-stage' });
  mapWrap.append(mapBackdropSvg());
  const pins = el('div', { className: 'map-pins' });
  for (const reino of reinos) {
    const count = entriesForReino(reino.id).length;
    const pin = el('button', {
      className: `map-pin pin-${reino.id}`,
      attrs: { type: 'button' },
      onClick: () => {
        ctx.audio.chime('soft');
        ctx.navigate({ name: 'reino', reino: reino.id });
      },
      children: [
        el('span', { className: 'map-pin-orb' }),
        el('strong', { text: reino.nombre }),
        el('small', { text: `${count} słów · ${reino.elemento}` }),
      ],
    });
    pin.style.setProperty('--pin-color', reino.color);
    pins.append(pin);
  }
  mapWrap.append(pins);

  const overview = el('section', {
    className: 'mapa-ledger grid-auto',
    children: [
      ledger('Słowa z Worda', `${sourceStats.entries}`, 'włączone do biblioteki'),
      ledger('Rzeczowniki', `${sourceStats.counts.noun}`, 'z rodzajnikiem'),
      ledger('Czasowniki', `${sourceStats.counts.verb}`, 'do prób Tejedory'),
      ledger('Kolumbia', `${sourceStats.counts.colombian}`, 'zwrotów dla Parcero Diego'),
    ],
  });

  const gates = el('section', {
    className: 'reino-gates grid-auto',
    children: reinos.map((reino) => {
      const node = el('article', {
        className: 'pergamino reino-gate',
        children: [
          sigil(reino.color),
          el('p', { className: 'small-caps', text: reino.tituloPl }),
          el('h2', { text: reino.nombre }),
          el('p', { className: 'narrative', text: reino.promesa }),
          el('button', {
            className: 'text-button',
            text: 'Otwórz bramę',
            attrs: { type: 'button' },
            onClick: () => ctx.navigate({ name: 'reino', reino: reino.id }),
          }),
        ],
      });
      node.style.setProperty('--gate-color', reino.color);
      return node;
    }),
  });

  const pruebaBand = el('section', {
    className: 'pergamino pruebas-band',
    children: [
      el('h2', { text: 'Pruebas na dziś' }),
      el('div', {
        className: 'prueba-row',
        children: retos.slice(0, 4).map((reto) =>
          el('button', {
            className: 'text-button',
            attrs: { type: 'button' },
            onClick: () => ctx.navigate({ name: 'game', game: reto.tipo === 'biblioteca' ? 'loteria' : reto.tipo, reino: reto.reino }),
            children: [icon('dice'), el('span', { text: reto.nombre })],
          }),
        ),
      }),
    ],
  });

  return shell(ctx, [mapWrap, overview, gates, pruebaBand], { title: 'Mapa Mundi', className: 'mapa-page' });
}

function ledger(value: string, number: string, label: string): HTMLElement {
  return el('article', {
    className: 'retablo ledger-tile',
    children: [el('p', { className: 'small-caps', text: value }), el('strong', { text: number }), el('span', { text: label })],
  });
}

function sigil(color: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 80 80');
  svg.classList.add('gate-sigil');
  svg.innerHTML = `<path d="M40 6 72 28 60 66H20L8 28Z" fill="${color}" stroke="#2B1D14" stroke-width="4"/><path d="M40 18v44M18 32h44" stroke="#F5E9D3" stroke-width="4" stroke-linecap="round"/>`;
  return svg;
}
