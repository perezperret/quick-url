let { assign } = require('lodash');

const singleLevelQueryParams = {
  include: ['users', 'profiles', 'accounts'],
  role: 'admin',
  'min-age': '17',
  'max-age': '22'
};

const singleLevelQueryStrings = [
  'include=users,profiles,accounts',
  'role=admin',
  'min-age=17',
  'max-age=22'
];

const multiLevelQueryParams = {
  singer: 'Mercury',
  include: {
    relationships: {
      users: {
        a: 'John',
        b: 'Paul',
        c: ['Ringo', 'George'],
        d: {
          stones: ['Mick', 'Keith']
        }
      },
      profiles: {
        mags: ['rolling-stone', 'billboard', 'time'],
        tv: ['cbs', 'nbc']
      },
      accounts: 'bank-accounts'
    }
  },
  roles: {
    music: ['guitar', 'bass', 'drums', 'vocals']
  },
  age: {
    min: '17',
    max: '22'
  }
};

const multiLevelQueryStrings = [
  'singer=Mercury',
  'include[relationships][users][a]=John',
  'include[relationships][users][b]=Paul',
  'include[relationships][users][c]=Ringo,George',
  'include[relationships][users][d][stones]=Mick,Keith',
  'include[relationships][profiles][mags]=rolling-stone,billboard,time',
  'include[relationships][profiles][tv]=cbs,nbc',
  'include[relationships][accounts]=bank-accounts',
  'roles[music]=guitar,bass,drums,vocals',
  'age[min]=17',
  'age[max]=22'
];

const resourcePath = ['http://example.com', 'users', '17', 'accounts'];

const multiLevelUrl = [
  'http://example.com/users/17/accounts?',
  'singer=Mercury&',
  'include[relationships][users][a]=John&',
  'include[relationships][users][b]=Paul&',
  'include[relationships][users][c]=Ringo,George&',
  'include[relationships][users][d][stones]=Mick,Keith&',
  'include[relationships][profiles][mags]=rolling-stone,billboard,time&',
  'include[relationships][profiles][tv]=cbs,nbc&',
  'include[relationships][accounts]=bank-accounts&',
  'roles[music]=guitar,bass,drums,vocals&',
  'age[min]=17&',
  'age[max]=22'
].join('');

assign(exports, {
  singleLevelQueryParams,
  singleLevelQueryStrings,
  multiLevelQueryParams,
  multiLevelQueryStrings,
  resourcePath,
  multiLevelUrl
});
