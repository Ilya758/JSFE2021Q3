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

    static getGameSetup() {
        return window.localStorage.getItem('gameSetup');
    }

    static getGameCategory() {
        return window.localStorage.getItem('gameCategory');
    }

    static setGameCategory(setup) {
        this.gameSetup = setup;
        this.commit('gameSetup', setup);
    }

    static getGameState() {
        return this.gameIsOver;
    }

    static resetGameCategory() {
        this.gameCategory = null;
        this.commit('gameCategory', this.gameCategory);
    }
}

export default Model;
