import News from './news/news';
import Sources from './sources/sources';

declare class AppView {
    constructor(public news: News, public sources: Sources);

    drawNews(data: INewsJSON): void;

    drawSources(data: INewsJSON): void;
}
