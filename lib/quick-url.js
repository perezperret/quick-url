let { compact, forOwn, isArray, isNumber, isString, isPlainObject } = require('lodash');

// FUNCTIONS

/**
 * Builds a url given a `resource` path and a `query-params` object
 */
function buildUrl(resources, queryParams) {
  // Concatenate `resources` path with '/' and `queryParams` with
  return compact([compact(resources).join('/'), buildParams(queryParams).join('&')]).join('?');
}

/**
 * Builds a list of querystring given a query object
 */
function buildParams(paramValue, paramName = '', params = []) {

  // If given value is an end param value, push to array
  // If it is an array
  if (isArray(paramValue)) {
    params.push(`${paramName}=${paramValue.join(',')}`);
    return;
  }
  // If it is a string
  if (isString(paramValue) || isNumber(paramValue)) {
    params.push(`${paramName}=${paramValue}`);
    return;
  }

  // If it is an object, solve recursively
  if (isPlainObject(paramValue)) {
    forOwn(paramValue, (value, key) => {
      name = (paramName) ? `${paramName}[${key}]` : key;
      buildParams(value, name, params);
    });
  }

  // When all objects (ie nodes) have been resolved, return the final array
  return params;
}

exports.buildUrl = buildUrl;
exports.buildParams = buildParams;
