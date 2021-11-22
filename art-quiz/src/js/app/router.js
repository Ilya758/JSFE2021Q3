import ModalRoundComplete from '../core/components/modal-round-complete';
import Categories from '../pages/categories';
import MainPage from '../pages/main';
import Question from '../pages/question';
import Settings from '../pages/settings';
import Model from './model';
import View from './view';

class Router {
    constructor() {
        View.bindResetHash(Router.resetHashAfterReload());
        MainPage.preloader();
    }

    static getHash() {
        this.hash = window.location.hash ? window.location.hash.slice(1) : '';
        return this.hash;
    }

    async handleHash() {
        const currentHash = Router.getHash();
        const gameSetup = Model.getGameSetup();

        if (currentHash === 'question') {
        } else if (currentHash) {
            const categoryState = await Model.setStateOfQuizCategory();
            const scoreResults = await Model.getResultsToScore();
            const settings = await Model.getSettings();
            const soundLevel = await Model.getVolumeValue();

            setTimeout(async () => {
                await View.render(
                    View.pageIds[currentHash],
                    currentHash,
                    gameSetup,
                    categoryState,
                    scoreResults,
                    settings
                );
                await View.transitionToSettingsPage();
            }, 2000);

            if (currentHash === 'settings') {
                setTimeout(async () => {
                    View.fillTheVolumeGradient(soundLevel);
                    View.bindVolumeValue(Router.handleVolumeValue);
                    View.bindResetSettings(Router.handleResetSettings);
                    Router.setSettingsAfterReload();
                    await View.bindToggleTime(
                        Router.handleToggleTime,
                        Model.getSettings
                    );
                    Settings.exitToMainPage();
                }, 2000);
            }

            if (currentHash === 'categories') {
                const categories = Model.CATEGORIES;
                setTimeout(async () => {
                    Categories.transitionToPages();

                    await View.bindQuestionInfo(
                        Router.handleQuestionGeneration
                    );
                    await View.bindRenderScoreModal(
                        categories,
                        Router.handleScoreGeneration
                    );
                }, 3000);
            }

            if (currentHash === 'score') {
                setTimeout(() => {
                    console.log('score!!!');
                    View.bindFadeEffectToPages();
                }, 2500);
            }

            setTimeout(() => {
                View.bindGameCategory(Router.handleGameCategory);
            }, 2000);
        } else {
            View.render();
        }
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.handleHash();
        });
        this.handleHash();
        Model.commit('gameSetup', 'artist');
        const settings = Model.getSettings();

        if (
            settings.soundLevel === 0 &&
            settings.timeIsEnabled === null &&
            settings.timeOut === 0
        ) {
            Model.resetSettings();
        }
    }

    static handleGameCategory(setup) {
        Model.setGameCategory(setup);
    }

    static async handleQuestionGeneration(event, nextCategory) {
        if (Model.getGameState) {
            const questionInfo = await Model.startQuiz(event, nextCategory);
            const currentHash = Router.getHash();
            const settings = Model.getSettings();
            const addInfo = await Model.generateNewQuestion();
            await View.render(
                View.pageIds[currentHash],
                currentHash,
                Model.getGameSetup(),
                questionInfo,
                settings
            );
            await Question.bindAnswer(
                Router.handleAnswer,
                Router.handleNewQuestion
            );
            await Question.bindDeadline(
                Router.handleDeadline,
                Model.getCurrentDateTime,
                settings,
                addInfo,
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
            View.removeFadeClass();
            const results = await Model.getCurrentRoundResults();
            const nextCategory = Model.getNextCategory();
            const categoryCompleteModal = new ModalRoundComplete(
                results
            ).render();
            Model.saveCurrentResultsToOverallArray();
            View.addFadeClass();
            View.showFinalResults(
                categoryCompleteModal,
                Router.handleQuestionGeneration,
                nextCategory
            );
        } else {
            const questionInfo = await Model.generateNewQuestion();
            const currentHash = Router.getHash();
            const settings = Model.getSettings();
            await View.render(
                View.pageIds[currentHash],
                currentHash,
                Model.getGameSetup(),
                questionInfo,
                settings
            );
            await Question.bindAnswer(
                Router.handleAnswer,
                Router.handleNewQuestion
            );
            await Question.bindDeadline(
                Router.handleDeadline,
                Model.getCurrentDateTime,
                settings
            );
        }
    }

    static async handleScoreGeneration(event) {
        return Model.setResultsToScore(event);
    }

    static handleResetSettings() {
        return Model.resetSettings();
    }

    static async handleToggleTime() {
        return Model.setStateOfTimeToggler();
    }

    static handleChangingTimeCount(event) {
        return Model.setTimeCount(event);
    }

    static handleVolumeValue(event) {
        return Model.setVolumeValue(event);
    }

    static setSettingsAfterReload() {
        View.bindChangingTimeCount(Router.handleChangingTimeCount);
        View.thumbToggler(Model.getSettings);
    }

    static handleDeadline() {
        return Model.setDeadline();
    }
}

export default Router;
