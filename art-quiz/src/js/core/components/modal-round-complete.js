import Modal from '../templates/modal';
import Text from '../components/text';
import Component from '../templates/component';
import Button from '../components/button';
import Card from './card';
import ButtonLink from './button-link';

class ModalRoundComplete extends Modal {
    static CLASS = 'modal-complete';

    constructor(results) {
        super(ModalRoundComplete.CLASS);

        this.results = results;

        this.content = this.wrapper.querySelector(
            `.${ModalRoundComplete.CLASS}__content`
        );

        this.imgCup = new Component('span', 'icon icon_cup').render();
        this.heading = new Text(
            'h2',
            'text text_color_dark modal-complete__heading',
            'Congratulations!'
        ).render();
        this.currentScoreText = ModalRoundComplete.getCurrentScore(
            this.results
        );

        this.buttonsContainer = new Component(
            'div',
            'modal-complete__buttons-container'
        ).render();
        this.homeButton = new ButtonLink(
            'text text_color_dark modal-complete__button button',
            'main-page',
            'Home'
        ).render();
        this.nextQuizButton = new Button(
            'text text_color_dark modal-complete__button button',
            'button',
            'next-quiz'
        ).render();
        this.nextQuizButton.textContent = 'Next Quiz';

        this.buttonsContainer.append(this.homeButton, this.nextQuizButton);

        this.content.append(
            this.imgCup,
            this.heading,
            this.currentScoreText,
            this.buttonsContainer
        );
    }

    static getCurrentScore(answers) {
        const correctAnswersCount = answers.correctAnswers;
        const score = new Text(
            'h3',
            'text text_color_dark modal-complete__score',
            `${correctAnswersCount}/10`
        ).render();

        return score;
    }
}

export default ModalRoundComplete;
