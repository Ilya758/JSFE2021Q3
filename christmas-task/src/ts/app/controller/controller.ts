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

      toysPage.bindShapeFiltrate(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindColorFiltrate(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindSizeFiltrate(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindSorting(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindFavoriteFiltrate(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindAllCategoriesFiltrate(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindCreateSlider(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        Model.getChosenToys()
      );
      toysPage.bindResetFilters(
        this.handleReset.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.bindInputValue(
        this.handleFiltrate.bind(this),
        this.restoreCardsList.bind(this, toysPage),
        chosenToys
      );
      toysPage.setActiveFiltersAfterReload(filters);
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
}

export default Controller;
