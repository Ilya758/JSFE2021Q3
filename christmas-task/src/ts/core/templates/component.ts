class Component {
  protected element: HTMLElement;

  constructor(protected tagName: string, protected className: string) {
    this.element = document.createElement(tagName);

    if (className) {
      this.element.className = className;
    }
  }

  render(): HTMLElement {
    return this.element;
  }
}

export default Component;
