/* eslint-disable no-undef */
import clock from './clock';

import getQuotes from './getQuotes';

import weather from './weather';

export default () => {
    const radio = document.querySelectorAll('.button_type_language');
    const showDate = clock();

    Array.from(radio).forEach((r) => {
        r.addEventListener('click', () => {
            const lang = r.value;
            showDate(lang);
            getQuotes(lang);
            weather(localStorage.getItem('city'), lang);
            setLangToSettings(lang);
        });
    });

    function setLangToSettings(lang) {
        console.log(lang);
        const settings = document.querySelector('.settings__heading');
        const fields = document.querySelectorAll('.settings__text');
        const engSettings = ['Language', ' Audioplayer', 'Weather', 'Time', 'Date', 'Greeting', 'Quotes', 'Photosource'];
        const rusSettings = ['Язык', ' Аудиоплеер', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитаты', 'Фоторесурс'];
        let titles;

        if (lang === 'en-EN') {
            titles = engSettings;
            settings.textContent = 'Settings / Visibility';
        } else {
            titles = rusSettings;
            settings.textContent = 'Настройки / Видимость';
        }

        localStorage.setItem('currentLang', lang);

        Array.from(fields).forEach((field, ndx) => {
            field.textContent = titles[ndx];
            field.classList.toggle('appear');
            setTimeout(() => {
                field.classList.toggle('appear');
            }, 760);
        });
    }

    return setLangToSettings;
};
