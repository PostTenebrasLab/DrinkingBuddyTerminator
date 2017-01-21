
import { ActionReducer, Action } from '@ngrx/store';
import {
    API_ERROR_CLEAN,
    API_ERROR,
    BUY_MSG,
    ADD_CREDIT,
    ADD_PRODUCT,
    API_BALANCE
} from './action-names';

export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {

    let status = (action.payload && action.payload.status !== undefined) ? action.payload.status : null;
    let ret = null;

    switch (action.type) {

        case API_ERROR_CLEAN:
            return Object.assign([], state, { err: null, msg: null });

        case API_ERROR:
            return Object.assign([], state, { err: action.payload });

        // case ADD_PRODUCT:
        //     return (status === 0) ? state : Object.assign([], state, { err: action.payload.message });

        case API_BALANCE:
            ret = (status === 0) ? { msg: 'OK' } : { err: action.payload.message };
            return Object.assign([], state, ret);

        case BUY_MSG:
            ret = (status === 0) ? { msg: action.payload.message.desc } : { err: action.payload.message };
            return Object.assign([], state, ret);

        case ADD_CREDIT:
            ret = (status === 0) ? { msg: 'OK' } : { err: action.payload.message };
            return Object.assign([], state, ret);

        default:
            return state;
    }

};


