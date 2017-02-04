
import { ActionReducer, Action } from '@ngrx/store';
import {
    API_BALANCE,
    ADD_CREDIT,
    PROFILE_LOGIN,
    PROFILE_LOGOFF,
} from '../action-names';

// export const profileReducer: ActionReducer<any> = (state = {}, action: Action) => {

export function profileReducer(state: any = {}, action: Action): ActionReducer<any> {
    switch (action.type) {

        case API_BALANCE:
        console.log(API_BALANCE);
            return Object.assign({}, state, action.payload.message);

        case ADD_CREDIT:
        console.log(ADD_CREDIT);
            return Object.assign({}, state, action.payload.message);

        case PROFILE_LOGIN:
        console.log(PROFILE_LOGIN);
            return Object.assign({}, state, { badge: action.payload});

        case PROFILE_LOGOFF:
        console.log(PROFILE_LOGOFF);
            return {} as any;

        default:
            return state;
    }
};
