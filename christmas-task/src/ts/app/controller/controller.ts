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
      const initToys = this.model.getInitArrayOfToys();
      const toysPage = this.view.render(currentHash, initToys) as ToysPage;

      toysPage.bindShapeFiltrate(this.handleFiltrate.bind(this));
      toysPage.bindColorFiltrate(this.handleFiltrate.bind(this));
      toysPage.bindSizeFiltrate(this.handleFiltrate.bind(this));
      toysPage.bindSorting(this.handleFiltrate.bind(this));
      toysPage.bindFavoriteFiltrate(this.handleFiltrate.bind(this));
      toysPage.bindAllCategoriesFiltrate(this.handleFiltrate.bind(this));
      toysPage.bindCreateSlider(this.handleFiltrate.bind(this));
      toysPage.bindResetFilters(this.handleReset.bind(this));
      toysPage.bindInputValue(this.handleFiltrate.bind(this));
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
}

export default Controller;
