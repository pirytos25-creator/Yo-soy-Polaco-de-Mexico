import { reinoById } from '../data/reinos';
import type { VocabEntry } from '../data/learning';
import { el } from '../utils/dom';
import { placeholderIllustration } from '../utils/placeholderSvg';

export function retablo(entry: VocabEntry, onLearn?: (entry: VocabEntry) => void): HTMLElement {
  const reino = reinoById[entry.reino];
  const node = el('article', { className: 'retablo word-safe' });
  node.style.setProperty('--accent', reino.color);

  const art = el('div', { className: 'retablo-art' });
  art.append(placeholderIllustration(entry.es, reino, entry.imageKey.length));

  const copy = el('div', {
    className: 'retablo-copy',
    children: [
      el('p', { className: 'spanish-word', text: entry.es }),
      el('p', { className: 'retablo-meaning', text: entry.pl }),
      el('p', { className: 'retablo-meta small-caps', text: `${entry.category} · ${reino.tituloPl}` }),
    ],
  });

  node.append(art, copy);
  if (onLearn) {
    node.addEventListener('click', () => onLearn(entry));
    node.tabIndex = 0;
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') onLearn(entry);
    });
  }
  return node;
}
