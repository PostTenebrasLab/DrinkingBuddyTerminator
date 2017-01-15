import { InMemoryDbService } from 'angular2-in-memory-web-api';

import { data_sync } from './generators/sync-response';

export class MockData implements InMemoryDbService {
    createDb() {

        let sync = data_sync;

        return { sync };

    };
}
