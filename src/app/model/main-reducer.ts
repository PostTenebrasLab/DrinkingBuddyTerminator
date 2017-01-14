
import { ActionReducer, Action } from '@ngrx/store';
import { ADD_PROFILE } from './action-names';

export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case ADD_PROFILE:
            return Object.assign([], state, action.payload);

        default:
            return state;
    }
};
