import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { saveState } from '../../core/persistence';
import { pickMany } from '../../core/prng';
import { markGamePlayed, markLearned } from '../../core/state';
import { entriesForReino, vocabEntries, type VocabEntry } from '../../data/learning';
import { el } from '../../utils/dom';

export function mercadoGame(ctx: AppContext): HTMLElement {
  const food = entriesForReino('pueblo').filter((entry) => entry.category.includes('Jedzenie'));
  const phrases = vocabEntries.filter((entry) => entry.category.includes('restauracji') || entry.category.includes('Uprzejmość'));
  const deck = pickMany([...food, ...phrases], 8, `mercado-${ctx.state.chispas}`);
  let round = 0;
  let score = 0;
  const stall = el('section', { className: 'mercado-stall' });

  function renderRound(): void {
    const target = deck[round % deck.length];
    const options = pickMany([target, ...deck.filter((entry) => entry.id !== target.id)], 4, `${target.id}-${round}`);
    stall.replaceChildren(
      marketSvg(),
      el('div', {
        className: 'pergamino mercado-panel',
        children: [
          el('p', { className: 'small-caps', text: `Monety: ${score} · runda ${round + 1}/5` }),
          el('h2', { text: target.pl }),
          el('p', { className: 'narrative', text: 'Kupiec czeka na właściwe słowo lub zwrot.' }),
          el('div', {
            className: 'choice-grid',
            children: options.map((entry) => choice(entry, target)),
          }),
        ],
      }),
    );
  }

  function choice(entry: VocabEntry, target: VocabEntry): HTMLElement {
    return el('button', {
      className: 'text-button market-choice',
      text: entry.es,
      attrs: { type: 'button' },
      onClick: () => {
        if (entry.id === target.id) {
          score += 1;
          ctx.audio.chime('bright');
          markLearned(ctx.state, entry.id, entry.kind, entry.reino, 4);
          saveState(ctx.state);
          round += 1;
          if (round >= 5) ctx.mutate((state) => markGamePlayed(state, 'pueblo', 20), 'Mercado zapłaciło chispas');
          else renderRound();
        } else {
          ctx.audio.chime('crack');
        }
      },
    });
  }

  renderRound();
  return shell(ctx, [el('section', { className: 'game-header', children: [el('p', { className: 'small-caps', text: 'El Pueblo del Alba' }), el('h1', { text: 'Mercado de Cobre' })] }), stall], { className: 'game-page mercado-page' });
}

function marketSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 720 280');
  svg.classList.add('market-scene');
  svg.innerHTML = `
    <rect x="24" y="78" width="672" height="178" rx="8" fill="#F5E9D3" stroke="#2B1D14" stroke-width="5"/>
    <path d="M36 82h648l-54-56H90Z" fill="#D2691E" stroke="#2B1D14" stroke-width="5"/>
    <path d="M90 26v56M198 26v56M306 26v56M414 26v56M522 26v56M630 26v56" stroke="#FCE38A" stroke-width="10"/>
    <circle cx="188" cy="184" r="38" fill="#F4A261" stroke="#2B1D14" stroke-width="4"/>
    <circle cx="268" cy="188" r="42" fill="#52B788" stroke="#2B1D14" stroke-width="4"/>
    <circle cx="350" cy="178" r="32" fill="#FFC857" stroke="#2B1D14" stroke-width="4"/>
    <path d="M470 220c12-70 96-70 108 0Z" fill="#A55B7E" stroke="#2B1D14" stroke-width="5"/>
  `;
  return svg;
}
