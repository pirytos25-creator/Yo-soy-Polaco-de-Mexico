import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { saveState } from '../../core/persistence';
import { healthCheck, streamChat, type Msg } from '../../curandera/ollamaClient';
import { reinos } from '../../data/reinos';
import { el } from '../../utils/dom';

const personaNames: Record<string, string> = {
  esperanza: 'Doña Esperanza',
  jaguar: 'El Guardián del Jaguar',
  tejedora: 'La Tejedora del Tiempo',
  cantor: 'Los Cantores',
  diego: 'Parcero Diego',
};

export function curanderaScreen(ctx: AppContext, initialPersona = 'esperanza'): HTMLElement {
  const persona = Object.hasOwn(personaNames, initialPersona) ? initialPersona : 'esperanza';
  const status = el('p', { className: 'curandera-status small-caps', text: 'Las estrellas se alinean...' });
  const messages = el('div', { className: 'dialogue-scroll', attrs: { 'aria-live': 'polite' } });
  const input = el('textarea', {
    className: 'oracle-input',
    attrs: {
      rows: '3',
      placeholder: 'Mijo, zapytaj o słowo, zdanie albo kolumbijski niuans...',
      'aria-label': 'Pergamin pytania',
    },
  }) as HTMLTextAreaElement;
  const personaSelect = el('select', { className: 'persona-select', attrs: { 'aria-label': 'Przewodnik' } }) as HTMLSelectElement;

  for (const [id, name] of Object.entries(personaNames)) {
    const option = el('option', { text: name, attrs: { value: id } }) as HTMLOptionElement;
    option.selected = id === persona;
    personaSelect.append(option);
  }

  const history = ctx.state.historiaChatow.find((thread) => thread.persona === personaSelect.value)?.messages ?? [];
  for (const msg of history.slice(-10)) appendBubble(messages, msg.role, msg.content);

  healthCheck()
    .then((health) => {
      status.textContent = health.ok
        ? `Curandera czuwa przy modelu ${health.preferredModel}`
        : 'Curandera zasnęła w słońcu';
      if (!health.ok) messages.prepend(asleepPanel());
    })
    .catch(() => {
      status.textContent = 'Curandera zasnęła w słońcu';
      messages.prepend(asleepPanel());
    });

  const form = el('form', {
    className: 'oracle-form',
    children: [
      el('div', { className: 'persona-line', children: [personaSelect, status] }),
      input,
      el('button', { className: 'seal-button', text: '¡Dilo!', attrs: { type: 'submit' } }),
    ],
  }) as HTMLFormElement;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content) return;
    ctx.audio.chime('soft');
    input.value = '';
    const personaId = personaSelect.value;
    const thread = getThread(ctx, personaId);
    const userMessage: Msg = { role: 'user', content };
    thread.messages.push({ ...userMessage, timestamp: Date.now() });
    appendBubble(messages, 'user', content);
    const answerNode = appendBubble(messages, 'assistant', '');
    status.textContent = 'Las estrellas se alinean...';

    let answer = '';
    try {
      const chatMessages: Msg[] = thread.messages.map((msg) => ({ role: msg.role, content: msg.content }));
      for await (const chunk of streamChat(personaId, chatMessages, ctx.state)) {
        answer += chunk;
        answerNode.textContent = answer;
        messages.scrollTop = messages.scrollHeight;
      }
      thread.messages.push({ role: 'assistant', content: answer, timestamp: Date.now() });
      saveState(ctx.state);
      status.textContent = `${personaNames[personaId]} słucha dalej`;
    } catch {
      answerNode.textContent = 'Ay, mijo... Curandera śpi. Uruchom Ollamę w tle albo wróć, gdy dym z copalu znów pójdzie prosto w niebo.';
      status.textContent = 'Curandera zasnęła w słońcu';
    }
  });

  personaSelect.addEventListener('change', () => ctx.navigate({ name: 'curandera', persona: personaSelect.value }));

  const chamber = el('section', {
    className: 'curandera-chamber',
    children: [
      portrait(),
      el('div', {
        className: 'pergamino oracle-panel',
        children: [
          el('h1', { text: personaNames[persona] }),
          el('p', {
            className: 'narrative',
            text: 'Pergaminy nie są czatem robota; to rozmowa przy stole Doñi Esperanzy. Pytaj o słowa z biblioteki, zdania dla koleżanki z Kolumbii albo różnicę między ser i estar.',
          }),
          messages,
          form,
        ],
      }),
    ],
  });

  return shell(ctx, [chamber], { className: 'curandera-page' });
}

function getThread(ctx: AppContext, persona: string) {
  let thread = ctx.state.historiaChatow.find((item) => item.persona === persona);
  if (!thread) {
    thread = { persona, messages: [] };
    ctx.state.historiaChatow.push(thread);
  }
  return thread;
}

function appendBubble(parent: HTMLElement, role: 'user' | 'assistant', content: string): HTMLElement {
  const node = el('article', { className: `dialogue-parchment ${role}`, text: content });
  parent.append(node);
  parent.scrollTop = parent.scrollHeight;
  return node;
}

function asleepPanel(): HTMLElement {
  return el('aside', {
    className: 'asleep-panel',
    children: [
      el('strong', { text: 'Curandera zasnęła w swoim krześle na słońcu.' }),
      el('p', {
        text: 'Żeby ją obudzić: zainstaluj Ollamę, wykonaj ollama pull llama3.1:8b-instruct, potem ollama serve i odśwież ścieżkę.',
      }),
    ],
  });
}

function portrait(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 360 480');
  svg.classList.add('esperanza-portrait');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Doña Esperanza przy stole z ziołami');
  svg.innerHTML = `
    <rect x="24" y="24" width="312" height="432" rx="8" fill="#E8D5B0" stroke="#2B1D14" stroke-width="5"/>
    <circle cx="180" cy="146" r="72" fill="#9A5C43" stroke="#2B1D14" stroke-width="5"/>
    <path d="M104 142c20-78 132-78 152 0-40-30-112-30-152 0Z" fill="#DCD0C0" stroke="#2B1D14" stroke-width="4"/>
    <circle cx="154" cy="148" r="8" fill="#2B1D14"/>
    <circle cx="207" cy="148" r="8" fill="#2B1D14"/>
    <path d="M154 186c18 16 36 16 54 0" fill="none" stroke="#2B1D14" stroke-width="5" stroke-linecap="round"/>
    <path d="M82 420c28-118 168-152 196 0Z" fill="#D2691E" stroke="#2B1D14" stroke-width="5"/>
    <path d="M118 270c48 30 78 30 124 0" fill="none" stroke="#FCE38A" stroke-width="10" stroke-linecap="round"/>
    <path d="M74 390c36-20 58-52 66-95M286 390c-36-20-58-52-66-95" fill="none" stroke="#0F7A5A" stroke-width="9" stroke-linecap="round"/>
  `;
  return svg;
}
