import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';

class MainPage extends Page {
    constructor(id) {
        super(id);
        this.wrapper = new ComponentWrapper('main', id).render();
        this.content = this.wrapper.querySelector('.main-page__content');
        this.settingsButton = new ButtonLink(
            'icon icon-settings',
            'settings'
        ).render();
        this.logoApp = new Component('img', 'icon icon-logo-app').render();
        this.logoApp.src = './assets/svg/icon-app-mainpage.svg';
        this.logoApp.alt = 'App Main Logo';
        this.artistQuizButton = new ButtonLink(
            'text text_color_white button main-page__button',
            'categories',
            'Artist Quiz',
            'artist'
        ).render();
        this.picturesQuizButton = new ButtonLink(
            'text text_color_white button main-page__button',
            'categories',
            'Pictures Quiz',
            'pictures'
        ).render();
        this.buttonsContainer = new Component('div', `${id}__buttons`).render();
        // console.log(this.buttonsContainer);
        this.buttonsContainer.append(
            this.artistQuizButton,
            this.picturesQuizButton
        );
        this.content.append(
            this.settingsButton,
            this.logoApp,
            this.buttonsContainer
        );
        this.preloaderContainer = new Component('div', 'preloader').render();
        this.preloader = new Component('span', 'icon icon-preloader').render();
        this.preloaderContainer.append(this.preloader);
        this.container.append(this.wrapper, this.preloaderContainer);
    }

    render() {
        return this.container;
    }

    static preloader() {
        window.onload = () => {
            document.body.classList.add('loaded_hiding');

            setTimeout(() => {
                document.body.classList.add('loaded');
                document.body.classList.remove('loaded_hiding');
            }, 1000);
        };
    }
}

export default MainPage;
