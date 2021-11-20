import Model from './model';
import View from './view';
import Router from './router';

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.router = new Router().init();
    }

    start() {
        // View.render();
        // this.view.fillTheVolumeGradient();
        // this.view.initListeners();
    }
}

export default Controller;
