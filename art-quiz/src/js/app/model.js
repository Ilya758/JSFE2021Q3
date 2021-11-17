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

    static getQuestionInfo() {
        return this.questionInfo;
    }


    static async startQuiz(event) {
        this.gameIsOver = false;
        this.currentRound = 1;
        this.commit('gameIsOver', this.gameIsOver);

        if (this.gameSetup === 'artist') {
            return Model.getArtistQuestion(event);
        }

        return Model.getPicturesQuestion(event);
    }

    static getGameState() {
        return this.gameIsOver;
    }

    static resetGameCategory() {
        this.gameCategory = null;
        this.commit('gameCategory', this.gameCategory);
    }

    static shuffle(array) {
        const mutatedArray = array;
        for (let i = array.length - 1; i > 0; ) {
            i -= 1;
            let j = Math.floor(Math.random() * (i + 1));
            [mutatedArray[i], mutatedArray[j]] = [
                mutatedArray[j],
                mutatedArray[i],
            ];
        }

        return mutatedArray;
    }
}

export default Model;
