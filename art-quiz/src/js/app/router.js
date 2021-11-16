import View from './view';

class Router {
    handleHash() {
        this.hash = window.location.hash ? window.location.hash.slice(1) : '';

        if (this.hash) {
            View.render(View.pageIds[this.hash], this.hash);
        } else {
            View.render();
        }
    }

    init() {
        window.addEventListener('hashchange', () => {
            this.handleHash();
        });
        this.handleHash();
    }
}

export default Router;
