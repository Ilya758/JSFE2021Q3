import { ICard } from '../../models/card';
import { IToyOnTree } from '../../models/toyOnTree';

export type TRenderMethod = {
  initToysArray: ICard[] | [];
  chosenToys: ICard[];
  snowIsFalling: boolean;
  id: string;
  activeTree: string;
  activeBackground: string;
  garlandColor: string;
  garlandIsEnabled: boolean;
  toysOnTreeChars: IToyOnTree[];
  addHandler: (
    method: string,
    count: string,
    relCoords: { relX: number; relY: number }
  ) => IToysReceived;
};

export interface IToysReceived {
  count: string;
  emptySlot: boolean;
}

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
