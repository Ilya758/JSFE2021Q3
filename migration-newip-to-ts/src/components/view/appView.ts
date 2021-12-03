import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    constructor(public news?: News, public sources?: Sources) {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Pick<INewsJSON, 'articles' | 'status' | 'totalResults'>): void {
        const values = data?.articles ? data?.articles : [];
        this.news?.draw(values);
    }

    drawSources(data: Pick<INewsJSON, 'status' | 'sources'>): void {
        const values = data?.sources ? data?.sources : [];
        this.sources?.draw(values);
    }
}

export default AppView;
