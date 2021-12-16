class Router {
  readonly hash: string;

  constructor() {
    this.hash = '';
  }

  getHash(): string {
    this.hash = window.location.hash ? window.location.hash.slice(1) : '';
    return this.hash;
  }
}

export default Router;
