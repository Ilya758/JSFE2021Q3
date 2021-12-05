import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: INewsJSON<ISources, IArticle>) => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: INewsJSON<ISources, IArticle>) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') || '';

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }

            target = target.parentElement ? target.parentElement : newsContainer;
        }
    }
}

export default AppController;
