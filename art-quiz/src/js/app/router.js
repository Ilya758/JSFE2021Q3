import Model from './model';
import View from './view';

class Router {
    constructor() {
        View.bindResetHash(Router.resetHashAfterReload());
    }

    static getHash() {
        this.hash = window.location.hash ? window.location.hash.slice(1) : '';
        return this.hash;
    }

    handleHash() {
        const currentHash = Router.getHash();
        const gameSetup = Model.getGameSetup();

        if (currentHash === 'question') {
            View.bindQuestionInfo(Router.handleQuestionGeneration);
        } else if (currentHash) {
            View.render(View.pageIds[currentHash], currentHash, gameSetup);

            if (currentHash === 'categories') {
                View.bindQuestionInfo(Router.handleQuestionGeneration);
            }

            View.bindGameCategory(Router.handleGameCategory);
        } else {
            View.render();
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

    static async handleQuestionGeneration(event) {
        if (Model.getGameState) {
            const questionInfo = await Model.startQuiz(event);
            const currentHash = Router.getHash();
            View.render(
                View.pageIds[currentHash],
                currentHash,
                Model.getGameSetup(),
                questionInfo
            );
        }
        }

    static resetHashAfterReload() {
        window.location.hash = '#main-page';
    }
}

export default Router;
