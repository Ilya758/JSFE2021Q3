document.addEventListener('DOMContentLoaded', () => {
    /* eslint-disable no-undef*/
    new Swiper('.tickets-slider', {
        loop: true,
        autoplay: { delay: 3000 },
        spaceBetween: 250,
        speed: 1500,
        initialSlide: 1
    });
    /* eslint-enable no-undef*/
});
