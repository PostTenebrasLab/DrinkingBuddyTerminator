
import { ActionReducer, Action } from '@ngrx/store';
import { API_BALANCE } from './action-names';

export const profileReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case API_BALANCE:
            console.log('REDUCER');
            console.log(action.payload);

            return Object.assign([], state, action.payload.message);

        default:
            return state;
    }
};
