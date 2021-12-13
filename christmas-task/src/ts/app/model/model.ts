import { ICard } from '../../models/card';
import {
  IFilters,
  TColor,
  TCurrentOption,
  TOpt,
  TShape,
  TSorting,
} from '../../models/filters';
import data from '../../toys-data/toys';

class Model {
  protected initArrayOfToys: ICard[];

  protected filters: IFilters;

  protected filteredArray: ICard[];

  constructor() {
    this.initArrayOfToys = data;
    this.filters = Model.getInitFilters();
    this.filteredArray = [];
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

    objFromFilters = Model.setFilter(objFromFilters, receivedMethod, setting);

    // cascade which starts filtrating functions

    this.filterShapes(objFromFilters);
    this.filterColors(objFromFilters);
    this.sortingToys(objFromFilters);

    this.filters = objFromFilters;

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
        if (receivedMethod === 'shape' || receivedMethod === 'color') {
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

  sortingToys(filters: TCurrentOption[] | IFilters): void {
    let tmp = this.getTemporaryArray();

    const ascendingAlp = (): void => {
      tmp = tmp.sort((a, b) => (a.name < b.name ? -1 : 1));
    };

    const descendingAlp = (): void => {
      tmp = tmp.sort((a, b) => (a.name > b.name ? -1 : 1));
    };

    const ascendingCount = (): void => {
      tmp = tmp.sort((a, b) => (+a.count < +b.count ? -1 : 1));
    };

    const descendingCount = (): void => {
      tmp = tmp.sort((a, b) => (+a.count > +b.count ? -1 : 1));
    };

    const options = Model.getCurrentOption(filters, 'sorting');

    options.forEach(opt => {
      if (opt[1]) {
        if (opt[0] === 'ascendingAlp') {
          ascendingAlp();
        } else if (opt[0] === 'descendingAlp') {
          descendingAlp();
        } else if (opt[0] === 'ascendingCount') {
          ascendingCount();
        } else {
          descendingCount();
        }
      }
    });

    this.filteredArray = tmp;
  }

  filterShapes(filters: TCurrentOption[] | IFilters): void {
    const shapes: TShape = {
      bell: 'колокольчик',
      ball: 'шар',
      pine: 'шишка',
      star: 'звезда',
      snowflake: 'снежинка',
      'bird-toy': 'фигурка',
    };
    let tmp = this.getInitArrayOfToys();
    const options = Model.getCurrentOption(filters, 'shape');

    options.forEach(opt => {
      if (opt[1]) {
        const name = opt[0];
        tmp.forEach(card => {
          if (shapes[name] === card.shape) {
            this.filteredArray.push(card);
          }
        });
      }
    });
  }

  filterColors(filters: TCurrentOption[] | IFilters): void {
    let tmp = this.getInitArrayOfToys();
    const options = Model.getCurrentOption(filters, 'color');

    const colors: TColor = {
      white: 'белый',
      yellow: 'желтый',
      red: 'красный',
      blue: 'синий',
      green: 'зелёный',
    };

    options.forEach(opt => {
      if (opt[1]) {
        const name = opt[0];
        tmp.forEach(card => {
          if (colors[name] === card.color) {
            this.filteredArray.push(card);
          }
        });

  filterSizes(filters: TCurrentOption[] | IFilters): void {
    let tmp = this.getTemporaryArray();
    const options = Model.getCurrentOption(filters, 'size');
    let count = 0;
    const sizes: TSize = {
      large: 'большой',
      medium: 'средний',
      small: 'малый',
    };

    options.forEach(opt => {
      if (opt[1]) {
        const name = opt[0];
        if (!count) {
          this.filteredArray = tmp.filter(card => sizes[name] === card.size);
          count += 1;
        } else {
          tmp.forEach(card => {
            if (sizes[name] === card.size) {
              this.filteredArray.push(card);
            }
          });
        }
      }
    });
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

  getFilteredArrayLength() {
    return this.filteredArray.length;
  }
}

export default Model;
