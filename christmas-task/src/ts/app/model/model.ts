import { ICard } from '../../models/card';
import {
  IFilters,
  TCurrentOption,
  TOpt,
  TSorting,
  TUnionFilters,
} from '../../models/filters';
import data from '../../toys-data/toys';

class Model {
  protected initArrayOfToys: ICard[];

  protected filters: IFilters;

  protected filteredArray: ICard[];

  protected filterWasModified: boolean;

  protected inputValue: string;

  protected chosenToys: ICard[];

  protected storageHasValues: boolean;

  constructor() {
    this.initArrayOfToys = data;
    this.filters = Model.getCurrentFilter();
    this.filteredArray = [];
    this.filterWasModified = false;
    this.inputValue = '';
    this.chosenToys = [];
    this.storageHasValues = false;
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
        low: 1,
        high: 12,
      },
      year: {
        low: 1940,
        high: 2020,
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
      this.storageHasValues = true;
      Model.commit<IFilters>('filters', this.filters);
      Model.commit<ICard[]>('filteredArray', this.filteredArray);
      Model.commit<boolean>('storageHasValues', this.storageHasValues);
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
    ['shape', 'color', 'size', 'favorite', 'allCategories'].forEach(method => {
      this.booleanFilter(objFromFilters, method);
    });

    ['count', 'year'].forEach(method => {
      this.valuesFilter(objFromFilters, method);
    });

    this.sortingToys(objFromFilters);
  }

  booleanFilter(
    filters: TCurrentOption[] | IFilters,
    receivedMethod: string
  ): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      const cardChars = {
        color: {
          white: 'белый',
          yellow: 'желтый',
          red: 'красный',
          blue: 'синий',
          green: 'зелёный',
        },
        shape: {
          bell: 'колокольчик',
          ball: 'шар',
          pine: 'шишка',
          snowflake: 'снежинка',
          'bird-toy': 'фигурка',
        },
        size: {
          large: 'большой',
          medium: 'средний',
          small: 'малый',
        },
      };

      let count = 0;
      let tmp = this.getTemporaryArray();
      const options = Model.getCurrentOption(filters, receivedMethod);

      options.forEach(opt => {
        if (opt[1]) {
          this.filterWasModified = true;
          let [name, value] = opt;

          if (receivedMethod === 'allCategories') {
            this.filteredArray = this.getInitArrayOfToys();
            return;
          }

          if (!count) {
            this.filteredArray = tmp.filter(card => {
              if (receivedMethod === 'favorite') {
                return card[receivedMethod] === value;
              }

              return (
                cardChars[receivedMethod as keyof typeof cardChars][
                  name as keyof Partial<TUnionFilters>
                ] === card[receivedMethod as keyof ICard]
              );
            });
            count += 1;
          } else {
            tmp.forEach(card => {
              if (
                (receivedMethod === 'favorite' &&
                  card[receivedMethod] === opt[1]) ||
                cardChars[receivedMethod as keyof typeof cardChars][
                  name as keyof Partial<TUnionFilters>
                ] === card[receivedMethod as keyof ICard]
              ) {
                this.filteredArray.push(card);
              }
            });
          }
        }
      });
    }
  }

  valuesFilter(
    filters: TCurrentOption[] | IFilters,
    receivedMethod: string
  ): void {
    if (!this.filterWasModified || this.getFilteredArrayLength()) {
      let tmp = this.getTemporaryArray();

      const thresholdValues = [
        [1, 12],
        [1940, 2020],
      ];

      const values =
        receivedMethod === 'count' ? thresholdValues[1] : thresholdValues[0];

      const options = Model.getCurrentOption(filters, receivedMethod);

      this.filteredArray = tmp.filter(card => {
        const lowValue = options[0][1];
        const highValue = options[1][1];

        if (+lowValue !== +values[0] || +highValue !== +values[1]) {
          this.filterWasModified = true;
        }

        return (
          +lowValue <= +card[receivedMethod as keyof ICard] &&
          +highValue >= +card[receivedMethod as keyof ICard]
        );
      });
    }
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

  filterInput(setting: string | string[]): void {
    let tmp = this.getInitArrayOfToys();

    const value = setting as string;
    this.inputValue = value;
    this.filterWasModified = true;
    this.filteredArray = tmp.filter(card =>
      card.name.toLowerCase().includes(value)
    );
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

  filtrateChosenToys(id: string) {
    let tmp = this.getInitArrayOfToys();
    const tmpToys = Model.getChosenToys();

    if (!tmpToys.length) {
      tmp.forEach(card => {
        if (+card.num === +id) {
          this.chosenToys.push(card);
        }
      });
      Model.commit<ICard[]>('chosenToys', this.chosenToys);
    } else {
      // filtrate current array of chosen toys
      tmp = tmpToys.filter(card => +card.num !== +id);
      this.chosenToys = tmp;

      if (tmp.length === 20) {
        return {
          full: true,
          toys: this.chosenToys,
        };
      }

      if (tmp.length === tmpToys.length) {
        this.initArrayOfToys.forEach(card => {
          if (+card.num === +id) {
            this.chosenToys.push(card);
          }
        });
      } else {
        this.chosenToys = tmp;
      }

      Model.commit<ICard[]>('chosenToys', this.chosenToys);
    }

    return {
      full: false,
      toys: this.chosenToys,
    };
  }

  static getChosenToys() {
    return Model.pull<ICard[]>('chosenToys');
  }

  static getCurrentFilter() {
    let currentFilter = Model.pull<IFilters>('filters');

    if (!Array.isArray(currentFilter)) {
      return currentFilter;
    }

    return this.getInitFilters();
  }

  static commit<T>(key: string, obj: T): void {
    window.localStorage.setItem(key, JSON.stringify(obj));
  }

  static pull<T>(key: string): T {
    const item = window.localStorage.getItem(key) || '[]';
    return JSON.parse(item) as T;
  }

  static getStorageHasValuesProp() {
    const value = Model.pull<boolean>('storageHasValues');
    return Array.isArray(value) ? '' : value;
  }

  static clearLocalStorage() {
    window.localStorage.clear();
  }
}

export default Model;
