import {FilterColorType, FilterReasonType} from '../const';

const convertReasonType = (serverType) => {
  const [, reason] = Object.entries(FilterReasonType)
    .find(([, value]) => value.SERVER_TYPE === serverType);

  return reason.TYPE;
};

const convertColorType = (serverType) => {
  const [, color]  = Object.entries(FilterColorType)
    .find(([, value]) => value.SERVER_TYPE === serverType);

  return color.TYPE;
};

export const getFilterReason = (products, filterType) => {
  if (filterType === FilterReasonType.ALL.TYPE) {
    return products;
  }

  return products.filter((product) => convertReasonType(product.type) === filterType);
}

export const getFilterColor = (products, filterType) => {
  if (filterType.includes(FilterColorType.ALL.TYPE) || filterType.length === 0) {
    return products;
  }

  return products.filter((product) => filterType.includes(convertColorType(product.color)));
}
