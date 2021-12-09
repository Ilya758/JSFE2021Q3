import Component from './component';

class BEMWrapper extends Component {
  constructor(protected tagName: string, protected className: string) {
    super(tagName, className);
  }

  render(): HTMLElement {
    const innerContainer = document.createElement('div');
    innerContainer.className = 'container';
    const content = document.createElement('div');
    content.className = `content ${this.className}__content`;
    innerContainer.append(content);
    this.element.append(innerContainer);

    return this.element;
  }
}

export default BEMWrapper;
