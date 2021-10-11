document.addEventListener('DOMContentLoaded', () => {
    /* eslint-disable no-undef*/
    new Swiper('.welcome-slider', {
        navigation: {
            nextEl: '.welcome-slider__btn-next',
            prevEl: '.welcome-slider__btn-prev'
        },
        pagination: {
            el: '.welcome-slider__dots',
            renderBullet(index, className) {
                return `<li class="dot ${className}" data-count="${++index}"></li>`;
            },
            clickable: true,
        },
        loop: true,
    });
    /* eslint-enable no-undef*/
    const counter = document.querySelector('.text_slider_changable');
    const welcomeWrapper = document.querySelector('.welcome-slider__wrapper');

    welcomeWrapper.addEventListener('transitionend', () => {
        const li = document.querySelector('.dot.swiper-pagination-bullet.swiper-pagination-bullet-active');
        counter.textContent = `0${li.dataset.count}`;
    });
});
