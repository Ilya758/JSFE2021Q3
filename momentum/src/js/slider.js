/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import greeting from './greeting';

import photosource from './photosource';

export default () => {
    const dayOfTime = greeting('en-EN');
    const radio = document.querySelectorAll('.button_type_src');

    function getRandomNum() {
        let num = Math.floor(1 + Math.random() * 20);

        return num < 10 ? `0${num}` : num;
    }

    Array.from(radio).forEach((r) => [
        r.addEventListener('click', () => {
            setBg();
            setActivePhotosource();
        })
    ]);

    function setBg(isClicked, op) {
        const src = setActivePhotosource();

        if (src.value === 'github') {
            setImageFromGithub(isClicked, op);
        } else if (src.value === 'flickr') {
            photosource('flickr');
        } else {
            photosource('unsplash');
        }
    }

    setBg();

    (function getSlideNext() {
        const slideNext = document.querySelector('.slide-next');

        slideNext.onclick = () => {
            setBg(true, 'inc');
        };
    })();

    (function getSlidePrev() {
        const slideNext = document.querySelector('.slide-prev');

        slideNext.onclick = () => {
            setBg(true);
        };
    })();

    function setActivePhotosource() {
        const activeSrc = Array.from(radio).find((r) => r.checked);
        localStorage.setItem('src', activeSrc.value);
        return activeSrc;
    }

    function correctNumber(n, op = 'dec') {
        if (op === 'inc') {
            return n > 19 ? '01' : n < 9 ? `0${++n}` : ++n;
        }

        return n < 2 ? '20' : n <= 10 ? `0${--n}` : --n;
    }

    function setImageFromGithub(isClicked, op) {
        const img = new Image();
        const preUrl = 'https://raw.githubusercontent.com/ilya758/stage1-tasks/assets/images/';

        if (isClicked) {
            const url = document.body.style.backgroundImage;
            let imageNumber = url.match(/[0-9]{2}/g);

            img.src = `${preUrl}${dayOfTime}/${correctNumber(imageNumber[1], op)}.jpg`;
        } else {
            img.src = `${preUrl}${dayOfTime}/${getRandomNum()}.jpg`;
        }

        img.onload = () => {
            document.body.style.backgroundImage = `url(${img.src})`;
        };
    }
};
