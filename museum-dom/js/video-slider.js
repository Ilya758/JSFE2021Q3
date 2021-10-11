document.addEventListener('DOMContentLoaded', () => {
    /* eslint-disable no-undef*/
    new Swiper('.video-slider', {

        navigation: {
            nextEl: '.video-slider__btn-next',
            prevEl: '.video-slider__btn-prev'
        },
        pagination: {
            el: '.video-slider__pagination',
            renderBullet(index, className) {
                return `<li class="video-slider__dot item ${className}" data-count="${index + 1}"></li>`;
            },
            clickable: true,
        },
        loop: true,
        loopSlides: 3,
        setWrapperSize: true,
        initialSlide: 0,
        breakpoints: {
            1600: {
                slidesPerView: 3,
                spaceBetween: 42,
                centeredSlides: false,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 42,
                centeredSlides: true,
            },
            1024: {
                spaceBetween: 42,
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },

            420: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            0: {
                centeredSlides: true,
                slidesPerView: 1,
            }
        }
    });
    /* eslint-enable no-undef*/
    const counter = document.querySelector('.text_state_changable');
    const welcomeWrapper = document.querySelector('.welcome-slider__wrapper');

    welcomeWrapper.addEventListener('transitionend', () => {
        const li = document.querySelector('.dot.swiper-pagination-bullet.swiper-pagination-bullet-active');
        counter.textContent = `0${li.dataset.count}`;
    });
});
