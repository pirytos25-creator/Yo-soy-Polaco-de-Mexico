import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { markGamePlayed } from '../../core/state';
import { normalizeAnswer } from '../../data/learning';
import { el } from '../../utils/dom';

interface Puzzle {
  pl: string;
  answer: string;
  words: string[];
}

const puzzles: Puzzle[] = [
  { pl: 'Jestem Polakiem.', answer: 'Soy polaco', words: ['polaco', 'Soy', 'Estoy', 'cansado'] },
  { pl: 'Lubię kawę.', answer: 'Me gusta el café', words: ['gusta', 'el', 'café', 'Me', 'Yo'] },
  { pl: 'Nie rozumiem.', answer: 'No entiendo', words: ['No', 'entiendo', 'hablo', 'sí'] },
  { pl: 'Mam czas.', answer: 'Tengo tiempo', words: ['Tengo', 'tiempo', 'soy', 'ahora'] },
];

export function tejedoraGame(ctx: AppContext): HTMLElement {
  let index = 0;
  let solved = 0;
  let chosen: string[] = [];
  const loom = el('section', { className: 'tejedora-loom' });

  function render(): void {
    const puzzle = puzzles[index % puzzles.length];
    chosen = [];
    const answerLine = el('div', { className: 'woven-answer' });
    const wordBank = el('div', {
      className: 'choice-grid',
      children: puzzle.words.map((word) =>
        el('button', {
          className: 'text-button thread-choice',
          text: word,
          attrs: { type: 'button' },
          onClick: (event) => {
            const button = event.currentTarget as HTMLButtonElement;
            button.disabled = true;
            chosen.push(word);
            answerLine.textContent = chosen.join(' ');
          },
        }),
      ),
    });

    loom.replaceChildren(
      loomSvg(),
      el('div', {
        className: 'pergamino tejedora-panel',
        children: [
          el('p', { className: 'small-caps', text: `Splot ${index + 1}/4` }),
          el('h2', { text: puzzle.pl }),
          answerLine,
          wordBank,
          el('div', {
            className: 'prueba-row',
            children: [
              el('button', {
                className: 'seal-button',
                text: 'Tejer',
                attrs: { type: 'button' },
                onClick: () => {
                  if (normalizeAnswer(chosen.join(' ')) === normalizeAnswer(puzzle.answer)) {
                    solved += 1;
                    ctx.audio.chime('bright');
                    index += 1;
                    if (solved >= 3) ctx.mutate((state) => markGamePlayed(state, 'desierto', 22), 'Tejedora związała trzy poprawne sploty');
                    else render();
                  } else {
                    ctx.audio.chime('crack');
                    answerLine.textContent = 'Nić się splątała';
                  }
                },
              }),
              el('button', { className: 'text-button', text: 'Desatar', attrs: { type: 'button' }, onClick: render }),
            ],
          }),
        ],
      }),
    );
  }

  render();
  return shell(ctx, [el('section', { className: 'game-header', children: [el('p', { className: 'small-caps', text: 'El Desierto de los Huesos' }), el('h1', { text: 'Splot Tejedory' })] }), loom], { className: 'game-page tejedora-page' });
}

function loomSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 680 260');
  svg.classList.add('loom-scene');
  const threads = Array.from({ length: 12 }, (_, index) => `<path d="M80 ${42 + index * 14}h520" stroke="${index % 2 ? '#B8621B' : '#6B4C93'}" stroke-width="5"/>`).join('');
  svg.innerHTML = `<rect x="46" y="24" width="588" height="212" rx="8" fill="#F5DEB3" stroke="#2B1D14" stroke-width="6"/>${threads}<path d="M120 30v204M560 30v204" stroke="#52260B" stroke-width="14" stroke-linecap="round"/>`;
  return svg;
}
