let qUrl = require('./quick-url');
let qUrlFixt = require('./quick-url.fixtures');

describe('buildParams', () => {

  it('should build single level query params', () => {
    expect(qUrl.buildParams(qUrlFixt.singleLevelQueryParams))
    .toEqual(qUrlFixt.singleLevelQueryStrings);
  });

  it('should build multi level query params', () => {
    expect(qUrl.buildParams(qUrlFixt.multiLevelQueryParams))
    .toEqual(qUrlFixt.multiLevelQueryStrings);
  });
});

describe('buildUrl', () => {

  it('should build a URL given a `resource` path and a `queryParams` object', () => {
    expect(qUrl.buildUrl(qUrlFixt.resourcePath, qUrlFixt.multiLevelQueryParams))
    .toEqual(qUrlFixt.multiLevelUrl);
  })

  it('should work without `queryParams`', () => {
    let { queryParams } = qUrl.parseUrl('http://example.com')
    expect(queryParams).toBeFalsy()
  })

})

describe('parseUrl', () => {

  it('should parse a `resource` path from a URL', () => {
    let { resourcePath } = qUrl.parseUrl(qUrlFixt.multiLevelUrl);
    expect(resourcePath).toEqual(qUrlFixt.resourcePath);
  });

  it('should parse a `queryParams` object from a URL', () => {
    let { queryParams } = qUrl.parseUrl(qUrlFixt.multiLevelUrl);
    expect(queryParams).toEqual(qUrlFixt.multiLevelQueryParams);
  });

  it('should work without `queryParams` in the URL', () => {
    let { queryParams } = qUrl.parseUrl('http://example.com')
    expect(queryParams).toBeFalsy()
  })
})
