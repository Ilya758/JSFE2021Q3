import Component from '../templates/component';

class SearchingField extends Component {
  constructor(
    protected className: string,
    protected type: string,
    protected role: string
  ) {
    super('input', className);
    (this.element as HTMLInputElement).type = type;
    this.element.dataset.role = role;
    (this.element as HTMLInputElement).placeholder = 'Поиск';
    this.element.autofocus = true;
    (this.element as HTMLInputElement).autocomplete = 'false';
  }
}

export default SearchingField;
