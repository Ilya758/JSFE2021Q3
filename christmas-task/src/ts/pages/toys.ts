import * as noUiSlider from 'nouislider';
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

    const mainPageLink = new ButtonLink(
      `heading ${this.id}__heading toys-heading`,
      false,
      '',
      'Возврат на главную страницу'
    ).render();
    const favoriteCountContainer = new Component(
      'div',
      'favorite-container'
    ).render();
    const favoriteCount = new Text(
      'span',
      'heading toys-page__heading',
      '0'
    ).render();

    favoriteCountContainer.append(favoriteCount);

    const cardsList = ToysPage.cardsGenerator(initToysArray);

    cardsContainer.append(
      cardsHeading,
      mainPageLink,
      favoriteCountContainer,
      cardsList
    );

    mainContent.append(this.settingsContainer, cardsContainer);
    this.root.prepend(mainWrapper);
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
    const quitButton = new Button(
      'button icon icon-quit',
      'button',
      ''
    ).render();

    searchingFieldContainer.append(quitButton, searchingField);

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
      `${this.id}__label categories-label`
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
        name: 'снежинка',
        pic: 'snowflake',
      },
      {
        name: 'фигурка',
        pic: 'bird-toy',
      },
    ];

    for (let i = 0; i < 5; i += 1) {
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
        shapes[i].pic
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
      '1'
    ).render();
    const highTopText = new Text(
      'span',
      `text ${this.id}__text high-range-text`,
      '12'
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
      '2020'
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
    const colors = ['white', 'yellow', 'red', 'green', 'blue'];

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
    const sizes = [
      ['large', 'большой'],
      ['medium', 'средний'],
      ['small', 'маленький'],
    ];
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
        sizes[i][0]
      ).render();
      const span = new Text(
        'span',
        `text ${this.id}__text label-text sizes-label`,
        sizes[i][1]
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
      `checkbox ${this.id}__favorite-checkbox`,
      'checkbox',
      'favorite'
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

    resetContainer.append(resetFilters);

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

  bindCreateSlider(
    handler: (sortOpt: string | string[], method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const topSlider = this.root.querySelector(
      `.${this.id}__top-slider`
    ) as HTMLDivElement;
    const bottomSlider = this.root.querySelector(
      `.${this.id}__bottom-slider`
    ) as HTMLDivElement;

    noUiSlider.create(topSlider, {
      start: [1, 12],
      connect: true,
      animate: true,
      animationDuration: 1000,
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
    });

    noUiSlider.create(bottomSlider, {
      start: [1940, 2020],
      connect: true,
      animate: true,
      animationDuration: 1000,
      step: 10,
      range: {
        min: 1940,
        max: 2020,
      },
    });

    (topSlider as noUiSlider.target).noUiSlider?.on('end', event => {
      const method = 'count';
      const values = [`${+event[0]}`, `${+event[1]}`];

      ['low', 'high'].forEach((txt, ndx) => {
        const text = this.root.querySelector(
          `.${txt}-range-text`
        ) as HTMLSpanElement;
        text.textContent = values[ndx];
      });

      const arrayOfToys = handler(values, method);
      ToysPage.reRenderCardsList(arrayOfToys);
      restore();
    });

    (bottomSlider as noUiSlider.target).noUiSlider?.on('end', event => {
      const method = 'year';
      const values = [`${+event[0]}`, `${+event[1]}`];
      const bottomContainer = this.root.querySelector(
        '.toys-page__sliders-bottom'
      ) as HTMLDivElement;

      ['low', 'high'].forEach((txt, ndx) => {
        const text = bottomContainer.querySelector(
          `.${txt}-range-text`
        ) as HTMLSpanElement;
        text.textContent = values[ndx];
      });
      const arrayOfToys = handler(values, method);
      ToysPage.reRenderCardsList(arrayOfToys);
      restore();
    });
  }

  protected static cardsGenerator(initToysArray: ICard[]) {
    const list = new Component('ul', 'list cards__list').render();
    const toysCount = initToysArray.length;
    const clsState = 'cards_state';

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
      item.id = initToysArray[i].num;

      item.append(heading, img, count, year, shape, color, size, favorite);
      list.append(item);
    }

    if (!toysCount) {
      const text = new Text(
        'h3',
        'heading toys-page__heading',
        'Извините, совпадений не обнаружено'
      ).render();
      list.append(text);
      text.classList.add('text_state_blinking');
      list.classList.add('list_scroll_disabled');
    }

    list.classList.add(`${clsState}_appear`);
    setTimeout(() => {
      list.classList.add(`${clsState}_active`);
    }, 1000);
    return list;
  }

  bindSorting(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const sortContainer = this.root.querySelector('.toys-page__select');
    sortContainer?.addEventListener('change', event => {
      const option = event.target as HTMLOptionElement;
      const method = 'sorting';
      const sortOpt = option.value;
      const arrayOfToys = handler(sortOpt, method);
      sortContainer.classList.toggle('select_state_active');
      setTimeout(() => {
        sortContainer.classList.toggle('select_state_active');
      }, 200);
      ToysPage.reRenderCardsList(arrayOfToys);
      restore();
    });
  }

  static reRenderCardsList(arrayOfToys: ICard[]) {
    const cardsSection = document.querySelector(
      '.toys-page-cards'
    ) as HTMLElement;
    const cardsList = document.querySelector(
      '.cards__list'
    ) as HTMLUListElement;
    cardsList.remove();
    cardsSection.append(ToysPage.cardsGenerator(arrayOfToys));

    return document.querySelector('.cards__list');
  }

  bindShapeFiltrate(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const shapeList = this.root.querySelector('.toys-page__shape-list');

    shapeList?.addEventListener('click', event => {
      const method = 'shape';
      const figure = event.target as HTMLElement;
      let value = '';

      if (figure.tagName === 'LI') {
        value = (figure.children[0] as HTMLButtonElement).dataset.role || '';
      }

      if (figure.tagName === 'SPAN') {
        value =
          (figure.previousElementSibling as HTMLElement).dataset.role || '';
      }

      if (figure.tagName === 'BUTTON') {
        value = (figure as HTMLButtonElement).dataset.role || '';
      }

      const item = figure.closest('li') as HTMLLIElement;

      if (item?.tagName === 'LI') {
        const [icon, text] = item.children;
        [
          [item, 'item'],
          [icon, 'icon'],
          [text, 'text'],
        ].forEach(elem => {
          const el = elem[0];
          const selector = elem[1] as string;
          (el as HTMLElement).classList.toggle(`${selector}_state_active`);
        });
      }

      const arrayOfToys = handler(value, method);
      ToysPage.reRenderCardsList(arrayOfToys);
      restore();
    });
  }

  bindColorFiltrate(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const colorList = this.root.querySelector('.toys-page__color-list');

    colorList?.addEventListener('click', event => {
      const method = 'color';
      const color = event.target as HTMLElement;
      let value = '';

      if (color.tagName === 'LABEL' || color.tagName === 'SPAN') {
        value =
          color.tagName === 'LABEL'
            ? (color.firstChild as HTMLInputElement).dataset.role || ''
            : (color.previousElementSibling as HTMLInputElement).dataset.role ||
              '';
        const arrayOfToys = handler(value, method);
        const label = color.closest('label') as HTMLLabelElement;
        label.classList.toggle('label_state_active');

        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });
  }

  bindSizeFiltrate(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const sizesList = this.root.querySelector('.toys-page__sizes-list');

    sizesList?.addEventListener('click', event => {
      const method = 'size';
      const size = event.target as HTMLElement;
      let value = '';
      if (size.tagName === 'LABEL' || size.tagName === 'SPAN') {
        value =
          size.tagName === 'LABEL'
            ? (size.firstChild as HTMLInputElement).dataset.role || ''
            : (size.previousElementSibling as HTMLInputElement).dataset.role ||
              '';
        const arrayOfToys = handler(value, method);
        const label = size.closest('label') as HTMLLabelElement;

        if (label?.tagName === 'LABEL') {
          const [icon, text] = label.children;
          [
            [label, 'item'],
            [icon, 'button'],
            [text, 'text'],
          ].forEach(ele => {
            const el = ele[0];
            const selector = ele[1] as string;
            (el as HTMLElement).classList.toggle(`${selector}_state_active`);
          });
        }
        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });
  }

  bindFavoriteFiltrate(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const favoriteContainer = this.root.querySelector(
      '.toys-page__favorite-container'
    );

    favoriteContainer?.addEventListener('click', event => {
      const method = 'favorite';
      const elem = event.target as HTMLElement;
      let value = '';
      if (elem.tagName === 'LABEL' || elem.tagName === 'SPAN') {
        value =
          elem.tagName === 'LABEL'
            ? (elem.firstChild as HTMLInputElement).dataset.role || ''
            : (elem.previousElementSibling as HTMLInputElement).dataset.role ||
              '';
        const arrayOfToys = handler(value, method);
        const label = elem.closest('label') as HTMLLabelElement;

        if (label?.tagName === 'LABEL') {
          const [icon, text] = label.children;
          [
            [label, 'label'],
            [icon, 'button'],
            [text, 'text'],
          ].forEach(ele => {
            const el = ele[0];
            const selector = ele[1] as string;
            (el as HTMLElement).classList.toggle(`${selector}_state_active`);
          });
        }
        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });
  }

  bindAllCategoriesFiltrate(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const allCategoriesContainer = this.root.querySelector(
      '.toys-page__categories-container'
    );

    allCategoriesContainer?.addEventListener('click', event => {
      const method = 'allCategories';
      const elem = event.target as HTMLElement;
      let value = '';
      if (elem.tagName === 'LABEL' || elem.tagName === 'SPAN') {
        value =
          elem.tagName === 'LABEL'
            ? (elem.firstChild as HTMLInputElement).dataset.role || ''
            : (elem.previousElementSibling as HTMLInputElement).dataset.role ||
              '';
        const text = (elem.closest('label') as HTMLLabelElement)
          .children[1] as HTMLSpanElement;
        text.classList.toggle('text_state_active');
        const arrayOfToys = handler(value, method);
        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });
  }

  bindResetFilters(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const resetButton = this.root.querySelector(
      '.toys-page__reset-button'
    ) as HTMLButtonElement;

    const topSlider = this.root.querySelector(
      `.${this.id}__top-slider`
    ) as HTMLDivElement;

    const bottomSlider = this.root.querySelector(
      `.${this.id}__bottom-slider`
    ) as HTMLDivElement;

    resetButton?.addEventListener('click', () => {
      const method = 'reset';
      const arrayOfToys = handler('', method);
      resetButton.classList.toggle('button_state_active');
      setTimeout(() => {
        resetButton.classList.toggle('button_state_active');
      }, 200);

      // reset values
      const labelText = this.root.querySelectorAll('.label-text');
      const labels = this.root.querySelectorAll('.toys-page__color-label');
      const checkboxes = this.root.querySelectorAll('input[type="checkbox"]');
      const shapeItem = this.root.querySelectorAll('.toys-page__shape-item');
      const shapes = this.root.querySelectorAll('.toys-page__shape-button');
      const shapesText = this.root.querySelectorAll('.toys-page__shape-text');
      const lowValues = this.root.querySelectorAll('.low-range-text');
      const highValues = this.root.querySelectorAll('.high-range-text');

      const classState = '_state_active';

      labelText.forEach(el => {
        el.classList.remove(`text${classState}`);
      });

      shapeItem.forEach(el => {
        el.classList.remove(`item${classState}`);
      });

      shapes.forEach(el => {
        el.classList.remove(`icon${classState}`);
      });

      shapesText.forEach(el => {
        el.classList.remove(`text${classState}`);
      });

      labels.forEach(el => {
        el.classList.remove(`label${classState}`);
      });

      checkboxes.forEach(checkbox => {
        const check = checkbox as HTMLInputElement;
        check.checked = false;
      });

      (topSlider as noUiSlider.target).noUiSlider?.reset();
      (bottomSlider as noUiSlider.target).noUiSlider?.reset();

      lowValues.forEach((v, ndx) => {
        const value = v as HTMLSpanElement;
        if (ndx === 0) {
          value.textContent = '1'; // lowest value of count
        } else {
          value.textContent = '1940'; // lowest value of year
        }
      });

      highValues.forEach((v, ndx) => {
        const value = v as HTMLSpanElement;
        if (ndx === 0) {
          value.textContent = '12'; // highest value of count
        } else {
          value.textContent = '2020'; // highest value of year
        }
      });

      ToysPage.reRenderCardsList(arrayOfToys);
      restore();
    });
  }

  bindInputValue(
    handler: (sortOpt: string, method: string) => ICard[],
    restore: (page?: ToysPage) => void
  ) {
    const input = this.root.querySelector(
      '.toys-page__searching-field'
    ) as HTMLInputElement;

    input?.addEventListener('input', event => {
      const { value } = event.target as HTMLInputElement;
      const method = 'input';

      if (value.length >= 3 || value === '') {
        const arrayOfToys = handler(value, method);
        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });

    const quitButton = this.root.querySelector('.icon-quit');

    quitButton?.addEventListener('click', () => {
      if (input.value !== '') {
        input.value = '';
        quitButton.classList.toggle('button_state_rotate');
        setTimeout(() => {
          quitButton.classList.toggle('button_state_rotate');
        }, 1000);
        const arrayOfToys = handler('', 'input');
        ToysPage.reRenderCardsList(arrayOfToys);
        restore();
      }
    });
  }

  bindAddChosens(handler: (id: string) => ICard[]) {
    const list = this.root.querySelector('.cards__list');

    list?.addEventListener('click', event => {
      this.handleCardsList(event, handler);
    });
  }

  handleCardsList(event: Event, handler: (id: string) => ICard[]) {
    const text = this.root.querySelector('.favorite-container')
      ?.firstChild as HTMLSpanElement;
    let length = 0;
    const target = event.target as HTMLElement;
    if (target.tagName === 'LI') {
      length = handler(target.id).length;
      text.textContent = `${length}`;
    }

    if (target.tagName === 'H2' || target.tagName === 'IMG') {
      const parent = target.parentElement as HTMLLIElement;
      length = handler(parent.id).length;
      text.textContent = `${length}`;
    }
  }
}

export default ToysPage;
