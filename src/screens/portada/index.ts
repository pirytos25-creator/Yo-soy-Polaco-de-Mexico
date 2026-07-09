import { gsap } from 'gsap';
import type { AppContext } from '../../app';
import { framePicado } from '../../components/FramePicado';
import { el } from '../../utils/dom';
import { mapBackdropSvg } from '../../utils/placeholderSvg';

export function portadaScreen(ctx: AppContext): HTMLElement {
  const root = el('section', { className: 'page-shell portada-shell' });
  const map = mapBackdropSvg();
  const picado = framePicado(760, 210, '#F0BF4A');
  const intro = el('div', { className: 'portada-copy' });
  const lore = el('div', {
    className: 'pergamino portada-lore',
    children: [
      el('p', {
        className: 'narrative',
        text: 'Pięć królestw ukrywa słowa z zeszytu Maćka: rzeczowniki, czasowniki, kolumbijskie powiedzonka i sploty gramatyki. Doña Esperanza prowadzi przez nie tak, jak prowadzi się podróżnika przez obce miasto: spokojnie, po ludzku, z odrobiną magii.',
      }),
    ],
  });
  lore.hidden = true;

  intro.append(
    picado,
    el('p', { className: 'small-caps portada-kicker', text: 'Un viaje para aprender español' }),
    el('h1', { className: 'portada-title', text: 'Cinco Reinos' }),
    el('p', {
      className: 'narrative portada-subtitle',
      text: 'Podróż przez hiszpański dla Maćka, z kolumbijskim sercem i słownikiem wydobytym z Worda.',
    }),
    el('div', {
      className: 'portada-actions',
      children: [
        el('button', {
          className: 'seal-button',
          text: 'Comenzar el viaje',
          attrs: { type: 'button' },
          onClick: () => {
            ctx.audio.chime('bright');
            ctx.navigate({ name: 'mapa' });
          },
        }),
        el('button', {
          className: 'seal-button',
          text: 'Continuar la ruta',
          attrs: { type: 'button' },
          onClick: () => {
            ctx.audio.chime('soft');
            ctx.navigate({ name: 'mapa' });
          },
        }),
        el('button', {
          className: 'seal-button',
          text: 'Sobre este mundo',
          attrs: { type: 'button' },
          onClick: () => {
            lore.hidden = !lore.hidden;
            ctx.audio.chime('soft');
          },
        }),
      ],
    }),
    lore,
  );
  root.append(map, alebrije('left'), alebrije('right'), intro);

  requestAnimationFrame(() => {
    gsap.from(root.querySelectorAll('.portada-title, .portada-subtitle, .seal-button'), {
      y: 18,
      opacity: 0,
      stagger: 0.08,
      duration: 0.72,
      ease: 'power2.out',
    });
  });

  return root;
}

function alebrije(side: 'left' | 'right'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 160 120');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('alebrije', `alebrije-${side}`);
  svg.innerHTML = `
    <path d="M30 72c18-34 58-47 94-26 18 11 20 32 2 45-33 24-78 19-96-19Z" fill="${side === 'left' ? '#2A9D8F' : '#A55B7E'}" stroke="#2B1D14" stroke-width="4"/>
    <path d="M60 47 45 16l31 18M101 47l25-28-5 39" fill="#F0BF4A" stroke="#2B1D14" stroke-width="4"/>
    <circle cx="66" cy="66" r="5" fill="#FCE38A"/>
    <circle cx="101" cy="65" r="5" fill="#FCE38A"/>
    <path d="M72 86c10 7 23 7 33 0" fill="none" stroke="#2B1D14" stroke-width="4" stroke-linecap="round"/>
  `;
  return svg;
}
