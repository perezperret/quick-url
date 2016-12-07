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


// TESTING

// Data
// Sample resource info
let testInput = {
  id: '17',
  type: 'activity-requests',
  action: 'findAll',
  baseUrl: 'http://localhost:3000'
}
// Sample resource options
let testArgs = { 
  query: {
    owner: { type: 'provider' },
    filters: {
      'client-first-name': 'Santiago',
      'client-last-name': 'Perez',
      'category': ['fly', 'swim', 'row'],
      'species': {
        'animal': {
          'chordata': ['lion', 'tiger', 'sapiens'],
          'funghi': ['prosciutto']
        },
        'plant': {
          trees: ['baobab', 'saman', 'ficus'],
          pines: 'none'
        }
      }
    },
    offset: 0,
    limit: 10
  }
}
// Sample query params
let testParams = {
  filter: {
    categories: {
      sports: {
        football: 'shoes'
      },
      bars: {
        'new-york': ['the-perfect-pint', 'lavo'],
        'boston': ['boring', 'red-sox'],
        'philly': 'kellys'
      }
    }
  },
  include: {
    owner: 'santi',
    lazy: ['one', 'two', 'three'],
    object: {
      boolean1: 'false',
      boolean2: 'true'
    }
  }
};

// Expectations
let resultParams = [
  'filter[categories][sports][football]=shoes',
  'include[owner]=santi',
  'include[lazy]=one,two,three',
  'include[object][boolean1]=false',
  'include[object][boolean2]=true'
]
let resultUrl = `
  http://localhost:3000/provider/activity-requests/17?
  filters[client-first-name]=Santiago&
  filters[client-last-name]=Perez&
  filters[category]=fly,swim,row&
  filters[species][animal][chordata]=lion,tiger,sapiens&
  filters[species][animal][funghi]=prosciutto&
  filters[species][plant][trees]=baobab,saman,ficus&
  filters[species][plant][pines]=none&
  offset=0&limit=10
`

// Tests
console.log(buildParams(testParams)); //=== resultParams
console.log(buildUrl(testInput, testArgs)); //=== resultUrl 
