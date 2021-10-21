export default () => {
    function getGreeting() {
        const GREETINGS = [
            'night',
            'morning',
            'afternoon',
            'evening'
        ];
        const greetingElement = document.querySelector('.main__greeting');
        const hours = new Date().getHours();

        greetingElement.textContent = `Good ${GREETINGS[Math.floor(hours / 6)]},`;
    }
    getGreeting();
};
