import Model from './model';
import View from './view';
import Router from './router';
import Settings from '../pages/settings';

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.router = new Router().init();
    }

    start() {
        this.view.render(Settings, 'settings');
        this.view.fillTheVolumeGradient();
        this.view.initListeners();
    }
}

export default Controller;
