
import { ActionReducer, Action } from '@ngrx/store';
import { ADD_PROFILE } from './action-names';

export const profileReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case ADD_PROFILE:
            console.log('REDUCER');
            console.log(action.payload);

            return Object.assign([], state, action.payload);

        default:
            return state;
    }
};
