import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { retablo } from '../../components/Retablo';
import { categoriesForReino, entriesForReino, sampleEntries } from '../../data/learning';
import { reinoById } from '../../data/reinos';
import { retos } from '../../data/retos';
import type { ReinoId } from '../../data/vocab.generated';
import { markLearned } from '../../core/state';
import { el } from '../../utils/dom';
import { icon } from '../../utils/icons';

export function reinoScreen(ctx: AppContext, reinoId: ReinoId): HTMLElement {
  const reino = reinoById[reinoId];
  const entries = entriesForReino(reinoId);
  const samples = sampleEntries(entries, 8, ctx.state.chispas + entries.length);
  const categories = categoriesForReino(reinoId);
  const realmRetos = retos.filter((reto) => reto.reino === reinoId || reto.tipo !== 'biblioteca').slice(0, 4);

  const hero = el('section', {
    className: 'reino-hero',
    children: [
      el('div', {
        className: 'reino-hero-copy',
        children: [
          el('p', { className: 'small-caps', text: `${reino.tituloPl} · ${reino.elemento}` }),
          el('h1', { text: reino.nombre }),
          el('p', { className: 'narrative', text: reino.entrada }),
          el('p', { className: 'narrative', text: reino.foco }),
          el('div', {
            className: 'prueba-row',
            children: [
              el('button', {
                className: 'seal-button',
                text: 'Abrir biblioteca',
                attrs: { type: 'button' },
                onClick: () => ctx.navigate({ name: 'biblioteca', reino: reinoId }),
              }),
              el('button', {
                className: 'seal-button',
                text: 'Invocar guía',
                attrs: { type: 'button' },
                onClick: () => ctx.navigate({ name: 'curandera', persona: reino.persona }),
              }),
            ],
          }),
        ],
      }),
      mural(reino.color, reino.secondary, reino.accent),
    ],
  });
  hero.style.setProperty('--reino-color', reino.color);
  hero.style.setProperty('--reino-shadow', reino.shadow);

  const categoryBand = el('section', {
    className: 'category-band',
    children: categories.slice(0, 10).map((category) => el('span', { className: 'category-chip', text: category })),
  });

  const sampleGrid = el('section', {
    className: 'grid-auto sample-retablos',
    children: samples.map((entry) =>
      retablo(entry, () => {
        ctx.audio.chime('bright');
        ctx.mutate((state) => markLearned(state, entry.id, entry.kind, entry.reino), `Papelito zapamiętane: ${entry.es}`);
      }),
    ),
  });

  const pruebas = el('section', {
    className: 'pergamino',
    children: [
      el('h2', { text: 'Pruebas przy bramie' }),
      el('div', {
        className: 'prueba-list',
        children: realmRetos.map((reto) =>
          el('button', {
            className: 'reto-button',
            attrs: { type: 'button' },
            onClick: () => {
              const game = reto.tipo === 'biblioteca' ? 'loteria' : reto.tipo;
              ctx.navigate({ name: 'game', game, reino: reinoId });
            },
            children: [icon('dice'), el('span', { className: 'reto-copy', children: [el('strong', { text: reto.nombre }), el('small', { text: reto.descripcion })] })],
          }),
        ),
      }),
    ],
  });

  return shell(ctx, [hero, categoryBand, sampleGrid, pruebas], { className: `reino-page reino-${reinoId}` });
}

function mural(color: string, secondary: string, accent: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 520 420');
  svg.classList.add('reino-mural');
  svg.innerHTML = `
    <rect x="20" y="20" width="480" height="380" rx="8" fill="${accent}" stroke="#2B1D14" stroke-width="4"/>
    <path d="M50 290c90-180 220-220 410-72v120H50Z" fill="${secondary}" opacity=".78"/>
    <path d="M74 260c62-94 132-122 210-84 72 35 94 7 152-38" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>
    <path d="M122 102h276l-34 84H156Z" fill="${color}" opacity=".86" stroke="#2B1D14" stroke-width="4"/>
    <circle cx="260" cy="227" r="48" fill="#F0BF4A" stroke="#2B1D14" stroke-width="4"/>
    <path d="M202 320h116M218 344h84" stroke="#2B1D14" stroke-width="8" stroke-linecap="round"/>
  `;
  return svg;
}
