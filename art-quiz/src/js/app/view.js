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
        categoryState
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
            this.categoryState
        );
        document.querySelector('#root').prepend(newPage.render());
    }

    fillTheVolumeGradient() {
        const volumeSlider = document.querySelector('.settings-volume__slider');
        const value = volumeSlider.value;
        const BCG_PINK = '#ffbca2';
        const BCG_GRAY = '#a4a4a4';
        volumeSlider.style.background = `linear-gradient(to right, ${BCG_PINK} 0%, ${BCG_PINK} ${value}%, ${BCG_GRAY} ${value}%, ${BCG_GRAY} 100%)`;
    }

    initListeners() {
        const volumeSlider = document.querySelector('.settings-volume__slider');
        volumeSlider.addEventListener('input', this.fillTheVolumeGradient);
    }

    static bindGameCategory(handler) {
        this.mainPageButtons =
            document.getElementsByClassName('main-page__button');
        Array.from(this.mainPageButtons).forEach(btn => {
            btn.addEventListener('click', event => {
                const gameCaterory = event.target.dataset.role;
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
                if (event.target.tagName === 'SPAN') {
                    handler(event.target.parentElement);
                } else {
                    handler(event.target);
                }
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

        nextQuizButton.addEventListener('click', () => {
            if (!nextCategory) {
                const modalComplete = document.querySelector('.modal-complete');
                modalComplete.remove();
                categoryCompleteModal.classList.add('active');

                const gameOverModal = new ModalGameOver().render();
                gameOverModal.classList.add('active');
                document.querySelector('#root').prepend(gameOverModal);
            } else {
                handler('', nextCategory);
            }
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
}

export default View;
