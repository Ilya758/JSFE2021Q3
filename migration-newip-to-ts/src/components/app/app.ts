import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    constructor(public controller: AppController, public view: AppView) {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLElement;

        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: INewsJSON) => this.view.drawNews(data))
        );

        this.controller.getSources((data: INewsJSON) => this.view.drawSources(data));
    }
}

export default App;
