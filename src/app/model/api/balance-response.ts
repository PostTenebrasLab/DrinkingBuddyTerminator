// post to
//http://10.10.20.45:5000/balance
//
// with {badge_id: string} 
//ret = {'Melody': "c5", 'Message': messages, 'Time': now}
//
//cfr: https://github.com/PostTenebrasLab/DrinkingBuddyServer/blob/master/drinkingbuddy.py
//
// Status
// 0: ok
// !0: error
export interface IbalanceResponse {
    melody: string;
    message: string;
    time: any;
    status: number;
}
