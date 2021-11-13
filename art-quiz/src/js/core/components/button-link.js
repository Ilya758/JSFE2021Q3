import Component from '../templates/component';

class ButtonLink extends Component {
    constructor(className, id, text = '', role) {
        super('a', className);
        this.element.href = `#${id}`;
        this.element.textContent = text;

        if (role) {
            this.element.dataset.role = role;
        }
    }

    render() {
        return this.element;
    }
}

export default ButtonLink;
