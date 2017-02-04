import { InMemoryDbService } from 'angular-in-memory-web-api';

import { data_sync } from './generators/data_sync';
import { data_balance } from './generators/data_balance';
import { data_buy } from './generators/data_buy';
import { data_credit } from './generators/data_credit';

export class MockData implements InMemoryDbService {

    createDb() {

        let sync = data_sync;
        let balance = data_balance;
        let buy = data_buy;
        let credit = data_credit;

        return {
            sync,
            balance,
            buy,
            credit,
        };

    }

}

