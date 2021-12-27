import Component from '../templates/component';

class GarlandToggle extends Component {
  constructor(protected className: string, protected id: string) {
    super('div', className);
    this.element = this.create();
  }

  create() {
    // create track
    const track = this.element;
    track.id = this.id;
    track.className = `${this.className}__track`;
    // create thumb
    const thumb = new Component('div', `${this.className}__thumb`).render();

    track.append(thumb);

    return track;
  }
}

export default GarlandToggle;
