import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Card from '../core/components/card';
import Button from '../core/components/button';
class Categories extends Page {
    constructor(id, gameSetup, categoryState) {
        super(id);
        this.gameSetup = gameSetup;
        this.categoryState = categoryState;
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
        this.scoreButton = new Button(
            'text text_color_white categories__button-text categories__button',
            'button',
            'score'
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
        this.mainContent.append(this.gridContainerInit(this.categoryState));
        this.container.append(this.header, this.main);
    }

    gridContainerInit(state) {
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
            const ndxSetup = this.gameSetup === 'artist' ? 0 : 1;
            const isCategoryPlayed = state[ndxSetup][ndx][0];
            let correctAnswers = state[ndxSetup][ndx][1];

            if (correctAnswers === false) {
                correctAnswers = 0;
            }

            const item = new Component('li', 'categories__item').render();
            const catText = new Text(
                'span',
                'text text_color_white categories__item-text',
                cat
            ).render();
            let catScore = '';

            if (isCategoryPlayed) {
                catScore = new Text(
                    'span',
                    'text text_color_pink categories__item-text',
                    `${correctAnswers}/10`
                ).render();
            }

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
            const src = `./assets/img/${this.gameSetup}-${numberHandler(
                ndx + 1
            )}.jpg`;
            const img = new Card('categories__img', src, cat).render();
            img.style.filter = `grayscale(${1 - correctAnswers / 10})`;

            let repeatTextContainer;

            if (isCategoryPlayed) {
                repeatTextContainer = new Component(
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
            } else {
                repeatTextContainer = '';
            }

            imgLink.append(img, repeatTextContainer);

            item.append(catText, catScore, imgLink);
            this.gridContainer.append(item);
        });

        document.querySelector('#root').classList.remove('fade');
        return this.gridContainer;
    }

    static transitionToPages() {
        const homeButton = document.querySelector('a[href="#main-page"]');
        const scoreButton = document.querySelector('button[data-role="score"]');

        homeButton.addEventListener('click', () => {
            document.querySelector('#root').classList.add('fade');
        });

        scoreButton.addEventListener('click', () => {
            setTimeout(() => {
                const modalScoreContent = document.querySelector(
                    '.modal-score__content'
                );

                modalScoreContent.classList.add('content_state_visible');

                const modalScoreButtons =
                    document.querySelectorAll('a[href="#score"]');

                modalScoreButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        document.querySelector('#root').classList.add('fade');
                    });
                });
            }, 0);
        });
    }
}

export default Categories;
