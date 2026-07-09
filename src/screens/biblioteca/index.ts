import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { retablo } from '../../components/Retablo';
import { markLearned } from '../../core/state';
import { entriesForReino, normalizeAnswer, sampleEntries, vocabEntries, type VocabEntry } from '../../data/learning';
import { reinos } from '../../data/reinos';
import type { ReinoId } from '../../data/vocab.generated';
import { el } from '../../utils/dom';
import { icon } from '../../utils/icons';

export function bibliotecaScreen(ctx: AppContext, reinoId?: ReinoId): HTMLElement {
  const source = reinoId ? entriesForReino(reinoId) : vocabEntries;
  const root = el('section', { className: 'biblioteca-screen' });
  const search = el('input', {
    className: 'ink-search',
    attrs: { type: 'search', placeholder: 'szukaj słowa, znaczenia albo kategorii', 'aria-label': 'Szukaj w bibliotece' },
  }) as HTMLInputElement;
  const grid = el('div', { className: 'grid-auto biblioteca-grid' });
  const count = el('p', { className: 'small-caps biblioteca-count' });

  const filterRow = el('div', {
    className: 'filter-row',
    children: [
      el('button', {
        className: !reinoId ? 'text-button active-filter' : 'text-button',
        text: 'Wszystkie księgi',
        attrs: { type: 'button' },
        onClick: () => ctx.navigate({ name: 'biblioteca' }),
      }),
      ...reinos.map((reino) =>
        el('button', {
          className: reinoId === reino.id ? 'text-button active-filter' : 'text-button',
          text: reino.tituloPl,
          attrs: { type: 'button' },
          onClick: () => ctx.navigate({ name: 'biblioteca', reino: reino.id }),
        }),
      ),
    ],
  });

  function renderList(): void {
    const needle = normalizeAnswer(search.value);
    const filtered = source.filter((entry) => {
      if (!needle) return true;
      return [entry.es, entry.pl, entry.category, entry.kind].some((value) => normalizeAnswer(value).includes(needle));
    });
    const visible = search.value ? filtered.slice(0, 80) : sampleEntries(filtered, Math.min(40, filtered.length), ctx.state.chispas + filtered.length);
    count.textContent = `${filtered.length} papieritos w tej księdze`;
    grid.replaceChildren(
      ...visible.map((entry: VocabEntry) =>
        retablo(entry, () => {
          ctx.audio.chime('bright');
          ctx.mutate((state) => markLearned(state, entry.id, entry.kind, entry.reino), `Atrament pamięta: ${entry.es}`);
        }),
      ),
    );
  }

  search.addEventListener('input', renderList);
  renderList();

  root.append(
    el('section', {
      className: 'biblioteca-hero',
      children: [
        el('div', {
          children: [
            el('p', { className: 'small-caps', text: 'Biblioteca de los Cinco Reinos' }),
            el('h1', { text: 'Klasztor słów' }),
            el('p', {
              className: 'narrative',
              text: 'Każda księga powstała z tabel w dokumencie Word: rzeczowniki z rodzajnikami, czasowniki, przymiotniki, zwroty, liczby i kolumbijskie smaczki.',
            }),
          ],
        }),
        el('div', { className: 'search-wrap', children: [icon('search'), search] }),
      ],
    }),
    filterRow,
    count,
    grid,
  );

  return shell(ctx, [root], { className: 'biblioteca-page' });
}
