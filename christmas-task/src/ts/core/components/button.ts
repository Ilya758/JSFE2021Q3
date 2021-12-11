import Component from '../templates/component';

class Button extends Component {
  constructor(
    protected className: string,
    protected type: string,
    protected role: string,
    protected text: string = ''
  ) {
    super('button', className);
    (this.element as HTMLButtonElement).type = type;
    this.element.dataset.role = role;
    this.element.textContent = text;
  }
}

export default Button;
