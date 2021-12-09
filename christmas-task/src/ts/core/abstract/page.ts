abstract class Page {
  protected abstract container: HTMLDivElement;

  constructor(readonly id: string) {
    this.id = id;
  }

  abstract render(): HTMLDivElement;
}

export default Page;
