import Component from '../templates/component';

class Text extends Component {
  constructor(
    protected tagName: string,
    protected className: string,
    protected text: string
  ) {
    super(tagName, className);
    this.element.textContent = text;
  }
}

export default Text;
