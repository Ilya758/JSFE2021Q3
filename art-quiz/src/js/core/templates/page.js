class Page {
    constructor(id) {
        this.container = document.createElement('div');
        this.container.id = id;
    }

    render() {
        return this.container;
    }
}

export default Page;
