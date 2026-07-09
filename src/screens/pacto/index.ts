import type { AppContext } from '../../app';
import { shell } from '../../components/Layout';
import { clearState } from '../../core/persistence';
import { el, fieldLabel } from '../../utils/dom';

export function pactoScreen(ctx: AppContext): HTMLElement {
  const nameInput = el('input', { attrs: { value: ctx.state.imie, type: 'text' }, className: 'pacto-input' }) as HTMLInputElement;
  const speedInput = el('input', {
    attrs: { value: String(ctx.state.ustawienia.predkoscMaszynopisu), type: 'number', min: '4', max: '40' },
    className: 'pacto-input',
  }) as HTMLInputElement;
  const dialect = el('select', { className: 'pacto-input' }) as HTMLSelectElement;
  for (const [value, label] of [
    ['co', 'Kolumbia'],
    ['mx', 'Meksyk'],
    ['es', 'Hiszpania'],
  ]) {
    const option = el('option', { text: label, attrs: { value } }) as HTMLOptionElement;
    option.selected = ctx.state.ustawienia.dialektWymowy === value;
    dialect.append(option);
  }

  const form = el('form', {
    className: 'pergamino pacto-form',
    children: [
      el('h1', { text: 'El pacto z curanderą' }),
      el('p', { className: 'narrative', text: 'Pakt przechowuje tylko lokalny stan w tej przeglądarce. Żadnych kont, żadnej telemetrii, żadnej obcej księgi.' }),
      fieldLabel('Imię podróżnika', nameInput),
      fieldLabel('Dialekt wymowy', dialect),
      fieldLabel('Tempo maszynopisu', speedInput),
      el('label', {
        className: 'check-line',
        children: [
          checkbox(ctx.state.ustawienia.audioSfx),
          el('span', { text: 'Dzwoneczki i trzaski rytuału' }),
        ],
      }),
      el('button', { className: 'seal-button', text: 'Sellar pacto', attrs: { type: 'submit' } }),
      el('button', {
        className: 'text-button danger-action',
        text: 'Renacer',
        attrs: { type: 'button' },
        onClick: () => {
          ctx.mutate((state) => Object.assign(state, clearState()), 'Podróżnik narodził się od nowa');
          ctx.navigate({ name: 'portada' });
        },
      }),
    ],
  }) as HTMLFormElement;

  const check = form.querySelector<HTMLInputElement>('input[type="checkbox"]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ctx.audio.chime('bright');
    ctx.mutate((state) => {
      state.imie = nameInput.value.trim() || 'Maciek';
      state.ustawienia.dialektWymowy = dialect.value as 'co' | 'mx' | 'es';
      state.ustawienia.predkoscMaszynopisu = Number(speedInput.value);
      state.ustawienia.audioSfx = Boolean(check?.checked);
    }, 'Pakt zapieczętowany');
  });

  return shell(ctx, [form], { className: 'pacto-page' });
}

function checkbox(checked: boolean): HTMLInputElement {
  const input = el('input', { attrs: { type: 'checkbox' } }) as HTMLInputElement;
  input.checked = checked;
  return input;
}
