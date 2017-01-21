import { IbuddyItem } from '../buddy-item';

export interface IsyncResponse {
    hash: string;
    header: string;
    products: IbuddyItem[];
    time: number;
    // status: number; // ...anytime soon
}
