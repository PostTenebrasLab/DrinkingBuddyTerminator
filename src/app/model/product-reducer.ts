
import { ActionReducer, Action } from '@ngrx/store';
import {
    ADD_PRODUCT,
} from './action-names';

export const productReducer: ActionReducer<any[]> = (state = [], action: Action) => {

    let status = (action.payload && action.payload.status !== undefined) ? action.payload.status : null;

    switch (action.type) {

        case ADD_PRODUCT:
            console.log('REDUCER');
            console.log(action.payload);
            // return (status !== 0) ? state : Object.assign([], state, action.payload);
            return Object.assign([], state, action.payload);

        default:
            return state;
    }
};
