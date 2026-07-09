import type { Reino } from '../data/reinos';

const symbolPaths = [
  'M50 18 72 34 63 62H37L28 34Z',
  'M50 17c18 8 25 28 0 56-25-28-18-48 0-56Z',
  'M28 28h44v44H28z M38 38h24v24H38z',
  'M50 20c12 0 22 10 22 22S62 64 50 64 28 54 28 42s10-22 22-22Z',
  'M20 58c18-30 42-30 60 0-20 10-40 10-60 0Z',
];

export function placeholderIllustration(word: string, reino: Reino, variant = 0): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', word);
  svg.classList.add('placeholder-illustration');

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  const gradientId = `g-${reino.id}-${variant}-${word.replace(/\W+/g, '')}`;
  gradient.setAttribute('id', gradientId);
  gradient.setAttribute('x1', '0');
  gradient.setAttribute('x2', '1');
  gradient.innerHTML = `<stop offset="0" stop-color="${reino.accent}"/><stop offset="1" stop-color="${reino.secondary}"/>`;
  defs.append(gradient);
  svg.append(defs);

  const paper = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  paper.setAttribute('x', '5');
  paper.setAttribute('y', '5');
  paper.setAttribute('width', '90');
  paper.setAttribute('height', '90');
  paper.setAttribute('rx', '8');
  paper.setAttribute('fill', `url(#${gradientId})`);
  paper.setAttribute('opacity', '0.9');
  paper.setAttribute('stroke', reino.shadow);
  paper.setAttribute('stroke-width', '2');
  svg.append(paper);

  for (let i = 0; i < 10; i += 1) {
    const glyph = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glyph.setAttribute('cx', String(14 + i * 8));
    glyph.setAttribute('cy', i % 2 ? '88' : '12');
    glyph.setAttribute('r', i % 3 === 0 ? '2.4' : '1.5');
    glyph.setAttribute('fill', reino.shadow);
    glyph.setAttribute('opacity', '0.35');
    svg.append(glyph);
  }

  const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  symbol.setAttribute('d', symbolPaths[variant % symbolPaths.length]);
  symbol.setAttribute('fill', reino.color);
  symbol.setAttribute('stroke', reino.shadow);
  symbol.setAttribute('stroke-width', '2');
  symbol.setAttribute('opacity', '0.9');
  svg.append(symbol);

  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', '50');
  label.setAttribute('y', '83');
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('font-size', '7');
  label.setAttribute('font-weight', '700');
  label.setAttribute('fill', reino.shadow);
  label.textContent = word.slice(0, 18);
  svg.append(label);

  return svg;
}

export function mapBackdropSvg(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 1200 720');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('map-backdrop');

  const paths = [
    ['#D2691E', 'M64 394c44-158 184-249 332-220 80 16 92 112 36 176-72 82-244 101-368 44Z'],
    ['#0F7A5A', 'M354 189c112-108 274-71 333 58 45 98-58 194-189 178-103-12-184-111-144-236Z'],
    ['#B8621B', 'M479 411c68-84 224-102 304-29 70 64 30 180-78 217-113 38-243-42-226-188Z'],
    ['#6B4C93', 'M760 168c122-35 266 17 319 125 44 91-31 185-141 170-116-16-233-139-178-295Z'],
    ['#17A2B8', 'M813 448c99-59 239-35 319 49 56 59 7 142-86 156-126 18-256-55-233-205Z'],
  ];

  for (const [fill, d] of paths) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', fill);
    path.setAttribute('opacity', '0.74');
    path.setAttribute('stroke', '#2B1D14');
    path.setAttribute('stroke-width', '4');
    svg.append(path);
  }

  return svg;
}
