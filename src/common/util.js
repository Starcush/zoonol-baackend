import _ from 'lodash';
import { InvalidParameterError } from './error';

export const toCamelCase = (params) => {
  if (_.isUndefined(params) || _.isNull(params)) {
    throw new InvalidParameterError(
      'invalid parameter error: toCamelCase()',
      500
    );
  }

  if (_.isObject(params)) {
    return _.mapKeys(params, (value, key) => {
      return _.camelCase(key);
    });
  }

  if (_.isString(params)) {
    return _.camelCase(params);
  }

  return params;
};

export const toRowsOnBuilder = (knexQueryResult) => {
  if (!knexQueryResult) {
    throw new InvalidParameterError(
      'invalid parameter error: toRowsOnBuilder()',
      500
    );
  }

  const camelCaseRows = [];
  for (let snakeCaseRow of knexQueryResult) {
    camelCaseRows.push(toCamelCase(snakeCaseRow));
  }

  return camelCaseRows;
};

export const toInsertKeyOnBuilder = (knexQueryResult) => {
  if (!knexQueryResult) {
    return knexQueryResult;
  }

  if (knexQueryResult.length > 0) {
    return knexQueryResult[0];
  }

  return knexQueryResult;
};