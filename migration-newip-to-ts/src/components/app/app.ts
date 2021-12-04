import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLElement;

        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data: Pick<INewsJSON, 'articles' | 'status' | 'totalResults'>) =>
                this.view.drawNews(data)
            )
        );

        this.controller.getSources((data: Pick<INewsJSON, 'status' | 'sources'>) => this.view.drawSources(data));

        this.view.initPreloader();
    }
}

export default App;
