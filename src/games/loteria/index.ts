import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { saveState } from '../../core/persistence';
import { markGamePlayed, markLearned } from '../../core/state';
import { entriesForReino } from '../../data/learning';
import { reinoById } from '../../data/reinos';
import type { ReinoId } from '../../data/vocab.generated';
import { pickMany } from '../../core/prng';
import { el } from '../../utils/dom';

export function loteriaGame(ctx: AppContext, reinoId: ReinoId = 'pueblo'): HTMLElement {
  const reino = reinoById[reinoId];
  const entries = pickMany(entriesForReino(reinoId).filter((entry) => entry.kind === 'noun' || entry.kind === 'phrase'), 16, `loteria-${ctx.state.chispas}-${reinoId}`);
  let current = entries[0];
  let found = 0;
  const call = el('div', { className: 'pergamino loteria-call' });
  const board = el('div', { className: 'loteria-board' });

  function updateCall(): void {
    current = entries.find((entry) => !board.querySelector(`[data-id="${entry.id}"].found`)) ?? entries[0];
    call.replaceChildren(
      el('p', { className: 'small-caps', text: `Gritón z ${reino.tituloPl}` }),
      el('h2', { text: current.pl }),
      el('p', { className: 'narrative', text: 'Odnajdź hiszpański papelito na planszy.' }),
    );
  }

  for (const entry of entries) {
    const tile = el('button', {
      className: 'loteria-card retablo',
      attrs: { type: 'button', 'data-id': entry.id },
      children: [el('span', { className: 'spanish-word', text: entry.es }), el('small', { text: entry.category })],
      onClick: () => {
        if (tile.classList.contains('found')) return;
        if (entry.id === current.id) {
          tile.classList.add('found');
          found += 1;
          ctx.audio.chime('bright');
          markLearned(ctx.state, entry.id, entry.kind, entry.reino, 3);
          saveState(ctx.state);
          if (found >= 4) {
            ctx.mutate((state) => markGamePlayed(state, reinoId, 18), 'Lotería rozbłysła czterema papieritos');
          } else {
            updateCall();
          }
        } else {
          tile.classList.add('shiver');
          ctx.audio.chime('crack');
          window.setTimeout(() => tile.classList.remove('shiver'), 360);
        }
      },
    });
    board.append(tile);
  }

  updateCall();
  return shell(ctx, [gameHeader('Lotería del Alba', reino.nombre), call, board], { className: 'game-page loteria-page' });
}

function gameHeader(title: string, subtitle: string): HTMLElement {
  return el('section', {
    className: 'game-header',
    children: [el('p', { className: 'small-caps', text: subtitle }), el('h1', { text: title })],
  });
}
