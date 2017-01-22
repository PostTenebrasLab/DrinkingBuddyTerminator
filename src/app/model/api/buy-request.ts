import { IbuddyItem } from '../buddy-item';
import { IcartItem } from './cart-item';
export interface IbuyRequest {
    badge: string;
    cart: IbuddyItem[]; // todo: filter IbuddyItems to IcartItem
    time: number;
    hash: string;
    terminal_id: number;
}
