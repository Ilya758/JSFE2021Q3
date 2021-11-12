class Component {
    constructor(tagName, className) {
        this.container = document.createElement(tagName);

        if (className) {
            this.container.className = className;
        }
    }
}

export default Component;
