/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import greeting from './greeting';

export default () => {
    const dayOfTime = greeting();

    function getRandomNum() {
        let num = Math.floor(1 + Math.random() * 21);

        return num < 10 ? `0${num}` : num;
    }

    function setBg(isClicked, op) {
        const img = new Image();
        const preUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

        if (isClicked) {
            const url = document.body.style.backgroundImage;
            let imageNumber = url.match(/[0-9]{2}/g);

            img.src = `${preUrl}${dayOfTime}/${correctNumber(imageNumber, op)}.jpg`;
        } else {
            img.src = `${preUrl}${dayOfTime}/${getRandomNum()}.jpg`;
        }

        img.onload = () => {
            document.body.style.backgroundImage = `url(${img.src})`;
        };
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

    function correctNumber(n, op = 'dec') {
        if (op === 'inc') {
            return n > 19 ? '01' : n < 9 ? `0${++n}` : ++n;
        }

        return n < 2 ? '20' : n <= 10 ? `0${--n}` : --n;
    }
};
