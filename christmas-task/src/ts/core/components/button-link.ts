import Component from '../templates/component';

class ButtonLink extends Component {
  constructor(
    protected className: string,
    protected external: boolean,
    protected id: string,
    protected text: string = ''
  ) {
    super('a', className);
    this.element = this.element as HTMLAnchorElement;

    (this.element as HTMLAnchorElement).href = this.external ? id : `#${id}`;

    if (external) {
      (this.element as HTMLAnchorElement).target = '_blank';
    }
    this.element.textContent = text;
  }
}

export default ButtonLink;
