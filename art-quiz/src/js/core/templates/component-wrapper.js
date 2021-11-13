import Component from './component';

class ComponentWrapper extends Component {
    constructor(tagName, className) {
        super(tagName);
        this.innerContainer = document.createElement('div');
        this.innerContainer.className = 'container';
        this.content = document.createElement('div');
        this.content.className = `content ${className}__content`;
        this.innerContainer.append(this.content);
        this.element.append(this.innerContainer);
    }

    render() {
        return this.element;
    }
}

export default ComponentWrapper;
