import { isFunction } from 'util';

import { ActionReducer, Action } from '@ngrx/store';
import {
    API_ERROR_CLEAN,
    API_ERROR,
    BUY_MSG,
    ADD_CREDIT,
} from './action-names';

export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case API_ERROR_CLEAN:
            return Object.assign([], state, { err: null, msg: null });

        case API_ERROR:
            return Object.assign([], state, { err: action.payload });

        case BUY_MSG:

            return Object.assign([], state, { msg: action.payload });

        case ADD_CREDIT:
            return Object.assign([], state, { msg: action.payload });

        default:
            return state;
    }

    // checkForError(payload: any){
    
    // }

};


