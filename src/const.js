export const UpdateType = {
  ERROR: 'ERROR',
  INIT: 'INIT',
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
  PATCH: 'PATCH'
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
