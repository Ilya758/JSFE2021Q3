document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is loaded.');

    const gridList = document.querySelector('.gallery__gridList');

    window.addEventListener('scroll', () => {

        window.addEventListener('mousewheel', (event) => {
            console.log(event.deltaY);
            if (event.deltaY >= 0) {
                fadeFromBottom();
            } else {
                fadeToBottom();
            }
        });

    });

    function fadeFromBottom() {
        let rect = gridList.getBoundingClientRect();
        let coordY = rect.y + window.pageYOffset;

        if (window.pageYOffset > coordY - 600) {
            document.body.dataset.scroll = 'down';
            setTimeout(() => {
                toggleAnimationToGridItems(0, 2, 'add');
            }, 250);
        }
        if ((window.pageYOffset > coordY - 300)) {
            setTimeout(() => {
                toggleAnimationToGridItems(3, 5, 'add');
            }, 250);
        }
        if ((window.pageYOffset > coordY)) {
            setTimeout(() => {
                toggleAnimationToGridItems(6, 8, 'add');
            }, 250);
        }
        if ((window.pageYOffset > coordY + 300)) {
            setTimeout(() => {
                toggleAnimationToGridItems(9, 11, 'add');
            }, 250);
        }
    }

    function fadeToBottom() {
        const cls = document.querySelectorAll('.gallery__gridItem_state_fadeFromBottom');

        if (cls.length === 3) {
            setTimeout(() => {
                toggleAnimationToGridItems(0, 2);
            }, 250);
        }
        if (cls.length === 6) {
            setTimeout(() => {
                toggleAnimationToGridItems(3, 5);
            }, 250);
        }
        if (cls.length === 9) {
            setTimeout(() => {
                toggleAnimationToGridItems(6, 8);
            }, 250);
        }
        if (cls.length === 12) {
            setTimeout(() => {
                toggleAnimationToGridItems(9, 11);
            }, 250);
        }
    }

    const gridItems = document.querySelectorAll('.gallery__gridItem');

    function toggleAnimationToGridItems(start, end, op) {
        const cls = 'gallery__gridItem_state_fadeFromBottom';

        for (let i = start; i <= end; i++) {

            if (op === 'add') {
                gridItems[i].classList.add(cls);
            } else {
                gridItems[i].classList.remove(cls);
            }
        }
    }

    function makeMasonry() {
        setTimeout(() => {

            gridItems.forEach((el) => {
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

        gridItems.forEach((el, i) => {
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
    const nav = document.querySelector('.header__nav');
    const navBtn = document.querySelector('.header__nav-btn');
    const heading = document.querySelector('.welcome__heading');
    const welcomeBtn = document.querySelector('.welcome__btn');
    const welcomeText = document.querySelector('.welcome__text');

    closePopupBtn.addEventListener('click', toggleVisibility);
    buyBtn.addEventListener('click', toggleVisibility);

    document.addEventListener('click', (event) => {

        if (event.target === overlay) {
            toggleVisibility();
        }

        if (
            event.target === navBtn ||
          Array.from(document.querySelectorAll('.header__nav-link')).find((el) => el === event.target) ||
          (event.target !== nav &&
          nav.classList.contains('header__nav_state_fadeIn'))) {
            toggleNavVisibility();
            const elems = [
                [navBtn],
                [heading, 'header__heading'],
                [welcomeText, 'welcome__text'],
                [welcomeBtn, 'welcome__btn']
            ];

            elems.forEach((el) => {

                if (el[0] === navBtn) {
                    el[0].classList.toggle('header__nav-btn_state_active');
                } else {
                    el[0].classList.toggle(`${el[1]}_state_fade`);
                }

            });
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

    const rangeTime = document.querySelector('.range_elem_time');
    const rangeSound = document.querySelector('.range_elem_sound');

    function fixValueRange() {
        if (window.innerWidth <= 1024) {
            for (const el of [[rangeTime, 40], [rangeSound, 39]]) {
                setValueOfRange(el[0], el[1]);
            }
        }

        if (window.innerWidth <= 768) {
            for (const el of [[rangeTime, 31], [rangeSound, 40]]) {
                setValueOfRange(el[0], el[1]);
            }
        }

        if (window.innerWidth <= 421) {
            for (const el of [[rangeTime, 40], [rangeSound, 38]]) {
                setValueOfRange(el[0], el[1]);
            }
        }
    }

    fixValueRange();

    window.addEventListener('resize', fixValueRange);

    function setValueOfRange(el, val) {
        el.value = val;
        el.style.background = `linear-gradient(to right, var(--dark-red) 0%, var(--dark-red) ${val}%, #c4c4c4 ${val}%, #c4c4c4 100%)`;
    }

    window.addEventListener('DOMContentLoaded', () => {
        for (const elem of [rangeTime, rangeSound]) {
            elem.addEventListener('input', function handler() {

                setValueOfRange(elem, elem.value);
            });
        }
    });

    function findVideos() {
        let videos = document.querySelectorAll('.video-slider__item');
        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i], i);
        }
    }

    function setupVideo(video, ndx) {
        let link = document.querySelectorAll('.video-slider__link')[ndx];
        let media = document.querySelectorAll('.video-slider__iframe')[ndx];
        let btn = document.querySelectorAll('.video-slider__youtube-btn')[ndx];
        let id = parseMediaUrl(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);
            link.remove();
            btn.remove();
            video.append(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video-slider__youtube-btn_state_active');
    }

    function parseMediaUrl(media) {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)/i;
        let url = media.src;
        let match = url.match(regexp);
        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video-slider__iframe');
        iframe.width = 452;
        iframe.height = 254;

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1?enablejsapi=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();

    console.log('- Вёрстка соответствует макету. Ширина экрана 1024px +40\n- Вёрстка соответствует макету. Ширина экрана 768px +40\n- Вёрстка соответствует макету. Ширина экрана 420px +40\n- Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6\n- Совмещается адаптивная и респонсивная (резиновая) вёрстка +14\n- На ширине экрана 1024рх и меньше реализовано адаптивное меню +12\n- Оптимизация скорости загрузки страницы +8 (сервис при проверке показал результат в 97 баллов для мобильных устройств)');
});
