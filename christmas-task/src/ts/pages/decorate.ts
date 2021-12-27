import Page, { IToysReceived, TRenderMethod } from '../core/abstract/page';
import Button from '../core/components/button';
import ButtonLink from '../core/components/button-link';
import HarlandToggle from '../core/components/harland-toggle';
import Text from '../core/components/text';
import BEMWrapper from '../core/templates/bem-wrapper';
import Component from '../core/templates/component';
import { ICard } from '../models/card';
import { IToyOnTree, IToyChars } from '../models/toyOnTree';

class DecoratePage extends Page {
  protected root;

  constructor(readonly id: string) {
    super(id);
    this.root = document.querySelector('#root') as HTMLDivElement;
  }

  render({
    snowIsFalling,
    activeTree,
    activeBackground,
    garlandColor,
    garlandIsEnabled,
    chosenToys,
    toysOnTreeChars,
    addHandler,
  }: Omit<TRenderMethod, 'id' | 'initToysArray'>): void {
    // creating main
    const mainWrapper = new Component('main', this.id).render();
    const settingsSection = this.createSettingsSection();
    const treeSection = this.createTreeSection(
      snowIsFalling,
      activeTree,
      activeBackground,
      garlandColor,
      garlandIsEnabled,
      toysOnTreeChars,
      addHandler
    );
    const toysSection = this.createToysSection(chosenToys);

    mainWrapper.append(settingsSection, treeSection, toysSection);
    this.root.prepend(mainWrapper);
  }

  createSettingsSection() {
    const wrapper = new BEMWrapper('section', `${this.id}-settings`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-settings__content`
    ) as HTMLDivElement;

    const createAudio = () => {
      const container = new Component(
        'div',
        `${this.id}-settings__audio-container`
      ).render();

      const audio = new Component(
        'audio',
        `${this.id}-settings__audio`
      ).render() as HTMLAudioElement;
      audio.src = './assets/audio/audio.mp3';

      container.append(audio);

      return container;
    };

    const audioContainer = createAudio();

    const mainPageLink = new ButtonLink(
      `heading ${this.id}__heading decorate-link`,
      false,
      '',
      'Возврат на главную страницу'
    ).render();

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
        const button = new Button(
          `button ${this.id}__trees-button`,
          'button',
          `${i}`,
          ''
        ).render();
        const img = new Component(
          'img',
          `${this.id}__trees-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/tree/${i}.png`;
        img.alt = `Tree ${i}`;
        button.append(img);
        item.append(button);
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
        const button = new Button(
          `button ${this.id}__bcgs-button`,
          'button',
          `${i}`
        ).render();
        const img = new Component(
          'img',
          `${this.id}__bcgs-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/bg/${i}.jpg`;
        img.alt = `Background ${i}`;
        button.append(img);
        item.append(button);
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
      mainPageLink,
      audioContainer,
      topButtonsContainer,
      treesContainer,
      bcgListContainer,
      harlandContainer,
      bottomButtonsContainer
    );

    return wrapper;
  }

  createTreeSection(
    snowIsFalling: boolean,
    activeTree: string,
    activeBackground: string,
    garlandColor: string,
    garlandIsEnabled: boolean,
    toysOnTreeChars: IToyOnTree[],
    addHandler: (
      method: string,
      count: string,
      relCoords: { relX: number; relY: number }
    ) => IToysReceived
  ) {
    const wrapper = new BEMWrapper('section', `${this.id}-tree`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-tree__content`
    ) as HTMLDivElement;
    wrapperContent.style.background = `url(./assets/img/bg/${activeBackground}.jpg) 0 0/cover no-repeat`;
    const snowflakeContainer = new Component(
      'div',
      `${this.id}-tree__snowflake-container`
    ).render() as HTMLDivElement;

    const createMap = () => {
      const container = new Component('div', 'map-container').render();
      const imgContainer = new Component('div', 'img-container').render();
      const draggableToys = this.root.querySelectorAll('.list-img');

      if (toysOnTreeChars.length) {
        for (let i = 0; i < toysOnTreeChars.length; i += 1) {
          const img = new Component(
            'img',
            'area-img'
          ).render() as HTMLImageElement;

          const { relY } = toysOnTreeChars[i];
          const { relX } = toysOnTreeChars[i];
          const { num } = toysOnTreeChars[i];

          img.dataset.num = num;
          img.src = `./assets/img/toys/${num}.png`;
          img.draggable = true;
          img.style.cssText = `position: absolute; width: 50px; height: 60px; top: ${relY}px; left: ${relX}px; `;

          imgContainer.append(img);
          const toyChars = {
            toy: img.src,
            num,
          };

          this.dragToysInTree(
            draggableToys,
            img,
            toyChars as IToyChars,
            addHandler,
            { relX, relY }
          );
        }
      }

      const map = new Component('map', '').render() as HTMLMapElement;
      map.name = 'tree-map';
      const area = new Component('area', '').render() as HTMLAreaElement;
      area.coords =
        '8,622,3,659,33,691,119,677,149,710,169,684,226,695,239,687,248,676,261,671,266,668,275,671,269,676,271,686,278,688,289,681,295,695,300,689,305,696,315,700,319,688,331,678,352,675,364,665,371,663,377,662,381,655,389,655,402,664,411,664,422,664,432,663,444,662,471,639,469,625,461,618,454,614,453,605,461,598,479,597,478,582,467,573,445,568,463,564,471,565,463,544,465,522,459,507,446,497,445,486,458,482,446,459,444,448,425,443,414,427,429,425,421,409,440,407,423,396,413,391,413,377,404,363,414,353,400,344,392,341,381,329,381,318,392,307,374,299,366,295,370,262,373,248,373,241,355,233,349,223,339,215,341,199,339,186,329,174,328,160,325,141,319,128,314,119,311,112,297,105,296,83,291,73,280,56,267,40,259,35,251,28,242,22,238,10,237,1,223,2,215,31,208,49,202,58,202,66,207,73,198,85,188,101,186,108,175,122,188,120,190,131,187,139,182,145,166,141,156,168,148,197,153,215,161,222,172,227,150,230,142,230,149,251,144,258,132,250,125,249,137,265,129,274,125,284,132,292,121,293,115,298,106,303,121,310,118,318,113,332,101,338,101,353,121,359,116,364,106,366,97,367,85,368,91,379,96,393,102,401,89,402,80,403,90,411,78,417,74,427,82,434,72,445,68,454,61,467,72,472,47,490,58,500,62,513,45,524,37,535,52,543,46,553,42,566,30,568,19,566,25,577,39,581,57,583,35,589,23,595,19,603,3,607';
      area.shape = 'poly';
      area.style.position = 'relative';
      map.append(area);

      const tree = new Component(
        'img',
        `${this.id}-tree__img`
      ).render() as HTMLImageElement;
      tree.src = `./assets/img/tree/${activeTree}.png`;
      tree.alt = 'Tree';
      tree.useMap = '#tree-map';

      container.append(imgContainer, map, tree);

      return container;
    };

    const mapContainer = createMap();
    if (snowIsFalling) {
      snowflakeContainer.classList.add('snowflakes_state_falling');
    }

    const createGarland = () => {
      const container = new Component('div', 'garland-container').render();

      const CHARS = [
        [62, 60, 14],
        [60, 85, 10],
        [58, 115, 8],
        [54, 150, 7],
        [55, 180, 6],
        [50, 220, 5.5],
        [50, 255, 5],
        [50, 305, 4.5],
      ];

      const GARLAND_COUNT_ITEMS = 8; // amount of garland lightropes
      let endCount = 5; // initial amount of lightrope items

      for (let i = 0; i < GARLAND_COUNT_ITEMS; i += 1) {
        const list = new Component('ul', 'list garland-list').render();
        let rotateDeg = CHARS[i][0];
        const TRANSLATE_PX = CHARS[i][1];
        const CURRENT_ADD_COUNT = CHARS[i][2];

        for (let j = 0; j < endCount; j += 1) {
          const item = new Component('li', 'item garland-item').render();

          if (j) {
            rotateDeg += CURRENT_ADD_COUNT;
          }

          list.append(item);
          item.classList.add(`item_color_${garlandColor}`);
          item.style.transform = `rotate(${rotateDeg}deg) translate(${TRANSLATE_PX}px) rotate(-${rotateDeg}deg)`;
        }

        endCount += 2; // additional coefficient for lightrope items
        container.append(list);
      }

      if (garlandIsEnabled) {
        container.classList.add('active');
      }

      return container;
    };

    const garlandContainer = createGarland();

    wrapperContent.append(snowflakeContainer, mapContainer, garlandContainer);
    return wrapper;
  }

  createToysSection(chosenToys: ICard[]) {
    const wrapper = new BEMWrapper('section', `${this.id}-toys`).render();
    const wrapperContent = wrapper.querySelector(
      `.${this.id}-toys__content`
    ) as HTMLDivElement;

    const decoratePageLink = new ButtonLink(
      `heading ${this.id}__heading decorate-link`,
      false,
      'toys-page',
      'Выбрать украшения'
    ).render();
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
      const itemsCount = chosenToys.length;
      const list = new Component('ul', `list ${this.id}-toys__list`).render();

      for (let i = 0; i < itemsCount; i += 1) {
        const item = new Component('li', `${this.id}-toys__item`).render();
        const img = new Component(
          'img',
          `${this.id}-toys__img list-img`
        ).render() as HTMLImageElement;
        img.src = `./assets/img/toys/${chosenToys[i].num}.png`;
        img.alt = `Toy ${i + 1}`;
        img.draggable = true;
        img.dataset.num = `${chosenToys[i].num}`;
        const txt = new Text(
          'span',
          `text ${this.id}-toys__text`,
          `${chosenToys[i].count}`
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
    wrapperContent.append(
      decoratePageLink,
      toysContainer,
      decoratedTreesContainer
    );
    return wrapper;
  }

  bindSnowFalling(handler: () => void) {
    const snowButton = this.root.querySelectorAll(
      `.${this.id}__button`
    )[1] as HTMLButtonElement;

    snowButton.addEventListener('click', () => {
      const snowflakesContainer = this.root.querySelector(
        `.${this.id}-tree__snowflake-container`
      ) as HTMLDivElement;
      handler();
      snowflakesContainer.classList.toggle('snowflakes_state_falling');
    });
  }

  bindAudioContext(handler: () => boolean) {
    const audio = this.root.querySelector(
      `.${this.id}-settings__audio`
    ) as HTMLAudioElement;
    const audioButton = this.root.querySelector(
      '.icon-sound'
    ) as HTMLButtonElement;

    const startSong = () => {
      audio.play().catch(() => console.log('Something went wrong.'));
    };

    const songHandler = (audioIsPlaying: boolean) => {
      if (!audioIsPlaying) {
        audio.pause();
        // }
      } else {
        startSong();
      }
    };

    audioButton.addEventListener('click', () => {
      const audioIsPlaying = handler();
      songHandler(audioIsPlaying);
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.ended) {
        startSong();
      }
    });
  }

  bindChangeTree(handler: (treeNum: string) => string) {
    const list = this.root.querySelector(
      `.${this.id}__trees-list`
    ) as HTMLUListElement;

    list.addEventListener('click', event => {
      let target = event.target as HTMLElement;

      if (target.tagName === 'IMG') {
        target = target.parentElement as HTMLButtonElement;
        const id = target.dataset.role as string;

        const activeBcgNum = handler(id);

        const treeImg = this.root.querySelector(
          `.${this.id}-tree__img`
        ) as HTMLImageElement;
        treeImg.src = `./assets/img/tree/${activeBcgNum}.png`;
      }
    });
  }

  bindChangeBackground(handler: (bcgNum: string) => string) {
    const list = this.root.querySelector(
      `.${this.id}__bcgs-list`
    ) as HTMLUListElement;

    list.addEventListener('click', event => {
      let target = event.target as HTMLElement;

      if (target.tagName === 'IMG') {
        target = target.parentElement as HTMLButtonElement;
        const id = target.dataset.role as string;

        const activeBcgNum = handler(id);

        const bcg = this.root.querySelector(
          `.${this.id}-tree__content`
        ) as HTMLDivElement;
        bcg.style.background = `url(./assets/img/bg/${activeBcgNum}.jpg) 0 0/cover no-repeat`;
      }
    });
  }

  bindClearLocalStorage(handler: () => void) {
    const resetButton = this.root.querySelectorAll(
      `.${this.id}__bottom-button`
    )[1] as HTMLButtonElement;

    resetButton.addEventListener('click', () => {
      handler();
      resetButton.classList.toggle('button_state_active');
      setTimeout(() => {
        resetButton.classList.toggle('button_state_active');
      }, 200);
    });
  }

  bindChangeGarlandColor(handler: (color: string) => string) {
    const garlandBtnList = this.root.querySelector(
      `.${this.id}__harlands-list`
    ) as HTMLUListElement;

    const garlandItems = this.root.querySelectorAll('.garland-item');

    const garlandHandler = (target: HTMLElement) => {
      const color = target.dataset.role as string;

      handler(color);

      garlandItems.forEach(item => {
        const elem = item;
        elem.className = `item garland-item item_color_${color}`;
      });
    };

    garlandBtnList.addEventListener('click', event => {
      let target = event.target as HTMLElement;

      if (target.tagName === 'BUTTON') {
        garlandHandler(target);
      }
      if (target.tagName === 'LI') {
        target = target.firstElementChild as HTMLButtonElement;
        garlandHandler(target);
      }
    });
  }

  bindGarlandStateToggle(handler: () => boolean, garlandIsEnabled: boolean) {
    const cls = 'harland-toggle';
    const track = this.root.querySelector(`.${cls}__track`) as HTMLDivElement;
    const thumb = this.root.querySelector(`.${cls}__thumb`) as HTMLDivElement;
    const garlandContainer = this.root.querySelector(
      '.garland-container'
    ) as HTMLDivElement;

    const handleToggleClasses = () => {
      (
        [
          [track, 'track'],
          [thumb, 'thumb'],
        ] as [HTMLElement, string][]
      ).forEach(elem => {
        elem[0].classList.toggle(`${elem[1]}_state_active`);
      });
    };

    if (garlandIsEnabled) {
      handleToggleClasses();
    }

    track.addEventListener('click', () => {
      handleToggleClasses();
      const isEnabled = handler();

      if (isEnabled) {
        garlandContainer.classList.add('active');
      } else {
        garlandContainer.classList.remove('active');
      }
    });
  }

  bindDragToys(
    handler: (
      method: string,
      count: string,
      relCoords: { relX: number; relY: number }
    ) => IToysReceived,
    getAmountOfCurrentToy: (toyChars: IToyChars) => string
  ) {
    const METHOD = 'decrement';
    const draggableToys = this.root.querySelectorAll('.list-img');
    const area = this.root.querySelector('area') as HTMLAreaElement;

    area.addEventListener('dragover', e => {
      e.stopImmediatePropagation();
      e.preventDefault();
    });

    area.addEventListener(
      'drop',
      e => {
        const mapContainer = this.root.querySelector(
          '.map-container'
        ) as HTMLDivElement;

        const X = e.pageX;
        const Y = e.pageY;
        const mapRect = mapContainer.getBoundingClientRect();
        const relX = X - mapRect.left - window.scrollX - 25;
        const relY = Y - mapRect.top - window.scrollY - 30;

        const relCoords = {
          relX,
          relY,
        };

        let toyChars = (e.dataTransfer as DataTransfer).getData(
          'application/drag'
        ) as string | IToyChars;
        const img = new Component(
          'img',
          'area-img'
        ).render() as HTMLImageElement;

        if (!(toyChars as string).length) {
          toyChars = JSON.parse(
            (e.dataTransfer as DataTransfer).getData('application/Toy')
          ) as IToyChars;

          img.src = toyChars.toy;
          img.draggable = true;
          img.style.cssText = `position: absolute; width: 50px; height: 60px; top: ${relY}px; left: ${relX}px; `;

          (this.root.querySelector('.map-container') as HTMLDivElement).append(
            img
          );

          const data = handler(METHOD, toyChars.num, relCoords);
          const { num } = toyChars;

          DecoratePage.modifyAmountOfCurrentToy(draggableToys, num, data);
        } else {
          toyChars = JSON.parse(
            (e.dataTransfer as DataTransfer).getData('application/drag')
          ) as IToyChars;
          img.src = toyChars.toy;
          img.draggable = true;
          img.style.cssText = `position: absolute; width: 50px; height: 60px; top: ${relY}px; left: ${relX}px; `;

          (this.root.querySelector('.map-container') as HTMLDivElement).append(
            img
          );
        }

        this.dragToysInTree(
          draggableToys,
          img,
          toyChars as unknown as IToyChars,
          handler,
          relCoords
        );
      },
      { capture: false }
    );

    draggableToys.forEach(toy => {
      toy.addEventListener('dragstart', event => {
        const toyChars = {
          toy: (toy as HTMLImageElement).src,
          num: (toy as HTMLImageElement).dataset.num as string,
        };

        const amountOfCurrentToys = getAmountOfCurrentToy(toyChars);

        if (+amountOfCurrentToys) {
          (event as DragEvent).dataTransfer?.setData(
            'application/Toy',
            `${JSON.stringify(toyChars)}`
          );
        } else {
          event.preventDefault();
        }
      });
    });
  }

  dragToysInTree(
    draggableToys: NodeListOf<Element>,
    img: HTMLImageElement,
    toyChars: IToyChars,
    handler: (
      method: string,
      count: string,
      relCoords: { relX: number; relY: number }
    ) => IToysReceived,
    relCoords: { relX: number; relY: number }
  ) {
    const METHOD = 'increment';

    console.log(draggableToys);

    img.addEventListener('dragstart', event => {
      event.dataTransfer?.setData(
        'application/drag',
        `${JSON.stringify(toyChars)}`
      );

      const mainWrapper = this.root.querySelector('main') as HTMLElement;

      const dragOver = (e: DragEvent) => {
        e.preventDefault();
        (e.dataTransfer as DataTransfer).dropEffect = 'move';
      };

      mainWrapper.addEventListener('dragover', dragOver);

      mainWrapper.addEventListener(
        'drop',
        e => {
          e.dataTransfer?.getData('application/Toy');
          const target = e.target as HTMLElement;
          const addSelectorOfToys = this.root.querySelectorAll('.list-img');
          if (target.tagName === 'AREA') {
            // if drop container isn't a MAIN
            return;
          }

          // remove dragOverListener
          mainWrapper.removeEventListener('dragover', dragOver);

          const data = handler(METHOD, toyChars.num, relCoords);
          DecoratePage.modifyAmountOfCurrentToy(
            addSelectorOfToys,
            toyChars.num,
            data
          );
        },
        { once: true }
      );
    });

    img.addEventListener('drag', () => {
      img.remove();
    });
  }

  static modifyAmountOfCurrentToy(
    draggableToys: NodeListOf<Element>,
    num: string,
    data: IToysReceived
  ) {
    const curToy = Array.from(draggableToys).find(
      toy => (toy as HTMLElement).dataset.num === num
    ) as HTMLImageElement;
    const counter = curToy.nextElementSibling as HTMLSpanElement;
    counter.textContent = data.count;
  }
}

export default DecoratePage;
