document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded.');

    const items = document.querySelectorAll('.gallery__gridItem');

    function makeMasonry() {
        setTimeout(() => {

            items.forEach((el) => {
                const img = el.children[0];

                if (img.width === img.height) {
                    el.style.gridRowEnd = 'span 4';
                }
                if (img.width > img.height) {
                    el.style.gridRowEnd = 'span 3';
                }
                if (img.width < img.height) {
                    el.style.gridRowEnd = 'span 5';
                }
            });
        }, 500);
    }

    function shuffle() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            .sort(() => Math.random() - 0.5);

        items.forEach((el, i) => {
            const img = document.createElement('img');
            img.src = `images/gallery/gallery${array[i]}.jpg`;
            img.alt = `gallery${array[i]}`;
            el.append(img);
        });
    }

    shuffle();
    makeMasonry();
});
