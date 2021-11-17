import Model from './model';
import View from './view';

class Router {
    constructor() {
        View.bindResetHash(Router.resetHashAfterReload());
    }

    handleHash() {
        this.hash = window.location.hash ? window.location.hash.slice(1) : '';
        const gameSetup = Model.getGameCategory();

        if (this.hash) {
            View.render(View.pageIds[this.hash], this.hash, gameSetup);
        } else {
            View.render();
        }

        View.bindGameCategory(Router.handleGameCategory);

        if (this.hash === 'categories') {
            View.bindQuestionInfo(Router.handleQuestionGeneration);
        }
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

    static handleQuestionGeneration() {
        if (Model.getGameCategory() === 'artist') {
            Model.getArtistQuestion();
        } else {
            Model.getPicturesQuestion();
        }

    static resetHashAfterReload() {
        window.location.hash = '#main-page';
    }
}

export default Router;
