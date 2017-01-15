import { IbuddyItem } from '../buddy-item';
//{"Hash": "1A7E5EA4DCEB8DB6", "Header": "DrinkingBuddy", "Products": ["Sprite 1.00", "1664 2.00", "Bud 2.00", "Food 4.00"], "Time": 1484403814.0}

export interface IsyncResponse {
    hash: string;
    header: string;
    products: IbuddyItem[];
    time: number;
}
