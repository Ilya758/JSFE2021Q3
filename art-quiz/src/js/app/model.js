class Model {
    static commit(item, value) {
        window.localStorage.setItem(item, value);
    }

    static setGameCategory(setup) {
        this.gameSetup = setup;
        Model.commit('gameSetup', setup);
    }
}

export default Model;
