class Component {
    constructor(tagName, className) {
        this.element = document.createElement(tagName);

        if (className) {
            this.element.className = className;
        }
    }
}

export default Component;
