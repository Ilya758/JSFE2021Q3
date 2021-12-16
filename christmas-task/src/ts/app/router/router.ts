class Router {
  readonly hash: string;

  constructor() {
    this.hash = '';
  }

  getHash(): string {
    this.hash = window.location.hash ? window.location.hash.slice(1) : '';
    return this.hash;
  }

  static resetHashAfterReload() {
    window.location.hash = '';
  }
}

export default Router;
