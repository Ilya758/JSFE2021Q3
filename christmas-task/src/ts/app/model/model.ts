import { ICard } from '../../models/card';
import data from '../../toys-data/toys';

class Model {
  protected initArrayOfToys: ICard[];

  constructor() {
    this.initArrayOfToys = data;
  }

  getInitArrayOfToys() {
    return this.initArrayOfToys;
  }
}

export default Model;
