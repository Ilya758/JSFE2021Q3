class Router {
  readonly hash: string;

  constructor() {
    this.hash = window.location.hash ? window.location.hash.slice(1) : '';
  }

  getHash(): string {
    return this.hash;
  }
}

export default Router;
