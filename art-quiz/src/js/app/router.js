import ModalRoundComplete from '../core/components/modal-round-complete';
import Question from '../pages/question';
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

    async handleHash() {
        const currentHash = Router.getHash();
        const gameSetup = Model.getGameSetup();

        if (currentHash === 'question') {
            /** await View.bindQuestionInfo(Router.handleQuestionGeneration); */
            /**  await Question.bindNewQuestion(Router.handleNewQuestion); */
        } else if (currentHash) {
            const categoryState = await Model.setStateOfQuizCategory();
            const scoreResults = await Model.getResultsToScore();
            await View.render(
                View.pageIds[currentHash],
                currentHash,
                gameSetup,
                categoryState,
                scoreResults
            );

            if (currentHash === 'categories') {
                const categories = Model.CATEGORIES;
                View.bindQuestionInfo(Router.handleQuestionGeneration);
                View.bindRenderScoreModal(
                    categories,
                    Router.handleScoreGeneration
                );
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

    static async handleQuestionGeneration(event, nextCategory) {
        if (Model.getGameState) {
            const questionInfo = await Model.startQuiz(event, nextCategory);
            const currentHash = Router.getHash();
            await View.render(
                View.pageIds[currentHash],
                currentHash,
                Model.getGameSetup(),
                questionInfo
            );
            await Question.bindAnswer(
                Router.handleAnswer,
                Router.handleNewQuestion
            );
        }
    }

    static resetHashAfterReload() {
        Model.resetGameCategory();
        window.location.hash = '#main-page';
    }

    static handleAnswer(button) {
        return Model.getCorrectAnswer(button);
    }

    static async handleNewQuestion() {
        if (Model.getCurrentRound() === '10') {
            const results = await Model.getCurrentRoundResults();
            const nextCategory = Model.getNextCategory();
            const categoryCompleteModal = new ModalRoundComplete(
                results
            ).render();

            Model.saveCurrentResultsToOverallArray();
            View.showFinalResults(
                categoryCompleteModal,
                Router.handleQuestionGeneration,
                nextCategory
            );
        } else {
            const questionInfo = await Model.generateNewQuestion();
            const currentHash = Router.getHash();
            await View.render(
                View.pageIds[currentHash],
                currentHash,
                Model.getGameSetup(),
                questionInfo
            );
            await Question.bindAnswer(
                Router.handleAnswer,
                Router.handleNewQuestion
            );
        }
    }

    static async handleScoreGeneration(event) {
        return Model.setResultsToScore(event);
    }
}

export default Router;
