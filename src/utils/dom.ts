export type Child = Node | string | number | boolean | null | undefined;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
    children?: Child[];
    onClick?: (event: MouseEvent) => void;
  } = {},
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  for (const [key, value] of Object.entries(options.attrs ?? {})) {
    node.setAttribute(key, value);
  }
  if (options.onClick) node.addEventListener('click', options.onClick);
  append(node, ...(options.children ?? []));
  return node;
}

export function append(parent: Element, ...children: Child[]): Element {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    parent.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return parent;
}

export function clear(node: Element): void {
  node.replaceChildren();
}

export function button(label: string, className: string, onClick: (event: MouseEvent) => void, title?: string): HTMLButtonElement {
  const node = el('button', { className, text: label, onClick, attrs: { type: 'button' } });
  if (title) node.title = title;
  return node;
}

export function fieldLabel(text: string, input: HTMLElement): HTMLLabelElement {
  return el('label', {
    className: 'field-label',
    children: [el('span', { text }), input],
  });
}
