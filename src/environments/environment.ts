// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import { mykey } from '../app/shared/local.conf';

// const BASE_URL = '/app/';
// const BASE_URL = '';
// const BASE_URL = 'http://10.10.20.45:5000/';
// const BASE_URL = 'http://10.42.65.20:5000/';
const BASE_URL = 'http://ptlpi:5000/';

export const environment = {
  production: false,
  mock: false,
  base_url: BASE_URL,
  fakeTime: 123456789,
  fakeHash: '587a6b195d845c190261d6ab',
  fakeKey: mykey,
};
