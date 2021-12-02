import AppLoader from './appLoader';

declare class AppController extends AppLoader {
    getSources(callback: (data: INewsJSON) => void): void;

    getNews(e: Event, callback: (data: INewsJSON) => void): void;
}
