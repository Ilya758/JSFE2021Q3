import News from './news/news';
import Sources from './sources/sources';

declare class AppView {
    constructor(public news: News, public sources: Sources);

    drawNews(data: Pick<INewsJSON, 'articles' | 'status' | 'totalResults'>): void;

    drawSources(data: Pick<INewsJSON, 'status' | 'sources'>): void;

    initPreloader(): void;
}
