import AppLoader from './appLoader';

declare class AppController extends AppLoader {
    getSources(callback: () => void): void;

    getNews(e: Event, callback: () => void): void;
}
