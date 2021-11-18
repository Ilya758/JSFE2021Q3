import Modal from '../templates/modal';
import Text from '../components/text';
import Component from '../templates/component';
import Button from '../components/button';
import Card from './card';

class ModalQuestion extends Modal {
    static CLASS = 'modal-question';

    constructor() {
        super(ModalQuestion.CLASS);

        this.content = this.wrapper.querySelector(
            `.${ModalQuestion.CLASS}__content`
        );

        this.pictureContainer = new Component(
            'div',
            `${ModalQuestion.CLASS}__picture-container`
        ).render();

        this.answerIcon = new Component(
            'span',
            'icon icon_answer icon_answer_success'
        ).render();

        this.correctPicture = ModalQuestion.generateCorrectPic();

        this.pictureContainer.append(this.correctPicture, this.answerIcon);

        this.generateCorrectInfo();

        this.nextButton = new Button(
            'button modal-question__button',
            'button',
            'next-question'
        ).render();
        this.nextButton.textContent = 'Next';
        this.infoContainer = this.generateCorrectInfo();

        this.content.append(
            this.pictureContainer,
            this.infoContainer,
            this.nextButton
        );
    }

    static generateCorrectPic() {
        const imgUrl =
            'https://raw.githubusercontent.com/Ilya758/image-data/master/img/0.jpg';

        const img = new Card(
            `${ModalQuestion.CLASS}__picture`,
            imgUrl,
            `Picture${1}`
        ).render();

        return img;
    }

    generateCorrectInfo() {
        const container = new Component(
            'div',
            `${ModalQuestion.CLASS}__container`
        ).render();

        this.heading = new Text(
            'h2',
            'text text_color_dark modal__heading modal-question__heading',
            'Girl with a Pearl Earring'
        ).render();
        this.text = new Text(
            'h3',
            'text text_color_dark modal-question__text',
            'Johannes Vermeer, 1665'
        ).render();

        container.append(this.heading, this.text);

        return container;
    }
}

export default ModalQuestion;
