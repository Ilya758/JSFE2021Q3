/* eslint-disable no-undef */
import getWeather from './weather';
export default () => {
    window.addEventListener('beforeunload', () => {
        setNameToLS();
        setCity();
    });
    function setNameToLS() {
        const name = document.querySelector('.main__name');

        document.addEventListener('DOMContentLoaded', () => {
            name.value = localStorage.getItem('name');
        });

        name.addEventListener('keyup', () => {
            localStorage.setItem('name', name.value);
        });
    }

    function setCity() {
        const city = document.querySelector('.input__city');

        city.addEventListener('blur', () => {
            const data = getWeather(city.value);

            data.then((d) => {
                localStorage.setItem('errorText', document.querySelector('.header__weather-error').textContent);
                localStorage.setItem('cod', d.cod);
                localStorage.setItem('temp', Math.floor(d.main.temp));
                localStorage.setItem('desc', d.weather[0].description);
                localStorage.setItem('wind', Math.floor(d.wind.speed));
                localStorage.setItem('hum', d.main.humidity);
            }
            );
        });

        document.addEventListener('DOMContentLoaded', () => {
            city.value = localStorage.getItem('city');
            getWeather(city.value);
        });

        city.addEventListener('focus', () => {
            localStorage.setItem('city', city.value);

            city.addEventListener('keyup', () => {
                localStorage.setItem('city', city.value);
            });
        });
    }

    setNameToLS();
    setCity();
};
