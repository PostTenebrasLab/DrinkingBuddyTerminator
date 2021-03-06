
import { ActionReducer, Action } from '@ngrx/store';
import * as moment from 'moment';

import { IbuddyItem } from '../buddy-item';
import { IproductStore } from './product-store';
import {
    ADD_PRODUCT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    BUY_MSG,
} from '../action-names';

// export const productReducer: ActionReducer<IproductStore> = (state: IproductStore = { stock: [], cart: [] }, action: Action) => {

export function productReducer(state: any = { stock: [], cart: [] }, action: Action): ActionReducer<any> {

    let status = (action.payload && action.payload.status !== undefined) ? action.payload.status : null;

    switch (action.type) {

        case ADD_PRODUCT:
            return Object.assign({}, state, { stock: action.payload });

        case ADD_TO_CART:

            let newCart = [];
            let newStock = [];

            let item = state.cart.find((i: IbuddyItem) => i.id === action.payload.id);
            if (!item) {
                item = {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    quantity: 1,
                };
                newCart = [item].concat(state.cart);
            } else {
                newCart = state.cart.map((i: IbuddyItem) => {
                    if (i.id === action.payload.id) {
                        i.quantity++;
                    }
                    return i;
                });

            }

            newStock = state.stock.map((i: IbuddyItem) => {
                if (i.id === action.payload.id) {
                    i.quantity--;
                }
                return i;
            });

            return Object.assign({}, { stock: newStock, cart: newCart, time: moment() }) as any;


        case REMOVE_FROM_CART:

            let cartItem = state.cart.find((i: IbuddyItem) => i.id === action.payload.id);
            if (cartItem.quantity < 2) {
                let index = state.cart.indexOf(cartItem);
                if (index > -1) {
                    state.cart.splice(index, 1);
                }
            } else {
                cartItem.quantity--;
            }

            let stockItem = state.stock.find((i: IbuddyItem) => i.id === action.payload.id);
            stockItem.quantity++;

            return Object.assign({}, state, { time: moment() });

        case EMPTY_CART:
            return Object.assign({}, state, { cart: [], time: moment() });

        case BUY_MSG:
            let ret = (status === 0) ? { cart: [], time: moment() } : { time: moment() };
            return Object.assign({}, state, ret);

        default:
            return state;
    }
};
