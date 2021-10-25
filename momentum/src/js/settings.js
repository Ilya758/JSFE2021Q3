/* eslint-disable no-undef */

import translate from './translate';

import getWeather from './weather';

import getQuotes from './getQuotes';

import clock from './clock';

export default () => {
    const slider = 'settings__slider';
    const active = '_state_active';
    const tracks = document.querySelectorAll('.settings__slider-track');
    const thumbs = document.querySelectorAll('.settings__slider-thumb');

    const audioplayer = document.querySelector('.header__player');
    const weather = document.querySelector('.header__weather');
    const time = document.querySelector('.main__time');
    const date = document.querySelector('.main__date');
    const greetingElement = document.querySelector('.main__greeting-container');
    const quoteContainer = document.querySelector('.footer__quote-container');
    const visualizer = document.getElementById('canvas');
    const elems = [audioplayer, weather, time, date, greetingElement, quoteContainer, visualizer];

    const radioLang = document.querySelectorAll('.button_type_language');
    const sources = document.querySelectorAll('.button_type_src');

    const btnSettings = document.querySelector('.settings');

    btnSettings.addEventListener('click', () => {
        toggleVisibilityOfSettingsContainer();
    });

    function toggleVisibilityOfSettingsContainer() {
        const container = document.querySelector('.settings__container');
        container.classList.toggle('hidden');
    }

    Array.from(sources).forEach((src) => {
        src.addEventListener('click', () => {
            getActivePhotosource();
        });
    });

    Array.from(tracks).forEach((track, ndx) => {
        track.addEventListener('click', (event) => {
            if (event.target.classList.contains('settings__slider-thumb')) {
                setActiveThumb(event.target.parentElement, false, elems[ndx]);
            } else {
                setActiveThumb(event, true, elems[ndx]);
            }
        });
    });

    function setActiveThumb(event, isSlider, elem) {
        let track;
        let thumb;

        if (isSlider) {
            track = event.target;
            thumb = thumbs[event.target.dataset.count];
        } else {
            track = event;
            thumb = thumbs[event.dataset.count];
        }

        const mThumb = thumb.getBoundingClientRect();
        track.classList.toggle(`${slider}-track${active}`);

        if (+getComputedStyle(thumb).left.replace('px', '') > 1) {
            thumb.style.left = '-1px';
            track.dataset.enabled = false;
        } else {
            thumb.style.left = track.getBoundingClientRect().width - mThumb.width - track.clientLeft * 2 + 1 + 'px';
            track.dataset.enabled = true;
        }
        setActiveState(elem);
        localStorage.setItem(`${track.dataset.count}`, track.dataset.enabled);
    }

    function setActiveState(elem) {
        elem.classList.toggle('hidden');
    }

    function getStateAfterReload() {
        let enabledTracks = [];

        for (let i = 0; i < 7; i++) {
            let currentTrack = localStorage.getItem(i);
            if (currentTrack === 'true') {
                enabledTracks.push(tracks[i]);
            }
        }

        enabledTracks.forEach((track) => {
            setActiveThumb(track, false, elems[track.dataset.count]);
        });
    }

    function getActiveLang() {
        let lang;
        Array.from(radioLang).forEach((r) => {
            if (r.value === localStorage.currentLang) {
                r.checked = 'checked';
                lang = r.value;
                const setLangAfterReload = translate();
                setLangAfterReload(lang);
            }
        });
        return lang;
    }

    function getActivePhotosource() {
        Array.from(sources).forEach((src) => {
            if (localStorage.getItem('src') === src.value) {
                src.checked = 'checked';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const activeLang = getActiveLang();
        const setDateLang = clock();
        getStateAfterReload();
        getActiveLang();
        getWeather('', activeLang);
        getQuotes(activeLang);
        setDateLang(activeLang);
        getActivePhotosource();
    });
};
