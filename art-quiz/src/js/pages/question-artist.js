import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Button from '../core/components/button';
import TimeProgressBar from '../core/components/time-progressbar';
import Card from '../core/components/card';

class QuestionArtist extends Page {
    constructor(id) {
        super(id);
        this.wrapper = new ComponentWrapper('main', id).render();
        this.content = this.wrapper.querySelector('.question__content');
        this.topContainer = new Component(
            'div',
            'question__top-container'
        ).render();
        this.exitButton = new Button(
            'icon icon-cross-exit',
            'button',
            'categories'
        ).render();
        this.timeProgressBar = new TimeProgressBar().render();
        this.timeCounterText = new Text(
            'span',
            'text text_color_white question__heading-text',
            '0:20'
        ).render();
        this.topContainer.append(
            this.exitButton,
            this.timeProgressBar,
            this.timeCounterText
        );

        this.questionContainer = new Component(
            'div',
            'question__container'
        ).render();
        this.questionHeader = new Text(
            'h1',
            'text text_color_white question__heading-text',
            'Which is Edward Munch picture?'
        ).render();
        this.questionAnswersContainer = new Component(
            'div',
            'question__answers-container'
        ).render();
        /**this.questionPictureContainer = new Component(
            'div',
            'question__picture-container'
        ).render(); */
        this.questionContainer.append(
            this.questionHeader,
            this.generateAnswersList(),
            this.generatePaginationList()
        );
        this.content.append(this.topContainer, this.questionContainer);
        this.container.append(this.wrapper);
    }

    generatePaginationList() {
        const CLASS = 'question__pagination';
        this.questionPaginationList = new Component(
            'ul',
            `list ${CLASS}-list list_pos_rel`
        ).render();

        for (let i = 0; i < 10; ) {
            i += 1;
            const item = new Component('li', `${CLASS}-item`).render();
            this.questionPaginationList.append(item);
        }

        return this.questionPaginationList;
    }

    generateAnswersList() {
        const CLASS = 'question__answers';
        this.answersList = new Component(
            'ul',
            `list ${CLASS}-list list_margin_top list_type_pics`
        ).render();

        for (let i = 0; i < 4; ) {
            i += 1;
            const item = new Component('li', `${CLASS}-item`).render();
            const label = new Component('label', `${CLASS}-label`).render();
            const src = `./assets/img/pictures-0${i}.jpg`;
            const img = new Card(`${CLASS}-img`, src, 'Pic').render();
            const radioBtn = new Component('input', `${CLASS}-radio`).render();
            radioBtn.name = 'answer';
            radioBtn.type = 'radio';
            label.append(img, radioBtn);
            item.append(label);
            this.answersList.append(item);
        }
        return this.answersList;
    }
}

export default QuestionArtist;
