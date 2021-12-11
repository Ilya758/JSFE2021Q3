import { ICard } from '../../models/card';

abstract class Page {
  constructor(readonly id: string) {
    this.id = id;
  }

  abstract render(initToysArray: ICard[]): void;
}

export default Page;
