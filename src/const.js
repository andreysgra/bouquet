export const UpdateType = {
  ERROR: 'ERROR',
  INIT: 'INIT',
  INIT_CART: 'INIT_CART',
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
  PATCH: 'PATCH'
};


export const UserAction = {
  ADD_CART: 'ADD_CART',
  DELETE_CART: 'DELETE_CART',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  DELETE_ALL_PRODUCTS: 'DELETE_ALL_PRODUCTS'
};

export const FilterReasonType = {
  ALL: {
    TYPE: 'all',
    NAME: 'Для всех'
  },
  BIRTHDAY: {
    TYPE: 'birthday',
    SERVER_TYPE: 'birthdayboy',
    NAME: 'Имениннику'
  },
  BRIDE: {
    TYPE: 'bride',
    SERVER_TYPE: 'bridge',
    NAME: 'Невесте'
  },
  MOTHER: {
    TYPE: 'mother',
    SERVER_TYPE: 'motherday',
    NAME: 'Маме'
  },
  COLLEAGUE: {
    TYPE: 'colleague',
    SERVER_TYPE: 'colleagues',
    NAME: 'Коллеге'
  },
  DARLING: {
    TYPE: 'darling',
    SERVER_TYPE: 'forlove',
    NAME: 'Любимой'
  }
};

export const FilterColorType = {
  ALL: {
    TYPE: 'all',
    NAME: 'все цвета'
  },
  RED: {
    TYPE: 'red',
    SERVER_TYPE: 'red',
    NAME: 'красный'
  },
  WHITE: {
    TYPE: 'white',
    SERVER_TYPE: 'white',
    NAME: 'белый',
  },
  LILAC: {
    TYPE: 'lilac',
    SERVER_TYPE: 'violet',
    NAME: 'сиреневый'
  },
  YELLOW: {
    TYPE: 'yellow',
    SERVER_TYPE: 'yellow',
    NAME: 'жёлтый'
  },
  PINK: {
    TYPE: 'pink',
    SERVER_TYPE: 'pink',
    NAME: 'розовый'
  }
};

export const SortType = {
  ASCENDING: 'ascending',
  DESCENDING: 'descending',
};

export const DESCRIPTION_LENGTH = 140;

export const PRODUCTS_COUNT_PER_STEP = 6;

export const TimeLimit = {
  LOWER: 350,
  UPPER: 1000
};
