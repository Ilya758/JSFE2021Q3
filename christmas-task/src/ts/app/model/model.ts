import { ICard } from '../../models/card';
import { IFilters, TCurrentOption, TOpt } from '../../models/filters';
import data from '../../toys-data/toys';

class Model {
  protected initArrayOfToys: ICard[];

  protected filters: IFilters;

  protected filteredArray: ICard[];

  constructor() {
    this.initArrayOfToys = data;
    this.filters = Model.getInitFilters();
    this.filteredArray = this.initArrayOfToys;
  }

  static getInitFilters(): IFilters {
    return {
      allCategories: false,
      color: {
        white: false,
        yellow: false,
        red: false,
        green: false,
        blue: false,
      },
      favorite: false,
      shape: {
        bell: false,
        ball: false,
        pine: false,
        star: false,
        snowflake: false,
        'bird-toy': false,
      },
      size: {
        large: false,
        medium: false,
        small: false,
      },
      sorting: {
        ascendingAlp: false,
        descendingAlp: false,
        ascendingCount: false,
        descendingCount: false,
      },
      value: {
        count: {
          low: 1940,
          high: 2021,
        },
        year: {
          low: 1940,
          high: 2021,
        },
      },
    };
  }

  getInitArrayOfToys() {
    return this.initArrayOfToys;
  }

  filtrate(setting: string, receivedMethod: string): ICard[] {
    let objFromFilters = Object.entries(this.filters) as
      | TCurrentOption[]
      | IFilters;

    this.filteredArray = [];

    if (receivedMethod === 'sorting') {
      objFromFilters = Model.setFilter(objFromFilters, receivedMethod, setting);
    }

    if (receivedMethod === 'shape') {
      objFromFilters = Model.setFilter(objFromFilters, receivedMethod, setting);
    }

    // cascade which starts filtrating functions

    this.filterShapes(objFromFilters);
    this.sortingToys(objFromFilters);

    this.filters = objFromFilters as IFilters;

    return this.filteredArray;
  }

  static setFilter(
    objFromFilters: TCurrentOption[] | IFilters,
    receivedMethod: string,
    setting: string
  ): IFilters {
    const filterArray = JSON.parse(
      JSON.stringify(objFromFilters)
    ) as TCurrentOption[];
    // find current method
    const sortingArray = filterArray.find(
      filters => filters[0] === receivedMethod
    ) as TCurrentOption;
    // find index of method
    const currentIndexOfFilter = filterArray.findIndex(
      opt => opt[0] === receivedMethod
    );
    // entries from current method options
    let sortOptions = Object.entries(sortingArray[1]) as TOpt[];
    // mapping setting
    sortOptions = sortOptions.map(opt => {
      const option = opt[0];
      let value = opt[1];

      if (receivedMethod === 'sorting') {
        value = false; // reset inappropriate values
      }

      if (option === setting) {
        if (receivedMethod === 'shape') {
          value = !value; // click to option starts boolean assertion
        } else {
          value = true;
        }
      }

      return [opt[0], value];
    });
    // reassignment value of current method
    filterArray[currentIndexOfFilter] = [
      receivedMethod,
      Object.fromEntries(sortOptions),
    ];
    return Object.fromEntries(filterArray) as unknown as IFilters;
  }

    let result: IFilters;

    result = Object.fromEntries(filterArray) as unknown as IFilters;

    return result;
    // return filterArray;
  }

  static sortingToys(array: ICard[], setting: string): ICard[] {
    let cloneArray = JSON.parse(JSON.stringify(array)) as ICard[];

    function ascendingAlp(arr: ICard[]) {
      return arr.sort((a, b) => (a.name < b.name ? -1 : 1));
    }

    function descendingAlp(arr: ICard[]) {
      return arr.sort((a, b) => (a.name > b.name ? -1 : 1));
    }

    function ascendingCount(arr: ICard[]) {
      return arr.sort((a, b) => (+a.count < +b.count ? -1 : 1));
    }

  getTemporaryArray() {
    return this.filteredArray.length
      ? this.filteredArray
      : this.getInitArrayOfToys();
  }

  static getCurrentOption(
    filters: TCurrentOption[] | IFilters,
    method: string
  ) {
    const sortOptArray = (Object.entries(filters) as TCurrentOption[]).find(
      filter => filter[0] === method
    ) as unknown as [string, TSorting];

    const options = Object.entries(sortOptArray[1]) as unknown as [
      string,
      boolean
    ][];

    return options;
  }
}

export default Model;
