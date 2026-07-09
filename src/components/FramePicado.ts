export function framePicado(width: number, height: number, color: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('frame-picado');

  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.setAttribute('fill', color);
  group.setAttribute('opacity', '0.88');

  for (let x = 0; x < width; x += 30) {
    const top = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    top.setAttribute('d', `M${x} 0h28v16c-7 8-21 8-28 0V0Zm7 6c4 6 10 6 14 0`);
    const bottom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    bottom.setAttribute('d', `M${x} ${height}h28v-16c-7-8-21-8-28 0v16Zm7-6c4-6 10-6 14 0`);
    group.append(top, bottom);
  }

  const border = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  border.setAttribute('x', '8');
  border.setAttribute('y', '8');
  border.setAttribute('width', String(width - 16));
  border.setAttribute('height', String(height - 16));
  border.setAttribute('rx', '8');
  border.setAttribute('fill', 'none');
  border.setAttribute('stroke', color);
  border.setAttribute('stroke-width', '2');
  border.setAttribute('stroke-dasharray', '8 7');
  svg.append(group, border);

  return svg;
}
