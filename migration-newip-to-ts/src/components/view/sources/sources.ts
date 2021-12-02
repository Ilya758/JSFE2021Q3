import './sources.css';

class Sources {
    draw(data: TGenericForINewsJSON<[]>): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: INewsSourcesItem) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;

            sourceItem.setAttribute('data-source-id', item.id);
            sourceItemName.textContent = item.name;

            fragment.append(sourceClone);
        });

        document.querySelector('.sources').append(fragment);
    }
}

export default Sources;
