let {
  assign,
  compact,
  forEach,
  forOwn,
  isArray,
  isNumber,
  isString,
  isPlainObject,
  set
} = require('lodash');

// FUNCTIONS

/**
 * Builds a url given a `resource` path and a `query-params` object
 */
let buildUrl = (resources, queryParams) => {
  // Concatenate `resources` path with '/' and `queryParams` with
  return compact([compact(resources).join('/'), buildParams(queryParams).join('&')]).join('?');
}

/**
 * Builds a list of querystring given a query object
 */
let buildParams = (paramValue, paramName = '', params = []) => {

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

/**
 * Parses a url into the proper representation
 * (a `resource` path and a `query-params` object)
 */
let parseUrl = (url) => {
  let [protocol, path] = url.split('://');
  let [resources, params] = path.split('?');

  let resourcePath = resources.split('/');
  resourcePath[0] = protocol + '://' + resourcePath[0];

  let queryParams = parseParams(params);

  return { resourcePath, queryParams };
}

let parseParams = (params) => {
  let paramStrs = params.split('&');
  let queryParams = {};

  forEach(paramStrs, (paramStr) => {
    let [key, value] = paramStr.split('=');
    let keys = key.split('[').map(el => el.replace(']', ''));
    value = (value.indexOf(',') < 0) ? value : value.split(',');
    set(queryParams, keys, value);
  })

  return queryParams;
}

const qUrl = {
  buildUrl,
  buildParams,
  parseUrl
};

export default qUrl;
