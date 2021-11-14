import Component from '../templates/component';

class Button extends Component {
    constructor(className, type, role) {
        super('button', className);
        this.element.type = type;
        this.element.dataset.role = role;
    }
}

export default Button;
