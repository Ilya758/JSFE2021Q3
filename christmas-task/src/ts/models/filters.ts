export interface IFilters {
  sorting: TSorting;
  shape: TShape;
  color: TColor;
  size: TSize;
  allCategories: TAllCategories;
  favorite: TFavorite;
  value: TValue;
}

export type TSorting = {
  ascendingAlp: boolean;
  descendingAlp: boolean;
  ascendingCount: boolean;
  descendingCount: boolean;
};

export type TShape =
  | {
      bell: boolean;
      ball: boolean;
      pine: boolean;
      star: boolean;
      snowflake: boolean;
      'bird-toy': boolean;
    }
  | {
      [prop: string]: string;
    };

export type TColor =
  | {
      white: boolean;
      yellow: boolean;
      red: boolean;
      green: boolean;
      blue: boolean;
    }
  | {
      [prop: string]: string;
    };

export type TSize =
  | {
      large: boolean;
      medium: boolean;
      small: boolean;
    }
  | {
      [prop: string]: string;
    };

export type TAllCategories = boolean;

export type TFavorite = boolean;

export type TValue = {
  count: TValues;
  year: TValues;
};

export type TValues = {
  low: number;
  high: number;
};

export type TUnionFilters =
  | TSorting
  | TShape
  | TColor
  | TSize
  | TValue
  | TAllCategories
  | TFavorite;

export type TCurrentOption = [string, Partial<TUnionFilters>];

export type TOpt = [string, boolean];
