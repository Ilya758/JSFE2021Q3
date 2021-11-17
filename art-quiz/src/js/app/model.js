class Model {
    constructor() {
        this.gameIsOver = true;
        this.currentRound = 0;
        this.roundIsOver = true;
        this.currentAnswer = false;
        this.questionInfo = null;
    }

    static commit(item, value) {
        window.localStorage.setItem(item, value);
    }

    static getGameCategory() {
        return window.localStorage.getItem('gameSetup');
    }

    static setGameCategory(setup) {
        this.gameSetup = setup;
        Model.commit('gameSetup', setup);
    }
}

export default Model;
