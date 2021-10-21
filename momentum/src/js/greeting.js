export default () => {
    const GREETINGS = [
        'night',
        'morning',
        'afternoon',
        'evening'
    ];
    const greetingElement = document.querySelector('.main__greeting');
    const hours = new Date().getHours();

    const dayOfTime = GREETINGS[Math.floor(hours / 6)];
    greetingElement.textContent = `Good ${dayOfTime},`;

    return dayOfTime;
};
