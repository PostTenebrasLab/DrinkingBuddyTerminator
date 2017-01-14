
import { ActionReducer, Action } from '@ngrx/store';
import { ADD_PRODUCT } from './action-names';

export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case ADD_PRODUCT:
            console.log('REDUCER');
            console.log(action.payload);

            return Object.assign([], state, action.payload);

        default:
            return state;
    }
};
