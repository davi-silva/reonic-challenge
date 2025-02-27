import { GetQueryParams } from './types';

export const toCapitalize = (string: string): string => {
  return `${string.substring(0, 1).toUpperCase()}${string.substring(
    1,
    string.length
  )}`;
};

export const getQueries = (queryObject: GetQueryParams) => {
  let queryString = '?';
  const lastItem = Object.entries(queryObject).length - 1;

  Object.entries(queryObject).forEach((query, index) => {
    if (query[1] !== undefined) {
      queryString += `${query[0]}=${query[1]}`;
      if (index !== lastItem) {
        queryString += '&';
      }
    }
  });

  return queryString;
};
