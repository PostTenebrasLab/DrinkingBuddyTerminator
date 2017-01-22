import { ImessageBalance } from './api/message-balance';
// quite same of ImessageBalance with badge
export interface IbuddyUser extends ImessageBalance {
    badge: any;
}
