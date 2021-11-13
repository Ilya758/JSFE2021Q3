import Component from '../templates/component';

class ButtonLink extends Component {
    constructor(className, id, text) {
        super('a', className);
        this.element.href = `#${id}`;
        this.element.textContent = text;
    }

    render() {
        return this.element;
    }
}

export default ButtonLink;
