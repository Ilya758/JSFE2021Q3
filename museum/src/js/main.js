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

    const buyBtn = document.querySelector('.tickets__btn-submit');
    const closePopupBtn = document.querySelector('.popup-tickets__btn-close');
    const overlay = document.querySelector('.overlay');
    closePopupBtn.addEventListener('click', toggleVisibility);
    buyBtn.addEventListener('click', toggleVisibility);

    document.addEventListener('click', (event) => {

        if (event.target === overlay) {
            toggleVisibility();
        }

    });

    function toggleVisibility() {
        const popup = document.querySelector('.popup-tickets');

        if (popup.classList.contains('popup-tickets_state_active')) {
            popup.classList.remove('popup-tickets_state_active');
            popup.classList.add('popup-tickets_state_disabled');
            overlay.classList.remove('overlay_state_fadeIn');
            popup.style.left = '-3000px';

            setTimeout(() => {
                popup.classList.remove('popup-tickets_state_disabled');
            }, 1010);
        } else {
            popup.classList.add('popup-tickets_state_active');
            popup.style.left = '50%';
            overlay.classList.add('overlay_state_fadeIn');
        }
    }

    function toggleNavVisibility() {

        if (nav.classList.contains('header__nav_state_fadeIn')) {
            nav.classList.remove('header__nav_state_fadeIn');
            nav.classList.add('header__nav_state_disabled');
        } else {
            nav.classList.remove('header__nav_state_disabled');
            nav.classList.add('header__nav_state_fadeIn');
        }
    }

});
