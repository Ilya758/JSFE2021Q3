export default (lang = 'en-EN') => {
    const GREETINGS_ENG = [
        'night',
        'morning',
        'afternoon',
        'evening'
    ];
    const GREETINGS_RUS = [
        'Доброй ночи',
        'Доброе утро',
        'Добрый день',
        'Добрый вечер'
    ];
    const greetingElement = document.querySelector('.main__greeting');
    const name = document.querySelector('.main__name');
    const hours = new Date().getHours();
    const count = Math.floor(hours / 6);

    let dayOfTime;

    if (lang === 'ru-RU') {
        dayOfTime = GREETINGS_RUS[count];
        greetingElement.textContent = `${dayOfTime},`;
        name.placeholder = '[Введите имя]';
    } else {
        dayOfTime = GREETINGS_ENG[count];
        greetingElement.textContent = `Good ${dayOfTime},`;
        name.placeholder = '[Enter name]';
    }

    return dayOfTime;
};
