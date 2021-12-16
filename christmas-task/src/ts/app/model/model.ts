import { ICard } from '../../models/card';
import {
  IFilters,
  TColor,
  TCurrentOption,
  TOpt,
  TShape,
  TSize,
  TSorting,
  TUnionFilters,
} from '../../models/filters';
import data from '../../toys-data/toys';

class Model {
  protected initArrayOfToys: ICard[];

  protected filters: IFilters;

  protected filteredArray: ICard[];

  protected filterWasModified: boolean;

  constructor() {
    this.initArrayOfToys = data;
    this.filters = Model.getInitFilters();
    this.filteredArray = [];
    this.filterWasModified = false;
  }

  static getInitFilters(
    reset = false,
    options?: Partial<TUnionFilters>
  ): IFilters {
    let sortOptions = {
      ascendingAlp: false,
      descendingAlp: false,
      ascendingCount: false,
      descendingCount: false,
    };

    if (reset) {
      sortOptions = options as TSorting;
    }

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
      sorting: sortOptions,
      count: {
        low: 0,
        high: 12,
      },
      year: {
        low: 1940,
        high: 2021,
      },
    };
  }

  getInitArrayOfToys() {
    return this.initArrayOfToys;
  }

  filtrate(setting: string | string[], receivedMethod: string): ICard[] {
    if (receivedMethod === 'input') {
      this.filterInput(setting);
      this.cascadeCallingOfFiltratingFunctions(this.filters);
    } else {
      let objFromFilters = Object.entries(this.filters) as
        | TCurrentOption[]
        | IFilters;

      this.filteredArray = [];

      objFromFilters = Model.setFilter(objFromFilters, receivedMethod, setting);
      this.filterInput(this.inputValue);
      this.cascadeCallingOfFiltratingFunctions(objFromFilters);
      this.filters = objFromFilters;
      this.filterWasModified = false;
    }

    return this.filteredArray;
  }

  static setFilter(
    objFromFilters: TCurrentOption[] | IFilters,
    receivedMethod: string,
    setting: string | string[]
  ): IFilters {
    let filterArray = JSON.parse(
      JSON.stringify(objFromFilters)
    ) as TCurrentOption[];
    // find current method

    if (receivedMethod === 'reset') {
      // change all boolean settings except sorting to false

      const sortingOption = filterArray.find(
        filters => filters[0] === 'sorting'
      ) as TCurrentOption;
      const options = sortingOption[1];
      const resettedArray = this.getInitFilters(true, options);

      return resettedArray;
    }

    const sortingArray = filterArray.find(
      filters => filters[0] === receivedMethod
    ) as TCurrentOption;
    // find index of method
    const currentIndexOfFilter = filterArray.findIndex(
      opt => opt[0] === receivedMethod
    );
    // entries from current method options
    let sortOptions = Object.entries(sortingArray[1]) as TOpt[];

    if (typeof sortingArray[1] === 'boolean') {
      let value = sortingArray[1] as unknown as boolean;
      // reassignment value of current method
      filterArray[currentIndexOfFilter] = [receivedMethod, !value];
    } else {
      sortOptions = sortOptions.map((opt, ndx) => {
        const option = opt[0];
        let value = opt[1];

        if (receivedMethod === 'sorting') {
          value = false; // reset inappropriate values
        }

        if (receivedMethod === 'count' || receivedMethod === 'year') {
          return [opt[0], setting[ndx]];
        }

        if (option === setting) {
          if (
            receivedMethod === 'shape' ||
            receivedMethod === 'color' ||
            receivedMethod === 'size'
          ) {
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
    }

    return Object.fromEntries(filterArray) as unknown as IFilters;
  }

  cascadeCallingOfFiltratingFunctions(
    objFromFilters: TCurrentOption[] | IFilters
  ): void {
    this.filterShapes(objFromFilters);
    this.filterColors(objFromFilters);
    this.filterSizes(objFromFilters);
    this.filterFavorite(objFromFilters);
    this.filterCount(objFromFilters);
    this.filterYear(objFromFilters);
    this.filterAllCategories(objFromFilters);
    this.sortingToys(objFromFilters);
  }

  sortingToys(filters: TCurrentOption[] | IFilters): void {
    let tmp: ICard[];

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

    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      tmp = this.getTemporaryArray();
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
  }

  filterShapes(filters: TCurrentOption[] | IFilters) {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      const shapes: TShape = {
        bell: 'колокольчик',
        ball: 'шар',
        pine: 'шишка',
        star: 'звезда',
        snowflake: 'снежинка',
        'bird-toy': 'фигурка',
      };
      let count = 0;
      let tmp = this.getTemporaryArray();
      const options = Model.getCurrentOption(filters, 'shape');

      options.forEach(opt => {
        if (opt[1]) {
          this.filterWasModified = true;
          const name = opt[0];
          if (!count) {
            this.filteredArray = tmp.filter(
              card => shapes[name] === card.shape
            );
            count += 1;
          } else {
            tmp.forEach(card => {
              if (shapes[name] === card.shape) {
                this.filteredArray.push(card);
              }
            });
          }
        }
      });
    }
  }

  filterColors(filters: TCurrentOption[] | IFilters): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      let tmp = this.getTemporaryArray();
      const options = Model.getCurrentOption(filters, 'color');
      let count = 0;
      const colors: TColor = {
        white: 'белый',
        yellow: 'желтый',
        red: 'красный',
        blue: 'синий',
        green: 'зелёный',
      };

      options.forEach(opt => {
        if (opt[1]) {
          this.filterWasModified = true;
          const name = opt[0];
          if (!count) {
            this.filteredArray = tmp.filter(
              card => colors[name] === card.color
            );
            count += 1;
          } else {
            tmp.forEach(card => {
              if (colors[name] === card.color) {
                this.filteredArray.push(card);
              }
            });
          }
        }
      });
    }
  }

  filterSizes(filters: TCurrentOption[] | IFilters): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
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
          this.filterWasModified = true;
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
  }

  filterFavorite(filters: TCurrentOption[] | IFilters): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      let tmp = this.getTemporaryArray();
      const options = Model.getCurrentOption(filters, 'favorite');
      let count = 0;

      options.forEach(opt => {
        if (opt[1]) {
          this.filterWasModified = true;
          const name = opt[0];
          if (name) {
            if (!count) {
              this.filteredArray = tmp.filter(card => card.favorite === opt[1]);
              count += 1;
            } else {
              tmp.forEach(card => {
                if (card.favorite === opt[1]) {
                  this.filteredArray.push(card);
                }
              });
            }
          }
        }
      });
    }
  }

  filterAllCategories(filters: TCurrentOption[] | IFilters): void {
    const options = Model.getCurrentOption(filters, 'allCategories');

    options.forEach(opt => {
      if (opt[1]) {
        this.filterWasModified = true;
        this.filteredArray = this.getInitArrayOfToys();
      }
    });
  }

  filterCount(filters: TCurrentOption[] | IFilters): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      let tmp = this.getTemporaryArray();

      const options = Model.getCurrentOption(filters, 'count');

      this.filteredArray = tmp.filter(card => {
        const lowValue = options[0][1];
        const highValue = options[1][1];

        if (+lowValue !== 1 || +highValue !== 12) {
          this.filterWasModified = true;
        }

        return +lowValue <= +card.count && +highValue >= +card.count;
      });
    }
  }

  filterYear(filters: TCurrentOption[] | IFilters): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      let tmp = this.getTemporaryArray();
      const options = Model.getCurrentOption(filters, 'year');

      this.filteredArray = tmp.filter(card => {
        const lowValue = options[0][1];
        const highValue = options[1][1];

        if (+lowValue !== 1940 || +highValue !== 2021) {
          this.filterWasModified = true;
        }

        return +lowValue <= +card.year && +highValue >= +card.year;
      });
    }
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

    let ops: [[string, boolean]];

    if (typeof sortOptArray[1] === 'boolean') {
      const value = sortOptArray[1] as boolean;
      ops = [[method, value]];
      return ops;
    }

    const options = Object.entries(sortOptArray[1]) as unknown as [
      string,
      string | boolean
    ][];

    return options;
  }

  getFilteredArrayLength() {
    return this.filteredArray.length;
  }
}

export default Model;
