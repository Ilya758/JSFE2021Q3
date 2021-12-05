import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    constructor(public news?: News, public sources?: Sources) {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Pick<INewsJSON<ISources, IArticle>, 'articles' | 'status' | 'totalResults'>): void {
        const values = data?.articles ? data?.articles : [];
        this.news?.draw(values);
    }

    drawSources(data: Pick<INewsJSON<ISources, IArticle>, 'status' | 'sources'>): void {
        const values = data?.sources ? data?.sources : [];
        this.sources?.draw(values);
    }

    initPreloader(): void {
        window.addEventListener('load', () => {
            document.body.classList.add('page_state_loading');

            setTimeout(() => {
                document.body.style.animation = 'appearFromTop 2s linear';
            });

            setTimeout(() => {
                document.body.classList.add('page_state_loaded');
                document.body.classList.remove('page_state_loading');
                document.body.classList.remove('no-scroll');
            }, 500);
        });
    }
}

export default AppView;
