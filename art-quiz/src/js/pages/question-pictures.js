import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Button from '../core/components/button';
import TimeProgressBar from '../core/components/time-progressbar';
import Card from '../core/components/card';

class QuestionPictures extends Page {
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
            'Who is the author of this picture?'
        ).render();
        this.questionPictureContainer = new Component(
            'div',
            'question__picture-container'
        ).render();
        this.questionPicture = new Card(
            'question__picture',
            './assets/img/test.jpg',
            'Pic'
        ).render();
        this.questionPictureContainer.append(
            this.questionPicture,
            this.generatePaginationList()
        );
        this.questionContainer.append(
            this.questionHeader,
            this.questionPictureContainer,
            this.generateAnswersList()
        );
        this.content.append(this.topContainer, this.questionContainer);
        this.container.append(this.wrapper);
    }

    generatePaginationList() {
        const CLASS = 'question__pagination';
        this.questionPaginationList = new Component(
            'ul',
            `list ${CLASS}-list`
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
        this.questionPaginationList = new Component(
            'ul',
            `list ${CLASS}-list`
        ).render();

        for (let i = 0; i < 4; ) {
            i += 1;
            const item = new Component('li', `${CLASS}-item`).render();
            const button = new Button(
                `text text_color_white ${CLASS}-button`,
                'button',
                'answer'
            ).render();
            button.textContent = 'Answer';
            item.append(button);
            this.questionPaginationList.append(item);
        }

        return this.questionPaginationList;
    }
}

export default QuestionPictures;
