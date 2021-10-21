/* eslint-disable no-undef */
export default () => {
    window.addEventListener('beforeunload', () => setNameToLS);
    function setNameToLS() {
        const name = document.querySelector('.main__name');

        document.addEventListener('DOMContentLoaded', () => {
            name.value = localStorage.getItem('name');
        });

        name.addEventListener('keyup', () => {
            localStorage.setItem('name', name.value);
        });
    }

    setNameToLS();
};
