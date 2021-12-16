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

  bindHashChange(): void {
    window.addEventListener('hashchange', () => {
      this.handleHash();
    });
    this.handleHash();
  }
  }
}

export default Controller;
