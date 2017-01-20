
import { ActionReducer, Action } from '@ngrx/store';
import {
    API_ERROR_CLEAN,
    API_ERROR,
} from './action-names';

export const mainReducer: ActionReducer<any[]> = (state = [], action: Action) => {
    switch (action.type) {

        case API_ERROR_CLEAN:
            return Object.assign([], state, {err: null});

        case API_ERROR:
            console.log('API_ERROR');
            console.log(action.payload);

            return Object.assign([], state, {err: action.payload});

        default:
            return state;
    }
};
