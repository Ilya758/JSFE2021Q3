import { ICard } from '../../models/card';

export type TRenderMethod = {
  initToysArray: ICard[] | [];
  chosenToys: ICard[];
  snowIsFalling: boolean;
  id: string;
  activeTree: string;
  activeBackground: string;
  garlandColor: string;
  garlandIsEnabled: boolean;
};

abstract class Page {
  constructor(readonly id: string) {
    this.id = id;
  }

  abstract render({
    initToysArray,
    chosenToys,
    snowIsFalling,
    id,
  }: TRenderMethod): void;
}

export default Page;
