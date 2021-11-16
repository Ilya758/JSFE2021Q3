import Model from './model';
import View from './view';

class Router {
    handleHash() {
        this.hash = window.location.hash ? window.location.hash.slice(1) : '';
        const gameSetup = Model.getGameCategory();

        if (this.hash) {
            View.render(View.pageIds[this.hash], this.hash, gameSetup);
        } else {
            View.render();
        }

        View.bindGameCategory(Router.handleGameCategory);
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.handleHash();
        });
        this.handleHash();
    }

    static handleGameCategory(setup) {
        Model.setGameCategory(setup);
    }
}

export default Router;
