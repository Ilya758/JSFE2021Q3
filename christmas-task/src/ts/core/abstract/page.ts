abstract class Page {
  constructor(readonly id: string) {
    this.id = id;
  }

  abstract render(): void;
}

export default Page;
