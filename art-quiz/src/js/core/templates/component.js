class Component {
    constructor(tagName, className) {
        this.element = document.createElement(tagName);

        if (className) {
            this.element.className = className;
        }
    }

    render() {
        return this.element;
    }
}

export default Component;
