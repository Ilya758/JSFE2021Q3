import Component from '../templates/component';

class Card extends Component {
    constructor(className, src, alt) {
        super('img', className);
        this.element.src = src;
        this.element.alt = alt;
    }
}

export default Card;
