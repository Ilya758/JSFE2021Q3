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
        this.artistQuizButton = new ButtonLink(
            'text text_color_white',
            'categories',
            'Artist Quiz',
            'artists'
        ).render();
        this.picturesQuizButton = new ButtonLink(
            'text text_color_white',
            'categories',
            'Pictures Quiz',
            'pictures'
        ).render();
        this.buttonsContainer = new Component('div', `${id}__buttons`).render();
        console.log(this.buttonsContainer);
        this.buttonsContainer.append(
            this.artistQuizButton,
            this.picturesQuizButton
        );
        this.content.append(
            this.settingsButton,
            this.logoApp,
            this.buttonsContainer
        );
        this.container.append(this.wrapper);
    }

    render() {
        return this.container;
    }
}

export default MainPage;
