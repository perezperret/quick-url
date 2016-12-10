# quick-url

A very simple JavaScript URL builder. It is based on `ng2-router`'s navigation API. The query params can be infinitely nested, although the utility of this is limited, it's a nice recursion exercise.

## Usage

Simply pass in a `resource` path in the form of an array and a `params` object, the params will be parsed to a typical url query string, the params can be recursively nested objects as long as they end up in a string or an array of strings:

```javascript

  let qUrl = require('quick-url');

  let resource = ['http://example.com', 'users', 'a-123', 'accounts'];
  let params = {
    filter: {
      created: {
        after: '2017-8-6',
        before: '2019-7-5'
      }
    },
    type: ['savings', 'checking'],
  }

  qUrl.buildUrl(resource, params);
  /**
   * http://example.com/users/a-123/accounts?
   *   filter[created][after]=2017-8-6&filter[created][before]=2019-7-5
   *   &type=savings,checking
  */

```

Conversely, pass in a URL to convert it back into object notation:

```javascript

  let qUrl = require('quick-url');
  let url = [
    'http://example.com/users/a-123/accounts?',
    'filter[created][after]=2017-8-6&filter[created][before]=2019-7-5',
    '&type=savings,checking'
  ].join('');

  let { resourcePath, queryParams } = qUrl.parseUrl(url);

  /*
    resourcePath = ['http://example.com', 'users', 'a-123', 'accounts'];
    queryParams = {
      filter: {
        created: {
          after: '2017-8-6',
          before: '2019-7-5'
        }
      },
      type: ['savings', 'checking'],
    };
  */

```

## TODOs

-[ ] Allow for configuring separators
-[ ] Handle fragments (#params)

## License

MIT
