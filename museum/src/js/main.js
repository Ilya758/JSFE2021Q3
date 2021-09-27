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

    console.log('Score: 160\n\n- Вёрстка валидная +10\n\n- Вёрстка семантическая +24\n\n- Вёрстка соответствует макету +45\n\n- Форма покупки билетов +22 (плавно выдвигается, открывается при клике, используются все необходимые элементы. PS: по умолчанию некоторые теги имеют тип text, при фокусировке тип сменяется на необходимый (требование выполнил в полном объёме).\n\n- Требования к css +18: favicon есть, используются гриды и флексы, нет сдвигов центрального блока, фон блоков тянется на всю ширину страницы, иконки добавлены в формате svg, регулируется пространство через letter-spacing, переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка, в блоке Contacts правильно указаны ссылки на почту mailto и на телефон tel, в футере добавлены ссылки на соцсети, круглая граница вокруг иконок соцсетей выполнена при помощи css\n\n- Интерактивности +25: плавный скролл, параллакс, переход на новые страницы по клику на карточки в секции .visiting, присутствует изменение стиля интерактивных элементов при наведении\n\n- Интерактивность через js +16: рабочие кнопки секции .tickets, ripple-effect по клику на кнопку Book, перезагрузка страницы инициирует рандомный shuffle картин в секции .gallery');

});
