import Component from '../core/templates/component';
import ComponentWrapper from '../core/templates/component-wrapper';
import MainPage from '../pages/main';

class View {
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
    }

    render(NewPage = MainPage, id = 'main-page') {
        if (document.querySelector(`#${id}`)) {
            document.querySelector(`#${id}`).remove();
        }
        const newPage = new NewPage(id);
        this.root.prepend(newPage.render());
    }
}

export default View;
