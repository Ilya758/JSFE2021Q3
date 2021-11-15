import Component from '../templates/component';

class TimeProgressBar extends Component {
    constructor() {
        super('div', 'time-progressbar__container');
        this.bar = new Component('div', 'time-progressbar').render();
        this.element.append(this.bar);
    }
}

export default TimeProgressBar;
