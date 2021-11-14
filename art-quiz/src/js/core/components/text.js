import Component from '../templates/component';

class Text extends Component {
    constructor(tagName, className, text) {
        super(tagName, className);
        this.element.textContent = text;
    }
}

export default Text;
