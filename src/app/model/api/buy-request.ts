import { IcartItem } from './cart-item';
export interface IbuyRequest {
    badge: string;
    cart: IcartItem[];
    time: number;
    hash: string;
    terminal_id: number;
}
 