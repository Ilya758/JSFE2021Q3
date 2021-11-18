import Modal from '../templates/modal';
import Text from '../components/text';
import Component from '../templates/component';
import ButtonLink from './button-link';

class ModalGameOver extends Modal {
    static CLASS = 'modal-gameover';

    constructor() {
        super(ModalGameOver.CLASS);

        this.content = this.wrapper.querySelector(
            `.${ModalGameOver.CLASS}__content`
        );

        this.imgCup = new Component('span', 'icon icon_gameover').render();

        this.heading = new Text(
            'h2',
            'text text_color_dark modal-gameover__heading',
            'Game over'
        ).render();

        this.text = new Text(
            'h3',
            'text text_color_dark modal-gameover__text',
            'Play again?'
        ).render();

        this.buttonsContainer = new Component(
            'div',
            'modal-complete__buttons-container'
        ).render();

        this.homeButton = new ButtonLink(
            'text text_color_dark modal-gameover__button button',
            'main-page',
            'No'
        ).render();

        this.categoryButton = new ButtonLink(
            'text text_color_dark modal-gameover__button button',
            'categories',
            'Yes'
        ).render();

        this.buttonsContainer.append(this.homeButton, this.categoryButton);

        this.content.append(
            this.imgCup,
            this.heading,
            this.text,
            this.buttonsContainer
        );
    }
}

export default ModalGameOver;
