import Page from '../core/abstract/page';
import Button from '../core/components/button';
import HarlandToggle from '../core/components/harland-toggle';
import Text from '../core/components/text';
import BEMWrapper from '../core/templates/bem-wrapper';
import Component from '../core/templates/component';

class DecoratePage extends Page {
  protected root;

  constructor(readonly id: string) {
    super(id);
    this.root = document.querySelector('#root') as HTMLDivElement;
  }

  render(): void {
    // creating main
    // const mainWrapper = new BEMWrapper('main', this.id).render();
    const mainWrapper = new Component('main', this.id).render();
    const settingsSection = this.createSettingsSection();
    const treeSection = this.createTreeSection();
    const toysSection = this.createToysSection();

    mainWrapper.append(settingsSection, treeSection, toysSection);
    this.root.prepend(mainWrapper);
  }

  createSettingsSection() {
    const wrapper = new BEMWrapper('section', `${this.id}-settings`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-settings__content`
    ) as HTMLDivElement;
    // create topButtonsContainer
    const topButtonsContainer = new Component(
      'div',
      `${this.id}__top-container`
    ).render();
    const soundButton = new Button(
      `button icon ${this.id}__button icon-sound`,
      'button',
      'sound'
    ).render();
    const snowflakeButton = new Button(
      `button icon ${this.id}__button icon-snow`,
      'button',
      'snow'
    ).render();

    topButtonsContainer.append(soundButton, snowflakeButton);
    // create treesContainer
    const treesContainer = new Component(
      'div',
      `${this.id}__trees-container`
    ).render();
    const treesText = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'выберите ёлку'
    ).render();

    const generateTrees = () => {
      const list = new Component('ul', `list ${this.id}__trees-list`).render();

      for (let i = 1; i < 5; i += 1) {
        const item = new Component('li', `${this.id}__trees-item`).render();
        const img = new Component(
          'img',
          `${this.id}__trees-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/tree/${i}.png`;
        img.alt = `Tree ${i}`;
        item.append(img);
        list.append(item);
      }

      return list;
    };

    const trees = generateTrees();

    treesContainer.append(treesText, trees);
    // create bcgTreesList
    const bcgListContainer = new Component(
      'div',
      `${this.id}__bcgs-container`
    ).render();
    const bcgText = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'выберите фон'
    ).render();

    const generateBcgs = () => {
      const list = new Component('ul', `list ${this.id}__bcgs-list`).render();

      for (let i = 1; i < 9; i += 1) {
        const item = new Component('li', `${this.id}__bcgs-item`).render();
        const img = new Component(
          'img',
          `${this.id}__bcgs-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/bg/${i}.jpg`;
        img.alt = `Background ${i}`;
        item.append(img);
        list.append(item);
      }

      return list;
    };

    const backgrounds = generateBcgs();

    bcgListContainer.append(bcgText, backgrounds);
    // create harlandContainer
    const harlandContainer = new Component(
      'div',
      `${this.id}__harlands-container`
    ).render();
    const harlandText = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'гирлянда'
    ).render();

    const createHarlandList = () => {
      const list = new Component(
        'ul',
        `list ${this.id}__harlands-list`
      ).render();

      ['mix', 'red', 'blue', 'yellow', 'green'].forEach(color => {
        const item = new Component('li', `${this.id}__harlands-item`).render();
        const btn = new Button(
          `button harlands ${this.id}__harlands-${color}`,
          'button',
          color,
          ''
        ).render();
        item.append(btn);
        list.append(item);
      });

      return list;
    };

    const harlandList = createHarlandList();
    // const toggleHarlandButtonContainer
    const toggleButton = new HarlandToggle('harland-toggle', 'toggle').render();

    harlandContainer.append(harlandText, harlandList, toggleButton);
    // create bottomButtons
    const bottomButtonsContainer = new Component(
      'div',
      `${this.id}__bottom-container`
    ).render();

    const saveButton = new Button(
      `button text ${this.id}__bottom-button`,
      'button',
      'reset-filters',
      'Сохранить'
    ).render();

    const resetSettings = new Button(
      `button text ${this.id}__bottom-button`,
      'button',
      'reset-settings',
      'Сбросить настройки'
    ).render();

    bottomButtonsContainer.append(saveButton, resetSettings);

    wrapperContent.append(
      topButtonsContainer,
      treesContainer,
      bcgListContainer,
      harlandContainer,
      bottomButtonsContainer
    );

    return wrapper;
  }

  createTreeSection() {
    const wrapper = new BEMWrapper('section', `${this.id}-tree`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-tree__content`
    ) as HTMLDivElement;
    const tree = new Component(
      'img',
      `${this.id}-tree__img`
    ).render() as HTMLImageElement;
    tree.src = './assets/img/tree/1.png';
    tree.alt = 'Tree';

    wrapperContent.append(tree);
    return wrapper;
  }

  createToysSection() {
    const wrapper = new BEMWrapper('section', `${this.id}-toys`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-toys__content`
    ) as HTMLDivElement;
    // create toysContainer
    const toysContainer = new Component(
      'div',
      `${this.id}-toys__container`
    ).render();
    const toysHeading = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'игрушки'
    ).render();

    const createToysList = () => {
      const list = new Component('ul', `list ${this.id}-toys__list`).render();

      for (let i = 1; i < 21; i += 1) {
        const item = new Component('li', `${this.id}-toys__item`).render();
        const img = new Component(
          'img',
          `${this.id}-toys__img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/toys/${i}.png`;
        img.alt = `Tree ${i}`;
        const txt = new Text(
          'span',
          `text ${this.id}-toys__text`,
          '1'
        ).render();
        item.append(img, txt);
        list.append(item);
      }

      return list;
    };

    const toysList = createToysList();
    toysContainer.append(toysHeading, toysList);
    // create decoratedTreesContainer
    const decoratedTreesContainer = new Component(
      'div',
      `${this.id}-toys__decorated-container`
    ).render();
    const decoratedHeading = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'вы нарядили'
    ).render();

    const createDecoratedList = () => {
      const list = new Component(
        'ul',
        `list ${this.id}-toys__decorated-list`
      ).render();

      for (let i = 1; i < 5; i += 1) {
        const item = new Component(
          'li',
          `${this.id}-toys__decorated-item`
        ).render();
        const img = new Component(
          'img',
          `${this.id}-toys__decorated-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/tree/${i}.png`;
        img.alt = `Tree ${i}`;
        item.append(img);
        list.append(item);
      }

      return list;
    };

    const decoratedList = createDecoratedList();

    decoratedTreesContainer.append(decoratedHeading, decoratedList);
    wrapperContent.append(toysContainer, decoratedTreesContainer);
    return wrapper;
  }
}

export default DecoratePage;
