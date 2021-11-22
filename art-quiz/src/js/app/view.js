/* eslint-disable class-methods-use-this */
import Component from '../core/templates/component';
import ComponentWrapper from '../core/templates/component-wrapper';
import MainPage from '../pages/main';
import Settings from '../pages/settings';
import Question from '../pages/question';
import Categories from '../pages/categories';
import Score from '../pages/score';
import ModalGameOver from '../core/components/modal-gameover';
import ModalScore from '../core/components/modal-score';

class View {
    static pageIds = {
        'main-page': MainPage,
        settings: Settings,
        categories: Categories,
        question: Question,
        score: Score,
    };

    static renderFooter() {
        const footer = new ComponentWrapper('footer', 'footer').render();
        const footerContent = footer.querySelector('.footer__content');
        const footerLogo = new Component('span', 'icon logo-school').render();

        footerContent.append(footerLogo);

        let author;
        let year;
        const TEXT_CONTENT = ['App developer: Illia Skaryna', '2021'];

        [author, year] = [author, year].map((el, ndx) => {
            const elem = new Component(
                'span',
                'text footer__text text_color_white'
            ).render();
            elem.textContent = TEXT_CONTENT[ndx];
            footerContent.append(elem);
            return elem;
        });

        return footer;
    }

    constructor() {
        this.root = document.querySelector('#root');
        this.root.append(View.renderFooter());
        View.render();
    }

    static async render(
        NewPage = MainPage,
        id = 'main-page',
        gameSetup,
        questionInfo,
        categoryState,
        scoreResults,
        settings
    ) {
        this.gameSetup = gameSetup;
        this.categoryState = categoryState;
        const root = document.querySelector('#root');
        Array.from(root.children).forEach(child => {
            if (child.tagName.toLowerCase() !== 'footer') {
                child.remove();
            }
        });

        const newPage = new NewPage(
            id,
            gameSetup,
            questionInfo,
            this.categoryState,
            scoreResults,
            settings
        );
        document.querySelector('#root').prepend(newPage.render());
    }

    static fillTheVolumeGradient(val) {
        const volumeSlider = document
            .querySelector('#root')
            .querySelector('.settings-volume__slider');

        let value;

        if (val) {
            value = val;
        } else {
            value = volumeSlider.value;
        }

        const BCG_PINK = '#ffbca2';
        const BCG_GRAY = '#a4a4a4';
        volumeSlider.value = value;
        volumeSlider.style.background = `linear-gradient(to right, ${BCG_PINK} 0%, ${BCG_PINK} ${value}%, ${BCG_GRAY} ${value}%, ${BCG_GRAY} 100%)`;
    }

    static bindVolumeValue(handler) {
        const volumeSlider = document
            .querySelector('#root')
            .querySelector('.settings-volume__slider');
        volumeSlider.addEventListener('input', event => {
            const value = handler(event);
            View.fillTheVolumeGradient(value);
        });
    }

    static bindGameCategory(handler) {
        this.mainPageButtons =
            document.getElementsByClassName('main-page__button');
        Array.from(this.mainPageButtons).forEach(btn => {
            btn.addEventListener('click', event => {
                const gameCaterory = event.target.dataset.role;
                document.querySelector('#root').classList.add('fade');
                handler(gameCaterory);
            });
        });
    }

    static async bindQuestionInfo(handler) {
        const categoriesButtons = document.querySelectorAll(
            '.categories__img-link'
        );

        categoriesButtons.forEach(catBtn => {
            catBtn.addEventListener('click', event => {
                document.querySelector('#root').classList.add('fade');

                setTimeout(() => {
                    if (event.target.tagName === 'SPAN') {
                        handler(event.target.parentElement);
                    } else {
                        handler(event.target);
                    }
                }, 2000);
            });
        });
    }

    static bindResetHash(handler) {
        document.addEventListener('unload', () => {
            handler();
        });
    }

    static showFinalResults(info, handler, nextCategory) {
        const categoryCompleteModal = info;
        categoryCompleteModal.classList.add('active');
        const prevModal = document.querySelector('.modal-question');

        prevModal.remove();

        document.querySelector('#root').prepend(categoryCompleteModal);

        const nextQuizButton = document
            .querySelector('#root')
            .querySelectorAll('.modal-complete__button')[1];

        const homeButton = document
            .querySelector('#root')
            .querySelectorAll('.modal-complete__button')[0];

        homeButton.addEventListener('click', () => {
            document.querySelector('#root').classList.add('fade');
        });

        nextQuizButton.addEventListener('click', () => {
            if (!nextCategory) {
                const modalComplete = document.querySelector('.modal-complete');
                modalComplete.remove();
                categoryCompleteModal.classList.add('active');
                const gameOverModal = new ModalGameOver().render();
                gameOverModal.classList.add('active');
                document.querySelector('#root').prepend(gameOverModal);
                setTimeout(() => {
                    gameOverModal
                        .querySelector('.modal-gameover__content')
                        .classList.add('active');
                }, 250);
            } else {
                document.querySelector('#root').classList.add('fade');
                setTimeout(() => {
                    handler('', nextCategory);
                }, 2000);
            }

            const modalGameoverButtons = document.querySelectorAll(
                '.modal-gameover__button'
            );
            modalGameoverButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelector('#root').classList.add('fade');
                });
            });
        });
    }

    static async bindRenderScoreModal(categories, handler) {
        const scoreButton = document
            .querySelector('#root')
            .querySelector('button[data-role="score"]');

        scoreButton.addEventListener('click', async () => {
            const modalScore = await new ModalScore(categories).render();
            modalScore.classList.add('active');
            document.querySelector('#root').prepend(modalScore);

            const buttons = document
                .querySelector('#root')
                .querySelectorAll('.modal-score__text');

            buttons.forEach(btn => {
                btn.addEventListener('click', event => {
                    handler(event);
                });
            });

            const exitButton = document
                .querySelector('#root')
                .querySelector('.icon_bcg_dark');

            exitButton.addEventListener('click', () => {
                modalScore.remove();
            });
        });
    }

    static bindResetSettings(handler) {
        const defaultButton = document
            .querySelector('#root')
            .querySelector('.button_bcg_initial');

        defaultButton.addEventListener('click', () => {
            handler();
        });
    }

    static async transitionToSettingsPage() {
        const settingsButton = document.querySelector('.icon-settings');

        if (settingsButton !== null) {
            settingsButton.addEventListener('click', () => {
                document.querySelector('#root').classList.add('fade');
            });
        }
    }

    static async bindToggleTime(handler, settings) {
        const slider = document
            .querySelector('#root')
            .querySelector('.volume-toggler__slider');
        slider.addEventListener('click', async () => {
            handler();
            await View.thumbToggler(settings);
        });
    }

    static async thumbToggler(settings) {
        const slider = document
            .querySelector('#root')
            .querySelector('.volume-toggler__slider');
        const thumb = document
            .querySelector('#root')
            .querySelector('.volume-toggler__thumb');

        const actualSettings = await settings();
        const text = document
            .querySelector('.settings-time__container')
            .querySelector('span');
        const sliderRect = slider.getBoundingClientRect();
        const thumbRect = thumb.getBoundingClientRect();

        const currentX = sliderRect.left - thumbRect.left + thumbRect.width / 2;

        if (actualSettings.timeIsEnabled === 'true') {
            thumb.style.left = `${currentX + sliderRect.width / 2}px`;
            slider.style.background = '#ffbca2';
            text.textContent = 'On';
        } else {
            thumb.style.left = '4px';
            slider.style.background = '#a4a4a4';
            text.textContent = 'Off';
        }
    }

    static bindChangingTimeCount(handler) {
        const subBtn = document.querySelector('.icon-sub');
        const addBtn = document.querySelector('.icon-add');

        [subBtn, addBtn].forEach(btn => {
            btn.addEventListener('click', event => {
                const timeOut = handler(event);

                const timeOutText = document
                    .querySelector('.settings-duration__container')
                    .querySelector('span');
                timeOutText.textContent = timeOut;
            });
        });
    }

    static removeFadeClass() {
        return document.querySelector('#root').classList.remove('fade');
    }

    static addFadeClass() {
        const buttons = document.querySelectorAll('.modal-complete__button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('#root').classList.add('fade');
            });
        });
    }

    static bindFadeEffectToPages() {
        const leftExitButton = document.querySelector('.icon-left-arrow-exit');
        const homeButton = document.querySelector('a[href="#main-page"]');
        const categoriesButton = document.querySelector('.text_margin_horiz');

        [leftExitButton, homeButton, categoriesButton].forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('#root').classList.add('fade');
            });
        });
    }
}

export default View;
