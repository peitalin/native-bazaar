import { profile } from './profile';
import { listings } from './listings';
import { inventory } from './inventory';
import { images } from './images';
import { misc } from './misc';
import { follow } from './follow';
import { moderators } from './moderators';
// export const APIgatewayURL = 'https://cloud.ob1.io:443'
// export const APIgatewayURL = 'https://gateway.ob1.io'
export const APIgatewayURL = 'http://localhost:4002';
export const ob1API = {
    profile: profile,
    listings: listings,
    inventory: inventory,
    images: images,
    misc: misc,
    follow: follow,
    moderators: moderators,
};
//# sourceMappingURL=index.js.map