class Model {
    static CATEGORIES = [
        'portrait',
        'landscape',
        'still-life',
        'impressionism',
        'expressionism',
        'avant-garde',
        'renaissance',
        'surrealism',
        'kitsch',
        'minimalism',
        'interior',
        'nude',
    ];

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

    static async getArtistQuestion(event) {
        const category = event.target.parentElement.dataset.role;
        this.commit('gameCategory', category);

        if (this.currentRound !== 10 && this.currentRound !== 1) {
            this.currentRound += 1;
        }

        this.commit('currentRound', this.currentRound);

        const categoryNum = Model.CATEGORIES.indexOf(this.getGameCategory());
        let photoAddNum = 0;
        const COUNT_ROUNDS = 10;

        const questionNumber =
            photoAddNum + categoryNum * COUNT_ROUNDS + this.currentRound;
        const url =
            'https://raw.githubusercontent.com/Ilya758/image-data/master/images.json';
        const response = await fetch(url);
        const data = await response.json();

        const [currentCorrectAnswer, year, paintingName] = [
            await data[questionNumber].author,
            await data[questionNumber].year,
            await data[questionNumber].name,
        ];

        const authorsName = new Set();
        authorsName.add(currentCorrectAnswer);

        while (authorsName.size < 4) {
            const randomNum = Math.floor(Math.random() * 240);
            const author = data[randomNum].author;
            authorsName.add(author);
        }

        const shuffleAuthorsNameArray = Model.shuffle(Array.from(authorsName));

        this.questionInfo = {
            currentCorrectAnswer,
            questionNumber,
            year,
            paintingName,
            shuffleAuthorsNameArray,
        };

        this.commit('questionInfo', JSON.stringify(this.questionInfo));

        return this.questionInfo;
    }

    static getQuestionInfo() {
        return this.questionInfo;
    }

    static async getPicturesQuestion(event) {
        const category = event.target.parentElement.dataset.role;
        this.commit('gameCategory', category);

        if (this.currentRound !== 10 && this.currentRound !== 1) {
            this.currentRound += 1;
        }

        this.commit('currentRound', this.currentRound);

        const categoryNum = Model.CATEGORIES.indexOf(this.getGameCategory());
        let photoAddNum = 120;
        const COUNT_ROUNDS = 10;

        const questionNumber =
            photoAddNum + categoryNum * COUNT_ROUNDS + this.currentRound;
        const url =
            'https://raw.githubusercontent.com/Ilya758/image-data/master/images.json';
        const response = await fetch(url);
        const data = await response.json();

        const [questionAuthor, paintingName, year] = [
            await data[questionNumber].author,
            await data[questionNumber].name,
            await data[questionNumber].year,
        ];

        const paintings = new Set();
        paintings.add(questionNumber);

        while (paintings.size < 4) {
            const randomNum = Math.floor(Math.random() * 240);
            paintings.add(randomNum);
        }

        const shufflePaintingsNums = Model.shuffle(Array.from(paintings));

        this.questionInfo = {
            questionAuthor,
            questionNumber,
            year,
            paintingName,
            shufflePaintingsNums,
        };

        this.commit('questionInfo', JSON.stringify(this.questionInfo));

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
