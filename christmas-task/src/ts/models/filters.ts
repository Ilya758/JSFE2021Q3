export interface IFilters {
  sorting: TSorting;
  shapes: TShape;
  color: TColor;
  size: TSize;
  allCategories: boolean;
  favorite: boolean;
  value: {
    count: TValue;
    year: TValue;
  };
}

type TSorting = {
  ascendingAlp: boolean;
  descendingAlp: boolean;
  ascendingCount: boolean;
  descendingCount: boolean;
};

type TShape = {
  bell: boolean;
  ball: boolean;
  pine: boolean;
  star: boolean;
  snowflake: boolean;
  'bird-toy': boolean;
};

type TColor = {
  white: boolean;
  yellow: boolean;
  red: boolean;
  green: boolean;
  blue: boolean;
};

type TSize = {
  large: boolean;
  medium: boolean;
  small: boolean;
};

type TValue = {
  low: number;
  high: number;
};
