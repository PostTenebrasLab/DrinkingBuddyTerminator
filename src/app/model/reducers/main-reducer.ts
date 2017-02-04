
import { ActionReducer, Action } from '@ngrx/store';
import {
    API_ERROR_CLEAN,
    API_ERROR,
    BUY_MSG,
    ADD_CREDIT,
    ADD_PRODUCT,
    API_BALANCE,
    ADD_TO_CART_ERROR,
    MSG_NO_BADGE,
    PROFILE_LOGOFF
} from '../action-names';

// export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {

export function mainReducer(state: any = [], action: Action): ActionReducer<any> {

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

        case ADD_TO_CART_ERROR:
            return Object.assign([], state, { msg: 'Out of stock' });

        case MSG_NO_BADGE:
            return Object.assign([], state, { msg: 'No Badge' });

        case PROFILE_LOGOFF:
            return Object.assign([], state, { msg: 'Logged out' });


        default:
            return state;
    }

};


