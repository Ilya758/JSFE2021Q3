import Modal from '../templates/modal';
import Text from '../components/text';
import Component from '../templates/component';
import ButtonLink from './button-link';
import Button from './button';

class ModalScore extends Modal {
    static CLASS = 'modal-score';

    constructor(categories) {
        super(ModalScore.CLASS);

        this.categories = categories;

        this.content = this.wrapper.querySelector(
            `.${ModalScore.CLASS}__content`
        );

        this.exitButton = new Button(
            'icon icon-cross-exit icon_bcg_dark',
            'button',
            'categories'
        ).render();

        this.heading = new Text(
            'h2',
            'text text_color_dark modal-score__heading',
            'Choose your category'
        ).render();

        this.categoriesList = this.generateCategoriesList();
        this.content.append(this.exitButton, this.heading, this.categoriesList);
    }

    generateCategoriesList() {
        const list = new Component('ul', 'list modal-score__list').render();

        for (let i = 0; i < 12; i += 1) {
            const item = new Component('li', 'item modal-score__item').render();
            const link = new ButtonLink(
                'text text_color_dark modal-score__text',
                'score',
                `${this.categories[i][0].toUpperCase()}${this.categories[
                    i
                ].slice(1)}`,
                this.categories[i]
            ).render();
            item.append(link);
            list.append(item);
        }

        return list;
    }
}

export default ModalScore;
