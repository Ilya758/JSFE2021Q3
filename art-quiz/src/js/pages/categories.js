import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Button from '../core/components/button';
import Card from '../core/components/card';

class Categories extends Page {
    constructor(id, gameSetup) {
        super(id);
        this.gameSetup = gameSetup;
        this.header = new ComponentWrapper('header', `header-${id}`).render();
        this.headerContent = this.header.querySelector(
            '.header-categories__content'
        );
        this.logoApp = new Component(
            'img',
            'icon icon-logo-categories'
        ).render();
        this.logoApp.src = './assets/svg/icon-app-categories.svg';
        this.logoApp.alt = 'App Second Logo';
        this.mainButton = new ButtonLink(
            'text text_color_white categories__button-text categories__link',
            'main-page',
            'Home'
        ).render();
        this.categoriesText = new Text(
            'span',
            'text categories__text text_color_pink',
            'Categories'
        ).render();
        this.scoreButton = new ButtonLink(
            'text text_color_white categories__button-text categories__button',
            'score',
            'Score'
        ).render();
        this.scoreButton.textContent = 'Score';
        this.settingsButton = new ButtonLink(
            'icon icon-settings',
            'settings'
        ).render();
        this.headerContent.append(
            this.logoApp,
            this.mainButton,
            this.categoriesText,
            this.scoreButton,
            this.settingsButton
        );
        this.main = new ComponentWrapper('main', id).render();
        this.mainContent = this.main.querySelector('.categories__content');
        this.mainContent.append(this.gridContainerInit());
        this.container.append(this.header, this.main);
    }

    gridContainerInit() {
        this.gridContainer = new Component(
            'ul',
            'list categories__list'
        ).render();
        const CATEGORIES = [
            'Portrait',
            'Landscape',
            'Still life',
            'Impressionism',
            'Expressionism',
            'Avant-garde',
            'Renaissance',
            'Surrealism',
            'Kitsch',
            'Minimalism',
            'Interior',
            'Nude',
        ];

        CATEGORIES.forEach((cat, ndx) => {
            const item = new Component('li', 'categories__item').render();
            const catText = new Text(
                'span',
                'text text_color_white categories__item-text',
                cat
            ).render();
            const catScore = new Text(
                'span',
                'text text_color_pink categories__item-text',
                '10/10'
            ).render();

            function propHandler(prop) {
                const lowerCaseProp = prop.toLowerCase();
                const splitProp = lowerCaseProp.split(' ').join('-');
                return splitProp;
            }

            function numberHandler(num) {
                return num < 10 ? `0${num}` : num;
            }

            const imgLink = new ButtonLink(
                'categories__img-link',
                'question',
                '',
                propHandler(cat)
            ).render();
            const src = `./assets/img/pictures-${numberHandler(ndx + 1)}.jpg`;
            const img = new Card('categories__img', src, cat).render();

            const repeatTextContainer = new Component(
                'div',
                'categories__repeat-container'
            ).render();
            const repeatIcon = new Component(
                'span',
                'icon icon-repeat'
            ).render();
            const playAgainText = new Text(
                'span',
                'text categories__text text_color_dark',
                'Play again'
            ).render();
            repeatTextContainer.append(repeatIcon, playAgainText);
            imgLink.append(img, repeatTextContainer);

            item.append(catText, catScore, imgLink);
            this.gridContainer.append(item);
        });
        return this.gridContainer;
    }
}

export default Categories;
