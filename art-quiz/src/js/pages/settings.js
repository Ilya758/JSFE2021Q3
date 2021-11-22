import ComponentWrapper from '../core/templates/component-wrapper';
import Page from '../core/templates/page';
import ButtonLink from '../core/components/button-link';
import Component from '../core/templates/component';
import Text from '../core/components/text';
import Button from '../core/components/button';
import VolumeSlider from '../core/components/volume-slider';
import VolumeToggler from '../core/components/volume-toggler';

class Settings extends Page {
    constructor(id, ...rest) {
        super(id);
        this.wrapper = new ComponentWrapper('main', id).render();
        this.content = this.wrapper.querySelector('.settings__content');
        this.mainButtonContainer = new Component(
            'div',
            'settings__exit-container'
        ).render();
        this.leftExitButton = new ButtonLink(
            'icon icon-left-arrow-exit',
            'main-page'
        ).render();
        this.settingsText = new Text(
            'span',
            'text settings__text text_color_white',
            'Settings'
        ).render();
        this.rightExitButton = new ButtonLink(
            'icon icon-cross-exit',
            'main-page'
        ).render();
        this.mainButtonContainer.append(
            this.leftExitButton,
            this.settingsText,
            this.rightExitButton
        );
        this.volumeContainer = new Component(
            'div',
            `${id}-volume__container`
        ).render();
        ['volume', 'time game', 'time to answer'].forEach(el => {
            function upperText(word) {
                return `${word[0].toUpperCase()}${word.slice(1)}`;
            }
            const text = upperText(el);
            const prop = el
                .split(' ')
                .map((elem, ndx) => {
                    let word;
                    if (ndx > 0) {
                        word = upperText(elem);
                    }
                    return word || elem;
                })
                .join('');
            this[`${prop}Heading`] = new Text(
                'h3',
                'text heading__text text_color_white',
                text
            ).render();
            return el;
        });
        this.volumeSlider = new VolumeSlider(
            'input',
            `${id}-volume__slider`
        ).render();
        this.volumeButtonsContainer = new Component(
            'div',
            `${id}-volume__buttons-container`
        ).render();
        [
            ['muteButton', 'mute'],
            ['soundButton', 'sound'],
        ].map(el => {
            this[el[0]] = new Button(
                `icon icon-${el[1]}`,
                'button',
                el[1]
            ).render();
            return el;
        });
        this.volumeButtonsContainer.append(this.muteButton, this.soundButton);
        this.volumeContainer.append(
            this.volumeHeading,
            this.volumeSlider,
            this.volumeButtonsContainer
        );
        this.timeGameContainer = new Component(
            'div',
            `${id}-time__container`
        ).render();
        this.timeGameText = new Text(
            'span',
            'text settings__text text_color_white',
            'On'
        ).render();
        this.volumeToggler = new VolumeToggler().render();
        this.timeGameContainer.append(
            this.timeGameHeading,
            this.timeGameText,
            this.volumeToggler
        );
        this.timeToAnswerContainer = new Component(
            'div',
            `${id}-game__duration-container`
        ).render();
        [
            ['timeButtonSub', 'sub'],
            ['timeButtonAdd', 'add'],
        ].map(el => {
            this[el[0]] = new Button(
                `icon icon-${el[1]}`,
                'button',
                el[1]
            ).render();
            return el;
        });
        this.timeCounter = new Text(
            'span',
            'text settings__text text_color_white',
            rest[3].timeOut
        ).render();
        this.timeButtonsContainer = new Component(
            'div',
            `${id}-duration__container`
        ).render();
        this.defaultButton = new ButtonLink(
            'text text_color_white button button_bcg_initial',
            'main-page',
            'Default',
            'default'
        ).render();
        this.defaultButton.textContent = 'Default';
        this.saveButton = new ButtonLink(
            'text text_color_white button',
            'main-page',
            'Save',
            'save'
        ).render();
        this.changeButtonsContainer = new Component(
            'div',
            `${id}-change__buttons-container`
        ).render();
        this.changeButtonsContainer.append(this.defaultButton, this.saveButton);
        this.timeButtonsContainer.append(
            this.timeButtonSub,
            this.timeCounter,
            this.timeButtonAdd
        );
        this.timeToAnswerContainer.append(
            this.timeToAnswerHeading,
            this.timeButtonsContainer
        );
        this.content.append(
            this.mainButtonContainer,
            this.volumeContainer,
            this.timeGameContainer,
            this.timeToAnswerContainer,
            this.changeButtonsContainer
        );
        document.querySelector('#root').classList.remove('fade');
        this.container.append(this.wrapper);
    }

    static exitToMainPage() {
        const leftExitButton = document.querySelector('.icon-left-arrow-exit');
        const rightExitButton = document.querySelector('.icon-cross-exit');
        const defaultButton = document.querySelector('a[data-role="default"]');
        const saveButton = document.querySelector('a[data-role="save"]');

        [leftExitButton, rightExitButton, defaultButton, saveButton].forEach(
            btn => {
                btn.addEventListener('click', () => {
                    document.querySelector('#root').classList.add('fade');
                });
            }
        );
    }
}

export default Settings;
