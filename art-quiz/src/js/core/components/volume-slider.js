import Component from '../templates/component';

class VolumeSlider extends Component {
    constructor(tagName, className) {
        super(tagName, className);
        this.element.type = 'range';
    }
}

export default VolumeSlider;
