import noUiSlider from 'nouislider/dist/nouislider.js';
import Page from '../core/abstract/page';
import Button from '../core/components/button';
import ButtonLink from '../core/components/button-link';
import Checkbox from '../core/components/checkbox';
import SearchingField from '../core/components/searching-field';
import Text from '../core/components/text';
import BEMWrapper from '../core/templates/bem-wrapper';
import Component from '../core/templates/component';
import { ICard } from '../models/card';

class ToysPage extends Page {
  protected root;

  protected settingsContainer;

  constructor(readonly id: string) {
    super(id);
    this.root = document.querySelector('#root') as HTMLDivElement;
    this.settingsContainer = this.createSettingsContainer();
  }

  render(initToysArray: ICard[]): void {
    // creating main
    const mainWrapper = new BEMWrapper('main', this.id).render();
    const mainContent = mainWrapper.querySelector(
      `.${this.id}__content`
    ) as HTMLDivElement;

    const cardsContainer = new Component(
      'section',
      `${this.id}-cards`
    ).render() as HTMLDivElement;

    const cardsHeading = new Text(
      'h1',
      `heading ${this.id}__heading toys-heading`,
      'игрушки'
    ).render();

    const cardsList = ToysPage.cardsGenerator(initToysArray);

    cardsContainer.append(cardsHeading, cardsList);

    mainContent.append(this.settingsContainer, cardsContainer);

    const footerWrapper = new BEMWrapper('footer', 'footer').render();
    const footerContent = footerWrapper.querySelector(
      '.footer__content'
    ) as HTMLDivElement;

    const copyright = new Text(
      'span',
      'text footer__text',
      '2021 \u00A9'
    ).render();
    const author = new ButtonLink(
      'text footer__author',
      true,
      'https://github.com/Ilya758',
      'app developer: illia skaryna'
    ).render();
    const logoSchool = new ButtonLink(
      'icon footer__logo',
      true,
      'https://rs.school',
      '1'
    ).render();

    footerContent.append(author, copyright, logoSchool);
    this.root.append(mainWrapper, footerWrapper);
  }

  createSettingsContainer(): HTMLDivElement {
    const container = new Component(
      'section',
      `${this.id}-settings`
    ).render() as HTMLDivElement;

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
    const searchingFieldContainer = new Component(
      'div',
      `${this.id}__searching-field-container`
    ).render();
    const searchingField = new SearchingField(
      `text ${this.id}__searching-field`,
      'text',
      'searching-field'
    ).render();

    searchingFieldContainer.append(searchingField);

    topButtonsContainer.append(
      soundButton,
      snowflakeButton,
      searchingFieldContainer
    );
    // create sortingContainer
    const sortingContainer = new Component(
      'div',
      `${this.id}__sorting-container`
    ).render();
    const sortingHeading = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'сортировать'
    ).render();
    const sortingWrapper = new Component(
      'div',
      `${this.id}__sorting-wrapper`
    ).render();
    const sortingList = new Component(
      'select',
      `text ${this.id}__select`
    ).render() as HTMLSelectElement;
    sortingList.name = 'sorting';
    let sortingItem;
    const sortingOptions = [
      ['По возрастанию от А до Я', 'ascendingAlp'],
      ['По убыванию от Я до А', 'descendingAlp'],
      ['По количеству по возрастанию', 'ascendingCount'],
      ['По количеству по убыванию', 'descendingCount'],
    ];

    for (let i = 0; i < 4; i += 1) {
      const text = sortingOptions[i][0];
      const sortOpt = sortingOptions[i][1];

      sortingItem = new Component(
        'option',
        `text ${this.id}__option`
      ).render() as HTMLOptionElement;
      sortingItem.value = sortOpt;
      sortingItem.textContent = text;
      sortingList.append(sortingItem);
    }

    sortingWrapper.append(sortingList);
    sortingContainer.append(sortingHeading, sortingWrapper);
    // create categoriesContainer
    const categoriesContainer = new Component(
      'div',
      `${this.id}__categories-container`
    ).render();
    const categoriesHeading = new Text(
      'h2',
      `heading ${this.id}__heading`,
      'категории'
    ).render();

    const categoriesLabel = new Component(
      'label',
      `${this.id}__label`
    ).render();

    const categoriesCheckbox = new Checkbox(
      `checkbox ${this.id}__checkbox`,
      'checkbox',
      'categories'
    ).render();

    const categoriesText = new Text(
      'span',
      `text ${this.id}__text label-text`,
      'все'
    ).render();

    categoriesLabel.append(categoriesCheckbox, categoriesText);
    categoriesContainer.append(categoriesHeading, categoriesLabel);
    // create shapesContainer
    const shapeContainer = new Component(
      'div',
      `${this.id}__shape-container`
    ).render();
    const shapeHeading = new Text(
      'h3',
      `text ${this.id}__text shape-heading`,
      'форма'
    ).render();
    const shapeList = new Component(
      'ul',
      `list ${this.id}__shape-list`
    ).render();

    const shapes = [
      {
        name: 'колокол',
        pic: 'bell',
      },
      {
        name: 'шар',
        pic: 'ball',
      },
      {
        name: 'шишка',
        pic: 'pine',
      },
      {
        name: 'звезда',
        pic: 'star',
      },
      {
        name: 'снежинка',
        pic: 'snowflake',
      },
      {
        name: 'фигурка',
        pic: 'bird-toy',
      },
    ];

    for (let i = 0; i < 6; i += 1) {
      const shapeItem = new Component(
        'li',
        `item ${this.id}__shape-item`
      ).render();
      const shapeText = new Text(
        'span',
        `text ${this.id}__shape-text`,
        shapes[i].name
      ).render();
      const shapePic = new Button(
        `button icon icon-${shapes[i].pic} ${this.id}__shape-button`,
        'button',
        shapes[i].name
      ).render();

      shapeItem.append(shapePic, shapeText);
      shapeList.append(shapeItem);
    }

    shapeContainer.append(shapeHeading, shapeList);
    // create range sliders

    const rangeSlidersContainer = new Component(
      'div',
      `${this.id}__sliders-container`
    ).render();

    const topRangeContainer = new Component(
      'div',
      `${this.id}__sliders-top`
    ).render();
    const topRangeHeading = new Text(
      'h3',
      `text ${this.id}__text range-heading`,
      'Количество экземпляров'
    ).render();
    const topRange = new Component('div', `${this.id}__top-slider`).render();
    const lowTopText = new Text(
      'span',
      `text ${this.id}__text low-range-text`,
      '1940'
    ).render();
    const highTopText = new Text(
      'span',
      `text ${this.id}__text high-range-text`,
      '2021'
    ).render();

    topRangeContainer.append(
      topRangeHeading,
      topRange,
      lowTopText,
      highTopText
    );

    const bottomRangeContainer = new Component(
      'div',
      `${this.id}__sliders-bottom`
    ).render();
    const bottomRangeHeading = new Text(
      'h3',
      `text ${this.id}__text range-heading`,
      'Год приобретения'
    ).render();
    const bottomRange = new Component(
      'div',
      `${this.id}__bottom-slider`
    ).render();
    const lowBottomText = new Text(
      'span',
      `text ${this.id}__text low-range-text`,
      '1940'
    ).render();
    const highBottomText = new Text(
      'span',
      `text ${this.id}__text high-range-text`,
      '2021'
    ).render();

    topRangeContainer.append(
      topRangeHeading,
      topRange,
      lowTopText,
      highTopText
    );

    bottomRangeContainer.append(
      bottomRangeHeading,
      bottomRange,
      lowBottomText,
      highBottomText
    );
    rangeSlidersContainer.append(topRangeContainer, bottomRangeContainer);
    // create color ontainer
    const colorContainer = new Component(
      'div',
      `${this.id}__color-container`
    ).render();
    const colorHeading = new Text(
      'h3',
      `text ${this.id}__text color-heading`,
      'цвет'
    ).render();

    const colorList = new Component(
      'ul',
      `list ${this.id}__color-list`
    ).render();
    const colors = ['white', 'yellow', 'red', 'blue', 'green'];

    for (let i = 0; i <= 4; i += 1) {
      const item = new Component('li', `item ${this.id}__color-item`).render();
      const label = new Component(
        'label',
        `${this.id}__color-label label-${colors[i]}`
      ).render();
      const checkbox = new Checkbox(
        `checkbox ${this.id}__color-checkbox`,
        'checkbox',
        colors[i]
      ).render();
      const span = new Text('span', 'empty-text', '').render();

      label.append(checkbox, span);
      item.append(label);
      colorList.append(item);
    }

    colorContainer.append(colorHeading, colorList);
    // create size container
    const sizeContainer = new Component(
      'div',
      `${this.id}__size-container`
    ).render();
    const sizeHeading = new Text(
      'h3',
      `text ${this.id}__text size-heading`,
      'размер'
    ).render();
    const sizes = ['большой', 'средний', 'маленький'];
    const sizesList = new Component(
      'ul',
      `list ${this.id}__sizes-list`
    ).render();

    for (let i = 0; i <= 2; i += 1) {
      const item = new Component('li', `item ${this.id}__sizes-item`).render();
      const label = new Component('label', `${this.id}__sizes-label`).render();
      const checkbox = new Checkbox(
        `checkbox ${this.id}__sizes-checkbox`,
        'checkbox',
        sizes[i]
      ).render();
      const span = new Text(
        'span',
        `text ${this.id}__text label-text sizes-label`,
        sizes[i]
      ).render();

      label.append(checkbox, span);
      item.append(label);
      sizesList.append(item);
    }

    sizeContainer.append(sizeHeading, sizesList);
    // creare favorite container
    const favoriteContainer = new Component(
      'div',
      `${this.id}__favorite-container`
    ).render();

    const favoriteLabel = new Component(
      'label',
      `${this.id}__sizes-label`
    ).render();
    const favoriteCheckbox = new Checkbox(
      `checkbox ${this.id}__sizes-checkbox`,
      'checkbox',
      'да'
    ).render();
    const favoriteSpan = new Text(
      'span',
      `text ${this.id}__text label-text favorite-label`,
      'Только любимые'
    ).render();

    favoriteLabel.append(favoriteCheckbox, favoriteSpan);
    favoriteContainer.append(favoriteLabel);
    // create reset buttons
    const resetContainer = new Component(
      'div',
      `${this.id}__reset-container`
    ).render();
    const resetFilters = new Button(
      `button text ${this.id}__reset-button reset-filters`,
      'button',
      'reset-filters',
      'Сбросить фильтры'
    ).render();

    const resetSettings = new Button(
      `button text ${this.id}__reset-button reset-settings`,
      'button',
      'reset-settings',
      'Сбросить настройки'
    ).render();

    resetContainer.append(resetFilters, resetSettings);

    container.append(
      topButtonsContainer,
      sortingContainer,
      categoriesContainer,
      shapeContainer,
      rangeSlidersContainer,
      colorContainer,
      sizeContainer,
      favoriteContainer,
      resetContainer
    );

    return container;
  }

  createSlider(): void {
    const topSlider = this.root.querySelector(
      `.${this.id}__top-slider`
    ) as HTMLDivElement;
    const bottomSlider = this.root.querySelector(
      `.${this.id}__bottom-slider`
    ) as HTMLDivElement;

    noUiSlider.create(topSlider, {
      start: [0, 100],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    });

    noUiSlider.create(bottomSlider, {
      start: [0, 100],
      connect: true,
      range: {
        min: 0,
        max: 71,
      },
    });
  }

  protected static cardsGenerator(initToysArray: ICard[]) {
    const list = new Component('ul', 'list cards__list').render();
    const toysCount = initToysArray.length;

    for (let i = 0; i < toysCount; i += 1) {
      const item = new Component('li', 'item cards__item').render();
      const heading = new Text(
        'h2',
        'heading cards__heading',
        `${initToysArray[i].name}`
      ).render();

      const img = new Component(
        'img',
        'cards__img'
      ).render() as HTMLImageElement;
      img.src = `./assets/img/toys/${initToysArray[i].num}.png`;
      img.alt = `${initToysArray[i].name}`;

      const count = new Text(
        'h2',
        'text cards__text',
        `Количество: ${initToysArray[i].count}`
      ).render();
      const year = new Text(
        'h2',
        'text cards__text',
        `Год покупки: ${initToysArray[i].year} год`
      ).render();
      const shape = new Text(
        'h2',
        'text cards__text',
        `Форма игрушки: ${initToysArray[i].shape}`
      ).render();
      const color = new Text(
        'h2',
        'text cards__text',
        `Цвет игрушки: ${initToysArray[i].color}`
      ).render();
      const size = new Text(
        'h2',
        'text cards__text',
        `Размер игрушки: ${initToysArray[i].size}`
      ).render();
      const favorite = new Text(
        'h2',
        'text cards__text',
        `Любимая: ${initToysArray[i].favorite ? 'да' : 'нет'}`
      ).render();

      item.append(heading, img, count, year, shape, color, size, favorite);
      list.append(item);
    }

    return list;
  }

  bindSorting(handler: (sortOpt: string, method: string) => ICard[]) {
    const sortContainer = this.root.querySelector('.toys-page__select');
    sortContainer?.addEventListener('change', event => {
      const option = event.target as HTMLOptionElement;
      const method = 'sorting';
      const sortOpt = option.value;
      const arrayOfToys = handler(sortOpt, method);
      const cardsSection = document.querySelector(
        '.toys-page-cards'
      ) as HTMLElement;
      const cardsList = document.querySelector(
        '.cards__list'
      ) as HTMLUListElement;
      cardsList.remove();

      cardsSection.append(ToysPage.cardsGenerator(arrayOfToys));
    });
  }
}

export default ToysPage;