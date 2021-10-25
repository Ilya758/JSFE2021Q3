export default () => {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.body.classList.add('loaded_state_hiding');
        }, 2000);
        setTimeout(() => {
            document.body.classList.add('loaded');
            document.body.classList.remove('loaded');
        }, 2500);
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            document.body.removeChild(preloader);
        }, 3000);
    });
};
