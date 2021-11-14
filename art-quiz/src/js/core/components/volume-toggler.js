import Component from '../templates/component';

class VolumeToggler extends Component {
    static className = 'volume-toggler';

    constructor() {
        super('div', `${VolumeToggler.className}__slider`);
        this.thumb = new Component(
            'div',
            `${VolumeToggler.className}__thumb`
        ).render();
        this.thumb.dataset.state = 'disabled';
        this.element.append(this.thumb);
    }
}

export default VolumeToggler;
