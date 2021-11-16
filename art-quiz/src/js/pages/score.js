import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Card from '../core/components/card';

class Score extends Page {
    constructor(id) {
        super(id);
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
    }

    gridContainerInit() {
        this.gridContainer = new Component('ul', 'list score__list').render();

        for (let ndx = 1; ndx < 21; ) {
            const item = new Component('li', 'score__item').render();
            const src = './assets/img/pictures-01.jpg';
            const img = new Card('score__img', src, '1').render();
            const descrContainer = new Component(
                'div',
                'score__description-container'
            ).render();
            const descrHeading = new Text(
                'h3',
                'text score__description-heading text_color_dark',
                'Girl with a Pearl Earring'
            ).render();
            const addInfo = new Text(
                'h4',
                'text score__description-text text_color_dark',
                'Johannes Vermeer, 1665'
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
