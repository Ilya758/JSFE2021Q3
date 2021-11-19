import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Button from '../core/components/button';
import TimeProgressBar from '../core/components/time-progressbar';
import Card from '../core/components/card';
import ModalQuestion from '../core/components/modal-question';

class Question extends Page {
    constructor(id, gameSetup, questionInfo) {
        super(id);
        this.questionInfo = questionInfo;
        this.gameSetup = gameSetup;
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
        /** this.questionAnswersContainer = new Component(
            'div',
            'question__answers-container'
        ).render(); */
        /**this.questionPictureContainer = new Component(
            'div',
            'question__picture-container'
        ).render(); */
        this.generateAnswersList();
        this.content.append(this.topContainer, this.questionContainer);
        this.container.append(this.wrapper);
    }

    generatePaginationList() {
        let relativeClass = '';

        if (this.gameSetup === 'pictures') {
            relativeClass = 'list_pos_rel';
        }

        const CLASS = 'question__pagination';
        this.questionPaginationList = new Component(
            'ul',
            `list ${CLASS}-list ${relativeClass}`
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

        if (this.gameSetup === 'artist') {
            this.generateArtistQuiz(CLASS);
        } else {
            this.generatePicturesQuiz(CLASS);
        }
    }

    async generatePicturesQuiz(CLASS) {
        const [
            paintingName,
            questionAuthor,
            questionNumber,
            paintingNums,
            year,
        ] = [
            this.questionInfo.paintingName,
            this.questionInfo.questionAuthor,
            this.questionInfo.questionNumber,
            this.questionInfo.shufflePaintingsNums,
            this.questionInfo.year,
        ];

        this.questionHeader = new Text(
            'h1',
            'text text_color_white question__heading-text',
            `Which is ${questionAuthor} picture?`
        ).render();
        this.questionContainer.prepend(this.questionHeader);
        this.answersList = new Component(
            'ul',
            `list ${CLASS}-list list_margin_top list_type_pics`
        ).render();

        for (let i = 0; i < 4; ) {
            i += 1;
            const item = new Component('li', `${CLASS}-item`).render();
            const label = new Component('label', `${CLASS}-label`).render();

            const imgUrl = `https://raw.githubusercontent.com/Ilya758/image-data/master/img/${paintingNums[i]}.jpg`;

            const img = new Card(
                `${CLASS}-img`,
                imgUrl,
                `Picture${i}`
            ).render();
            const radioBtn = new Component('input', `${CLASS}-radio`).render();
            radioBtn.name = 'answer';
            radioBtn.type = 'radio';
            label.append(img, radioBtn);
            item.append(label);
            this.answersList.append(item);
            i += 1;
        }

        this.questionContainer.append(
            this.answersList,
            this.generatePaginationList()
        );

        return this.answersList;
    }

    async generateArtistQuiz(CLASS) {
        const [correctAnswer, paintingName, questionNum, authors, year] = [
            this.questionInfo.currentCorrectAnswer,
            this.questionInfo.paintingName,
            this.questionInfo.questionNumber,
            this.questionInfo.shuffleAuthorsNameArray,
            this.year,
        ];

        const imgUrl = `https://raw.githubusercontent.com/Ilya758/image-data/master/full/${questionNum}full.jpg`;

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
            imgUrl,
            'Pic'
        ).render();
        this.questionPictureContainer.append(
            this.questionPicture,
            this.generatePaginationList()
        );
        this.questionContainer.append(
            this.questionHeader,
            this.questionPictureContainer
        );

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
                authors[i]
            ).render();
            button.textContent = authors[i];
            item.append(button);
            this.questionPaginationList.append(item);
            i += 1;
        }

        this.questionContainer.append(this.questionPaginationList);

        return this.questionPaginationList;
    }

    static async bindAnswer(handler) {
        this.answerButtons = document
            .querySelector('#root')
            .querySelectorAll('.question__answers-button');

        this.answerButtons.forEach(btn => {
            btn.addEventListener('click', async event => {
                const responseInfo = await handler(event);
                const questionModal = new ModalQuestion(responseInfo).render();
                questionModal.classList.add('active');
                document.querySelector('#root').before(questionModal);
            });
        });
    }
}

export default Question;
