import { ICard } from '../../models/card';
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
    const currentHash = this.router.getHash();

    if (currentHash === 'toys-page') {
      let initToys = Model.pull<ICard[]>('filteredArray');
      // checking emptiness of initToys and existence of localStorage props

      if (!initToys.length && !Model.getStorageHasValuesProp()) {
        initToys = this.model.getInitArrayOfToys();
      }

      const chosenToys = Model.getChosenToys();
      const filters = Model.getCurrentFilter();
      const toysPage = this.view.render(
        currentHash,
        initToys,
        chosenToys
      ) as ToysPage;

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
    } else {
      this.view.render();
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
}

export default Controller;
