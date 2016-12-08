let qUrl = require('./quick-url');
let qUrlFixt = require('./quick-url.fixtures');

describe('building query params', () => {

  it('should build single level query params', () => {
    expect(qUrl.buildParams(qUrlFixt.singleLevelQueryParams))
    .toEqual(qUrlFixt.singleLevelQueryStrings);
  });

  it('should build multi level query params', () => {
    expect(qUrl.buildParams(qUrlFixt.multiLevelQueryParams))
    .toEqual(qUrlFixt.multiLevelQueryStrings);
  });
});

describe('building urls', () => {

  it('should build a URL given a `resource` path and a `queryParams` object', () => {
    expect(qUrl.buildUrl(qUrlFixt.resourcePath, qUrlFixt.multiLevelQueryParams))
    .toEqual(qUrlFixt.multiLevelUrl);
  })
})
