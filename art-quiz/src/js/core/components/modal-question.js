import Modal from '../templates/modal';
import Text from '../components/text';
import Component from '../templates/component';
import Button from '../components/button';
import Card from './card';

class ModalQuestion extends Modal {
    static CLASS = 'modal-question';

    constructor(responseInfo) {
        super(ModalQuestion.CLASS);

        this.responseInfo = responseInfo;

        this.content = this.wrapper.querySelector(
            `.${ModalQuestion.CLASS}__content`
        );

        this.pictureContainer = new Component(
            'div',
            `${ModalQuestion.CLASS}__picture-container`
        ).render();

        this.answerIcon = ModalQuestion.generateCorrectIcon(this.responseInfo);

        this.correctPicture = ModalQuestion.generateCorrectPic(
            this.responseInfo
        );

        this.pictureContainer.append(this.correctPicture, this.answerIcon);

        this.infoContainer = ModalQuestion.generateCorrectInfo(
            this.responseInfo
        );

        this.nextButton = new Button(
            'button modal-question__button',
            'button',
            'next-question'
        ).render();
        this.nextButton.textContent = 'Next';

        this.content.append(
            this.pictureContainer,
            this.infoContainer,
            this.nextButton
        );
    }

    static generateCorrectPic(info) {
        const imgNumber = info.questionNumber;
        const imgUrl = `https://raw.githubusercontent.com/Ilya758/image-data/master/img/${imgNumber}.jpg`;

        const img = new Card(
            `${ModalQuestion.CLASS}__picture`,
            imgUrl,
            `Picture${imgNumber}`
        ).render();

        return img;
    }

    static generateCorrectIcon(info) {
        let cls;

        if (info.curAnswer) {
            cls = 'success';
        } else {
            cls = 'error';
        }

        const icon = new Component(
            'span',
            `icon icon_answer icon_answer_${cls}`
        ).render();

        return icon;
    }

    static generateCorrectInfo(info) {
        const container = new Component(
            'div',
            `${ModalQuestion.CLASS}__container`
        ).render();
        this.heading = new Text(
            'h2',
            'text text_color_dark modal__heading modal-question__heading',
            `${info.paintingName}`
        ).render();
        this.text = new Text(
            'h3',
            'text text_color_dark modal-question__text',
            `${info.currentCorrectAnswer}, ${info.year}`
        ).render();

        container.append(this.heading, this.text);

        return container;
    }
}

export default ModalQuestion;
