import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '80af9475067f4ed084cd3dea8f749852',
        });
    }
}

export default AppLoader;
