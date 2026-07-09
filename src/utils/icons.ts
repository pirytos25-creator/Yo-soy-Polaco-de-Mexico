import { el } from './dom';

type IconName = 'map' | 'book' | 'flame' | 'spark' | 'chat' | 'gear' | 'mask' | 'back' | 'sound' | 'mute' | 'dice' | 'trophy' | 'search';

const paths: Record<IconName, string> = {
  map: 'M3 5.5 9 3l6 2.5 6-2.5v15.5l-6 2.5-6-2.5-6 2.5V5.5Zm6-2.5v15.5m6-13v15.5',
  book: 'M5 4.5c2.8-.7 5-.2 7 1.5 2-1.7 4.2-2.2 7-1.5v14.2c-2.8-.7-5-.2-7 1.5-2-1.7-4.2-2.2-7-1.5V4.5Zm7 1.5v14.2',
  flame: 'M12 21c4 0 7-2.8 7-6.7 0-3.6-2.4-6.1-4.6-8.1-.2 2.2-1.2 3.5-2.8 4.3.3-3-1.1-5.3-3.4-7.5.1 4-3.2 5.8-3.2 11.2C5 18.2 8 21 12 21Z',
  spark: 'M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z',
  chat: 'M4 5.5h16v10H9l-5 4v-14Z',
  gear: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.5 4a8.8 8.8 0 0 0-.1-1.1l2-1.5-2-3.5-2.4 1a8.5 8.5 0 0 0-1.9-1.1L15.8 3h-4l-.3 2.8a8.5 8.5 0 0 0-1.9 1.1l-2.4-1-2 3.5 2 1.5a8.8 8.8 0 0 0 0 2.2l-2 1.5 2 3.5 2.4-1a8.5 8.5 0 0 0 1.9 1.1l.3 2.8h4l.3-2.8a8.5 8.5 0 0 0 1.9-1.1l2.4 1 2-3.5-2-1.5c.1-.4.1-.7.1-1.1Z',
  mask: 'M4 7c2-2 5.2-2.8 8-1.5C14.8 4.2 18 5 20 7v5c0 4-3.4 7-8 7s-8-3-8-7V7Zm5 4h2m2 0h2m-6 4c1.6 1 3.4 1 5 0',
  back: 'M14 6 8 12l6 6M9 12h11',
  sound: 'M4 10v4h4l5 4V6l-5 4H4Zm12-1c1 1.7 1 4.3 0 6m2.5-8.5c2.2 3.2 2.2 7.8 0 11',
  mute: 'M4 10v4h4l5 4V6l-5 4H4Zm13-1 4 4m0-4-4 4',
  dice: 'M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm3 5h.1M15 9h.1M12 12h.1M9 15h.1M15 15h.1',
  trophy: 'M8 4h8v3h4c0 3-1.5 5-4 5.7A4.8 4.8 0 0 1 13 16v2h3v2H8v-2h3v-2a4.8 4.8 0 0 1-3-3.3C5.5 12 4 10 4 7h4V4Z',
  search: 'M10.5 18a7.5 7.5 0 1 1 5.3-2.2L21 21l-1.5 1.5-5.2-5.2A7.5 7.5 0 0 1 10.5 18Z',
};

export function icon(name: IconName): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add('svg-icon');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', paths[name]);
  svg.append(path);
  return svg;
}

export function iconButton(name: IconName, title: string, onClick: () => void): HTMLButtonElement {
  const node = el('button', { className: 'icon-button', attrs: { type: 'button', title, 'aria-label': title }, onClick });
  node.append(icon(name));
  return node;
}
