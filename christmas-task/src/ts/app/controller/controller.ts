import { ICard } from '../../models/card';
import { IToyChars } from '../../models/toyOnTree';
import DecoratePage from '../../pages/decorate';
import ToysPage from '../../pages/toys';
import Model from '../model/model';
import Router from '../router/router';
import View from '../view/view';

class Controller {
  protected model: Model;

  protected view: View;

  protected router: Router;

  constructor() {
    this.model = new Model();
    this.view = new View();
    this.router = new Router();
  }

  start(): void {
    Router.resetHashAfterReload();
    this.bindHashChange();
  }

  handleHash() {
    const id = this.router.getHash();

    if (id === 'toys-page') {
      let initToysArray = Model.pull<ICard[]>('filteredArray');
      // checking emptiness of initToys and existence of localStorage props

      if (!initToysArray.length && !Model.getStorageHasValuesProp()) {
        initToysArray = this.model.getInitArrayOfToys();
      }

      const chosenToys = Model.getChosenToys();
      const filters = Model.getCurrentFilter();

      setTimeout(() => {
        const toysPage = this.view.render({
          initToysArray,
          chosenToys,
          id,
        }) as ToysPage;

        toysPage.bindAddChosens(this.handleAddChosens.bind(this));

        toysPage.bindResetFilters(
          this.handleReset.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindClearLocalStorage(
          Controller.handleClearLocalStorage.bind(Controller)
        );
        toysPage.bindCreateSlider(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.setActiveFiltersAfterReload(filters);

        toysPage.bindShapeFiltrate(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindColorFiltrate(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindSizeFiltrate(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindSorting(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindFavoriteFiltrate(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindAllCategoriesFiltrate(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
        toysPage.bindInputValue(
          this.handleFiltrate.bind(this),
          this.restoreCardsList.bind(this, toysPage)
        );
      }, 2000);
    } else if (id === 'decorate-page') {
      setTimeout(() => {
        const snowIsFalling = Model.getSnowFallingState();
        const activeTree = Model.getActiveTree();
        const activeBackground = Model.getActiveBackground();
        const garlandColor = Model.getGarlandColor();
        const garlandIsEnabled = Model.getGarlandToggler();
        const chosenToys = this.model.getDraggableToys();
        const toysOnTreeChars = Model.getToysOnTreeChars();
        const addHandler = this.handleDecrementCountOfCurrentToy.bind(this);
        const decoratePage = this.view.render({
          snowIsFalling,
          id,
          activeTree,
          activeBackground,
          garlandColor,
          garlandIsEnabled,
          chosenToys,
          toysOnTreeChars,
          addHandler,
        }) as DecoratePage;
        decoratePage.bindSnowFalling(this.handleSnowFalling.bind(this));
        decoratePage.bindAudioContext(this.handleAudioContext.bind(this));
        decoratePage.bindChangeTree(this.handleChangeTree.bind(this));
        decoratePage.bindChangeBackground(
          this.handleActiveBackground.bind(this)
        );
        decoratePage.bindClearLocalStorage(
          Controller.handleClearLocalStorage.bind(this)
        );
        decoratePage.bindChangeGarlandColor(
          this.handleChangeGarlandColor.bind(this)
        );
        decoratePage.bindGarlandStateToggle(
          this.handleGarlandStateToggle.bind(this),
          garlandIsEnabled
        );
        decoratePage.bindDragToys(
          this.handleDecrementCountOfCurrentToy.bind(this),
          this.handleAmountOfCurrentToy.bind(this)
        );
      }, 2000);
    } else {
      setTimeout(() => {
        this.view.render({ id: 'main-page' });
      }, 2000);
    }
  }

  bindHashChange(): void {
    window.addEventListener('hashchange', () => {
      this.handleHash();
    });
    this.handleHash();
  }

  handleFiltrate(sortOpt: string | string[], method: string) {
    return this.model.filtrate(sortOpt, method);
  }

  handleReset() {
    return this.model.filtrate('', 'reset');
  }

  handleAddChosens(id: string) {
    return this.model.filtrateChosenToys(id);
  }

  restoreCardsList(page: ToysPage) {
    page.bindAddChosens(this.handleAddChosens.bind(this));
  }

  static handleClearLocalStorage() {
    Model.clearLocalStorage();
  }

  handleSnowFalling(): void {
    this.model.setSnowFallingState();
  }

  handleAudioContext() {
    return this.model.setStateOfAudioTrack();
  }

  handleChangeTree(treeNum: string) {
    return this.model.setActiveTree(treeNum);
  }

  handleActiveBackground(bcgNum: string) {
    return this.model.setActiveBackground(bcgNum);
  }

  handleChangeGarlandColor(color: string) {
    return this.model.setGarlandColor(color);
  }

  handleGarlandStateToggle() {
    return this.model.setGarlandToggler();
  }

  handleDecrementCountOfCurrentToy(
    method: string,
    count: string,
    relCoords: { relX: number; relY: number }
  ) {
    return this.model.modifyCountOfCurrentToy(method, count, relCoords);
  }

  handleAmountOfCurrentToy(toyChars: IToyChars) {
    return this.model.getAmountOfCurrentToy(toyChars);
  }
}

export default Controller;
