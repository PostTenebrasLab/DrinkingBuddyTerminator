
import { ActionReducer, Action } from '@ngrx/store';
import {
    API_BALANCE,
    ADD_CREDIT,
    PROFILE_LOGIN,
} from '../action-names';

export const profileReducer: ActionReducer<any> = (state = {}, action: Action) => {
    switch (action.type) {

        case API_BALANCE:
            return Object.assign({}, state, action.payload.message);

        case ADD_CREDIT:
            return Object.assign({}, state, action.payload.message);

        case PROFILE_LOGIN:
            return Object.assign({}, state, { badge: action.payload});

        default:
            return state;
    }
};
