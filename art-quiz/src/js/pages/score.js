import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Card from '../core/components/card';

class Score extends Page {
    constructor(id, ...rest) {
        super(id);
        this.gameSetup = rest[0];
        this.categoryResults = rest[1];
        this.addInfo = rest[2];
        this.header = new ComponentWrapper('header', `header-${id}`).render();
        this.headerContent = this.header.querySelector(
            '.header-score__content'
        );
        this.logoApp = new Component(
            'img',
            'icon icon-logo-categories'
        ).render();
        this.logoApp.src = './assets/svg/icon-app-categories.svg';
        this.logoApp.alt = 'App Second Logo';

        this.mainExitContainer = new Component(
            'div',
            'header-exit__container'
        ).render();

        this.leftExitButton = new ButtonLink(
            'icon icon-left-arrow-exit',
            'categories'
        ).render();
        this.settingsText = new Text(
            'span',
            'text settings__text text_color_white',
            'Portrait categories'
        ).render();

        this.mainExitContainer.append(this.leftExitButton, this.settingsText);
        this.headerLinksContainer = new Component(
            'div',
            'header-score__links-container'
        ).render();
        this.mainButton = new ButtonLink(
            'text text_color_white categories__button-text',
            'main-page',
            'Home'
        ).render();
        this.categoriesButton = new ButtonLink(
            'text text_color_white categories__button-text text_margin_horiz',
            'categories',
            'Categories'
        ).render();
        this.scoreText = new Text(
            'span',
            'text categories__text text_color_pink',
            'Score'
        ).render();
        this.settingsButton = new ButtonLink(
            'icon icon-settings',
            'settings'
        ).render();
        this.headerLinksContainer.append(
            this.mainButton,
            this.categoriesButton,
            this.scoreText
        );
        this.headerContent.append(
            this.logoApp,
            this.mainExitContainer,
            this.headerLinksContainer,
            this.settingsButton
        );
        this.main = new ComponentWrapper('main', id).render();
        this.mainContent = this.main.querySelector('.score__content');
        this.mainContent.append(this.gridContainerInit());
        this.container.append(this.header, this.main);
        document.querySelector('#root').classList.remove('fade');
    }

    gridContainerInit() {
        this.gridContainer = new Component('ul', 'list score__list').render();

        const curNdx = this.addInfo.ndx;
        const data = this.addInfo.data;
        const overallResults = this.addInfo.overallResults;
        const firstQuestionNumber = this.addInfo.firstQuestionNumber - 1;
        const setupNdx = this.gameSetup === 'artist' ? 0 : 1;
        let currentArrayOfAnswers;
        if (overallResults) {
            currentArrayOfAnswers = overallResults[setupNdx][curNdx];
        } else {
            currentArrayOfAnswers = [];
        }

        for (let ndx = 0; ndx < 10; ) {
            const curQuestionNdx = firstQuestionNumber + ndx + 1;
            const heading = data[curQuestionNdx].name;
            const text = `${data[curQuestionNdx].author}, ${data[curQuestionNdx].year}`;

            const item = new Component('li', 'score__item').render();
            const imgUrl = `https://raw.githubusercontent.com/Ilya758/image-data/master/img/${curQuestionNdx}.jpg`;

            const img = new Card(
                'score__img',
                imgUrl,
                `Picture${ndx}`
            ).render();
            const descrContainer = new Component(
                'div',
                'score__description-container'
            ).render();

            if (currentArrayOfAnswers[ndx]) {
                img.classList.add('img_state_active');
                descrContainer.classList.add('container_state_active');
            }

            const descrHeading = new Text(
                'h3',
                'text score__description-heading text_color_dark',
                heading
            ).render();
            const addInfo = new Text(
                'h4',
                'text score__description-text text_color_dark',
                text
            ).render();
            descrContainer.append(descrHeading, addInfo);
            item.append(descrContainer, img);
            this.gridContainer.append(item);
            ndx += 1;
        }

        return this.gridContainer;
    }
}

export default Score;
