import Component from '../templates/component';

class Button extends Component {
  constructor(
    protected className: string,
    protected type: string,
    protected role: string
  ) {
    super('button', className);
    (this.element as HTMLButtonElement).type = type;
    this.element.dataset.role = role;
  }
}

export default Button;
