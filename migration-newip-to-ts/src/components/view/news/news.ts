import './news.css';

class News {
    draw(data: TGenericForINewsJSON<[]>): void {
        const news = data.length >= 10 ? Object.values(data).filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Partial<IArticle>, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            const itemPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            const itemAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            const itemDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            const itemTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            const itemSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            const itemContent = newsClone.querySelector('.news__description-content') as HTMLParagraphElement;
            const itemAddInfo = newsClone.querySelector('.news__read-more a') as HTMLParagraphElement;

            itemPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            itemAuthor.textContent = item.author || item?.source?.name || '';
            itemDate.textContent = item?.publishedAt?.slice(0, 10).split('-').reverse().join('-') || '';
            itemTitle.textContent = item.title || '';
            itemSource.textContent = item.source?.name || '';
            itemContent.textContent = item.description || '';
            itemAddInfo.setAttribute('href', item.url || '');

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news') as HTMLDivElement;

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
