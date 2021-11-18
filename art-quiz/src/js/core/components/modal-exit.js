import Modal from '../templates/modal';
import ButtonLink from '../components/button-link';
import Text from '../components/text';
import Component from '../templates/component';
import Button from '../components/button';

class ModalExit extends Modal {
    static CLASS = 'modal-exit';

    constructor() {
        super(ModalExit.CLASS);

        this.content = this.wrapper.querySelector(
            `.${ModalExit.CLASS}__content`
        );

        this.exitButton = new Button(
            'icon icon-cross-exit bcg_color_gray icon_pos_abs',
            'button'
        ).render();

        this.heading = new Text(
            'h2',
            'text text_color_dark modal__heading',
            'Do you really want to quit the game?'
        ).render();

        this.buttonsContainer = new Component(
            'div',
            'modal-exit__container'
        ).render();

        this.cancelButton = new Button(
            'text button modal-exit__button text_color_dark',
            'button',
            'cancel'
        ).render();
        this.cancelButton.textContent = 'Cancel';
        this.linkToHomePageButton = new ButtonLink(
            'text button modal-exit__button text_color_dark',
            'main-page',
            'Yes'
        ).render();

        this.buttonsContainer.append(
            this.cancelButton,
            this.linkToHomePageButton
        );

        this.content.append(
            this.exitButton,
            this.heading,
            this.buttonsContainer
        );
    }
}

export default ModalExit;
