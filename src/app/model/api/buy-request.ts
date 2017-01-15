import { IcartItem } from './cart-item';
export interface IbuyRequest {
    Badge: string;
    cart: IcartItem[];
    ProductId: number;
    Time: number;
    Hash: string;
    TID: number;
}
