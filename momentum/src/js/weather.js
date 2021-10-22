/* eslint-disable no-undef */
export default async (val) => {
    if (!val) {
        val = 'Минск';
    }

    const weatherError = document.querySelector('.header__weather-error');
    const weatherIcon = document.querySelector('.icon-weather');
    const temperature = document.querySelector('.temperature');
    const weatherDescription = document.querySelector('.weather-description');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&lang=ru&appid=405a6a61aacc8e0d5cdf86c2331f3a53&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`City ${val} couldn't found.`);
        }

        const data = await response.json();

        toggleVisibilityOfWeatherInfo();

        weatherIcon.className = `icon-weather owf owf-${data.weather[0].id}`;
        temperature.textContent = `${Math.floor(data.main.temp)}°C, `;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;

        return data;
    } catch (e) {
        toggleVisibilityOfWeatherInfo('error', e.message);
    }

    function toggleVisibilityOfWeatherInfo(state = 'success', errorText) {
        [weatherIcon, temperature, weatherDescription, wind, humidity].forEach((el) => {
            if (state === 'success') {
                el.classList.remove('disabled');
                weatherError.textContent = '';
            } else {
                el.classList.add('disabled');
                weatherError.textContent = errorText;
            }
        });
    }
};
