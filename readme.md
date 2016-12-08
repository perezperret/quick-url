# quick-url

A very simple JavaScript URL builder. It is based on `ng2-router`'s navigation API. The query params can be infinitely nested, although the utility of this is limited, it's a nice recursion exercise.

## Usage

Simply pass in a `resource` path in the form of an array and a `params` object, the params will be parsed to a typical url query string, the params can be recursively nested objects as long as they end up un a string or an array of strings:

```javascript

  let qUrl = require('quick-url');

  let resource = ['http://example.com', 'users', 'a-123', 'accounts'];
  let params = {
    created: {
      after: '2017-8-6',
      before: '2019-7-5'
    },
    type: ['savings', 'checking'];
  }

  qUrl.buildUrl(resource, params);
  // http://example.com/users/a-123/accounts?created[after]=2017-8-6&created[before]=2019-7-5&type=savings,checking

```

## Ideas for future features

- Allow for configuring separators
- Parse URLs back to path and query objects

## License

MIT
