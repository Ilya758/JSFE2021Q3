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
        this.currentAnswersArray = null;
    }

    static getCategories() {
        return Model.CATEGORIES;
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

    static getCurrentRound() {
        return window.localStorage.getItem('currentRound');
    }

    static setGameCategory(setup) {
        this.gameSetup = setup;
        this.commit('gameSetup', setup);
    }

    static async getArtistQuestion(event, cat) {
        const category = cat || event.parentElement.dataset.role;
        this.commit('gameCategory', category);
        this.commit('currentRound', this.currentRound);

        if (+this.currentRound === 1) {
            this.currentAnswersArray = Model.getInitAnswersArray();
            this.commit(
                'currentAnswers',
                JSON.stringify(this.currentAnswersArray)
            );
        }

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
        const currentRound = +this.getCurrentRound();
        const currentAnswers = Model.getCurrentAnswers();
        this.questionInfo = {
            currentCorrectAnswer,
            questionNumber,
            year,
            paintingName,
            shuffleAuthorsNameArray,
            currentRound,
            currentAnswers,
        };

        this.commit('questionInfo', JSON.stringify(this.questionInfo));
        return this.questionInfo;
    }

    static getQuestionInfo() {
        return this.questionInfo;
    }

    static async getPicturesQuestion(event, cat) {
        const category = cat || event.target.parentElement.dataset.role;
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

    static async startQuiz(event, nextCategory) {
        this.gameIsOver = false;
        this.currentRound = 1;
        this.commit('gameIsOver', this.gameIsOver);

        if (this.gameSetup === 'artist') {
            return Model.getArtistQuestion(event, nextCategory);
        }

        return Model.getPicturesQuestion(event, nextCategory);
    }

    static async generateNewQuestion() {
        this.currentRound += 1;
        const category = this.getGameCategory();

        if (this.gameSetup === 'artist') {
            return Model.getArtistQuestion('', category);
        }

        return Model.getPicturesQuestion('', category);
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

    static getCorrectAnswer(button) {
        const curAnswer = button.target.dataset.role;
        const curCorrectAnswer = this.questionInfo.currentCorrectAnswer;

        const thisAnswerIsCorrect = curAnswer === curCorrectAnswer;
        const curRound = this.currentRound;
        // const category = this.getGameCategory();

        if (curRound === 1) {
            this.currentAnswersArray = Model.getInitAnswersArray();
        }

        this.currentAnswersArray[curRound - 1] = thisAnswerIsCorrect;

        this.commit('currentAnswers', JSON.stringify(this.currentAnswersArray));

        const callbackInfo = this.getQuestionInfo();
        callbackInfo.curAnswer = thisAnswerIsCorrect;

        return callbackInfo;
    }

    static getInitAnswersArray() {
        return [...Array(10).keys()].map(() => {
            return false;
        });
    }

    static getCurrentAnswers() {
        return window.localStorage.getItem('currentAnswers');
    }

    static async getCurrentRoundResults() {
        const currentAnswers = JSON.parse(this.getCurrentAnswers());
        if (currentAnswers !== null) {
            const overallQuestions = currentAnswers.length;
            const correctAnswers = currentAnswers.filter(
                el => el === true
            ).length;

            return {
                overallQuestions,
                correctAnswers,
            };
        }
    }

    static getNextCategory() {
        const currentCategory = Model.getGameCategory();
        const categories = Model.getCategories();
        const currentCategoryNdx = categories.indexOf(currentCategory);
        const nextCategory = categories[currentCategoryNdx + 1];

        return nextCategory;
    }

    static saveCurrentResultsToOverallArray() {
        const currentAnswers = JSON.parse(Model.getCurrentAnswers());
        const currentNdxOfArrayCategory = Model.CATEGORIES.indexOf(
            this.getGameCategory()
        );
        let setupNdx;

        if (Model.getGameSetup() === 'artist') {
            setupNdx = 0;
        } else {
            setupNdx = 1;
        }

        this.overallResults = JSON.parse(Model.getOverallResults());

        if (this.overallResults === null) {
            this.overallResults = Model.setOverallResultsArray();
        }

        this.overallResults[setupNdx][currentNdxOfArrayCategory] =
            currentAnswers;

        this.commit('overallResults', JSON.stringify(this.overallResults));
    }

    static getOverallResults() {
        return window.localStorage.getItem('overallResults');
    }

    static setOverallResultsArray() {
        return [
            [...Array(12).keys()].map(() => Model.getInitAnswersArray()),
            [...Array(12).keys()].map(() => Model.getInitAnswersArray()),
        ];
    }

    static async setStateOfQuizCategory() {
        const currentNdxOfArrayCategory = Model.CATEGORIES.indexOf(
            this.getGameCategory()
        );
        this.categoryState = JSON.parse(Model.getStateOfQuizCategory());

        if (!this.categoryState) {
            this.categoryState = this.setOverallResultsArray();
            this.commit('categoryState', JSON.stringify(this.categoryState));
        }

        if (currentNdxOfArrayCategory !== -1) {
            const correctAnswers = await Model.getCurrentRoundResults();
            this.categoryState = JSON.parse(Model.getStateOfQuizCategory());
            let setupNdx;

            if (Model.getGameSetup() === 'artist') {
                setupNdx = 0;
            } else {
                setupNdx = 1;
            }

            this.categoryState[setupNdx][currentNdxOfArrayCategory] = [
                true,
                correctAnswers.correctAnswers,
            ];

            this.commit('categoryState', JSON.stringify(this.categoryState));
        }
        return this.categoryState;
    }

    static getStateOfQuizCategory() {
        return window.localStorage.getItem('categoryState');
    }
}

export default Model;
