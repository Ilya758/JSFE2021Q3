import ComponentWrapper from './component-wrapper';

class Modal {
    constructor(className) {
        this.wrapper = new ComponentWrapper('div', `${className}`).render();
        this.wrapper.className = `wrapper ${className}`;
        this.content = document.querySelector(`.${className}-content`);
    }

    render() {
        return this.wrapper;
    }
}

export default Modal;
