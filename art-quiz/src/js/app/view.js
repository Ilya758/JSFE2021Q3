import Component from '../core/templates/component';
import ComponentWrapper from '../core/templates/component-wrapper';
import MainPage from '../pages/main';
import Settings from '../pages/settings';
import QuestionArtist from '../pages/question-artist';
import Categories from '../pages/categories';
import Score from '../pages/score';

class View {
    static pageIds = {
        'main-page': MainPage,
        settings: Settings,
        categories: Categories,
        question: QuestionArtist,
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

    static render(NewPage = MainPage, id = 'main-page') {
        const root = document.querySelector('#root');

        Array.from(root.children).forEach(child => {
            if (child.tagName.toLowerCase() !== 'footer') {
                child.remove();
            }
        });
        console.log(NewPage);
        const newPage = new NewPage(id);
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
}

export default View;
