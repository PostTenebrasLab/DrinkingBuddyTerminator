import { IcartItem } from './cart-item';
export interface IbuyRequest {
    badge: string;
    cart: IcartItem[];
    product_id: number;
    time: number;
    hash: string;
    terminal_id: number;
}
