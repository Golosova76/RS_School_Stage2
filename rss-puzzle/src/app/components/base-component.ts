// класс для компонентов
type ComponentOptions = {
  tag?: string;
  className?: string;
  text?: string;
  type?: string;
};

export interface InterComponent {
  getNode?: () => HTMLElement;
  destroy?: () => void;
}

export class Component<T extends InterComponent> {
  private children: T[];

  private node: HTMLElement;

  constructor(
    { tag = 'div', className = '', text = '', type }: ComponentOptions,
    ...children: T[]
  ) {
    const node: HTMLElement = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    // Обработка свойства 'type' для элементов, где это применимо
    if (type && tag.toLowerCase() === 'input') {
      (node as HTMLInputElement).type = type;
    }
    this.node = node;
    this.children = [];

    if (children.length > 0) {
      this.appendChildren(children);
    }
  }

  append(child: T): void {
    this.children.push(child);
    if (child.getNode) {
      this.node.append(child.getNode());
    }
  }

  appendChildren(children: T[]): void {
    children.forEach((el) => {
      this.append(el);
    });
  }

  getNode(): HTMLElement {
    return this.node;
  }

  getChildren(): T[] {
    return this.children;
  }

  setTextContent(content: string): void {
    this.node.textContent = content;
  }

  setAttribute(attribute: string, value: string): void {
    this.node.setAttribute(attribute, value);
  }

  removeAttribute(attribute: string): void {
    this.node.removeAttribute(attribute);
  }

  toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  addListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options: boolean | AddEventListenerOptions = false
  ): void {
    this.node.addEventListener(event, listener, options);
  }

  removeListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options: boolean | EventListenerOptions = false
  ): void {
    this.node.removeEventListener(event, listener, options);
  }

  destroyChildren(): void {
    this.children.forEach((child) => {
      child.destroy?.();
    });
    this.children.length = 0;
  }

  destroy(): void {
    this.destroyChildren();
    this.node.remove();
  }
}
