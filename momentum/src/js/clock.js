export default () => {
    const time = document.querySelector('.main__time');

    (function showTime() {
        const date = new Date();
        const hours = date.getHours();
        const min = date.getMinutes();
        let sec = date.getSeconds();

        time.textContent = `${correctUnit(hours)}:${correctUnit(min)}:${correctUnit(sec)}`;

        if (time.textContent === '00:00:00') {
            showDate();
        }

        setTimeout(() => {
            showTime();
        }, 1000);
    })();

    function correctUnit(unit) {
        return unit < 10 ? `0${unit}` : unit;
    }

    function showDate() {
        const dateText = document.querySelector('.main__date');
        const options = {
            year: '2-digit',
            month: 'long',
            weekday: 'long'
        };

        const date = new Date().toLocaleString('en-EN', options);
        const sd = date.split(' ');

        const correctDate = `${sd[2]}, ${sd[0]} ${sd[1]}`;
        dateText.textContent = correctDate;
    }

    showDate();
};
