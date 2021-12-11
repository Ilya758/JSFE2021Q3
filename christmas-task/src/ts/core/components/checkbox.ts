import Component from '../templates/component';

class Checkbox extends Component {
  constructor(
    protected className: string,
    protected type: string,
    protected role: string
  ) {
    super('input', className);
    (this.element as HTMLInputElement).type = type;
    this.element.dataset.role = role;
  }
}

export default Checkbox;
