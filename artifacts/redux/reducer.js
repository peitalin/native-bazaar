import { Actions } from './actions';
import { ArbitersDemo } from '../typings/reduxTypes';
import { APIgatewayURL } from './requests';
// import history for React-Route programmatic routing
import history from './routerHistory';
const initialReduxStateOB1 = {
    profile: {
        name: "OmiseGo"
    },
    browsedProfile: {},
    browsedListings: [],
    peerProfiles: [],
    listings: [],
    followers: [],
    following: [],
    moderators: [],
    scrollY: 0,
};
export const reduxReducerOB1 = (state = initialReduxStateOB1, action) => {
    switch (action.type) {
        case Actions.OB1.GET_OB_PROFILE().type:
            return Object.assign({}, state, { profile: action.payload });
        case Actions.OB1.PUT_OB_PROFILE().type:
            return Object.assign({}, state, { profile: action.payload });
        case Actions.OB1.PATCH_OB_PROFILE().type:
            return Object.assign({}, state, { profile: action.payload });
        case Actions.OB1.CLEAR_OB_PEER_PROFILES().type:
            return Object.assign({}, state, { peerProfiles: [] });
        case Actions.OB1.APPEND_OB_PEER_PROFILES().type:
            return Object.assign({}, state, { peerProfiles: [...state.peerProfiles, ...action.payload] });
        case Actions.OB1.CLEAR_LISTINGS().type:
            return Object.assign({}, state, { listings: [] });
        case Actions.OB1.APPEND_LISTINGS().type:
            return Object.assign({}, state, { listings: [...state.listings, ...action.payload] });
        case Actions.OB1.SET_BROWSED_LISTINGS().type:
            return Object.assign({}, state, { browsedListings: action.payload });
        case Actions.OB1.SET_BROWSED_PROFILE().type:
            return Object.assign({}, state, { browsedProfile: action.payload });
        case Actions.OB1.SET_SCROLL_Y().type:
            return Object.assign({}, state, { scrollY: action.payload });
        case Actions.OB1.CLEAR_FOLLOWERS().type:
            return Object.assign({}, state, { followers: [] });
        case Actions.OB1.APPEND_FOLLOWERS().type:
            return Object.assign({}, state, { followers: [...state.followers, ...action.payload] });
        case Actions.OB1.CLEAR_FOLLOWING().type:
            return Object.assign({}, state, { following: [] });
        case Actions.OB1.APPEND_FOLLOWING().type:
            return Object.assign({}, state, { following: [...state.following, ...action.payload] });
        case Actions.OB1.CLEAR_MODERATORS().type:
            return Object.assign({}, state, { moderators: [] });
        case Actions.OB1.APPEND_MODERATORS().type:
            return Object.assign({}, state, { moderators: [...state.moderators, ...action.payload] });
        default: {
            return state;
        }
    }
};
const initialReduxStateLogin = {
    username: 'peita-001',
    password: 'password',
    auth64: '',
    isLoading: false,
    APIgatewayURL: APIgatewayURL,
};
export const reduxReducerLogin = (state = initialReduxStateLogin, action) => {
    switch (action.type) {
        case Actions.Login.UPDATE_USERNAME().type:
            return Object.assign({}, state, { username: action.payload });
        case Actions.Login.UPDATE_PASSWORD().type:
            return Object.assign({}, state, { password: action.payload });
        case Actions.Login.UPDATE_AUTH64().type:
            return Object.assign({}, state, { auth64: action.payload });
        case Actions.Login.IS_LOADING().type:
            return Object.assign({}, state, { isLoading: action.payload });
        default: {
            return state;
        }
    }
};
const initialReduxStateUser = {
    storeSettings: {
        country: {
            name: "Australia",
            cca2: 'AU',
            countryCode: '61',
        },
        currency: {
            symbol: 'Ƀ',
            name: 'Bitcoin',
            code: 'BTC',
        },
        shippingAddresses: [
            {
                id: 0,
                street: 'Haven Street',
                streetNumber: '18',
                suburb: 'Helena',
                city: 'New York City',
                state: 'New York',
                postCode: '10001',
                country: {
                    name: "United States",
                },
                chosenAddress: true,
            },
            {
                id: 1,
                street: "Griever's Place",
                streetNumber: '23',
                suburb: 'Grouch Grove',
                city: 'Las Vegas',
                state: 'Nevaga',
                postCode: '92001',
                country: {
                    name: "United States",
                },
                chosenAddress: false,
            },
        ],
        policies: {
            terms: 'terms',
            conditions: 'conditions',
        },
        moderators: [
            ArbitersDemo.arbiter1,
            ArbitersDemo.arbiter2,
        ]
    },
    moderationSettings: {
        isModerator: false,
    },
    advancedSettings: {
        walletSettings: {
            resync: false,
            bitcoinAddress: '0x123123980x123sdf',
        }
    }
};
export const reduxReducerUser = (state = initialReduxStateUser, action) => {
    switch (action.type) {
        case Actions.User.UPDATE_USER_PROFILE().type:
            return Object.assign({}, state, { userProfile: action.payload });
        case Actions.User.UPDATE_STORE_SETTINGS().type:
            return Object.assign({}, state, { storeSettings: action.payload });
        case Actions.User.UPDATE_SHIPPING_ADDRESSES().type:
            return Object.assign({}, state, { storeSettings: Object.assign({}, state.storeSettings, { shippingAddresses: action.payload }) });
        default: {
            return state;
        }
    }
};
const initialReduxStateRouter = {
    routeName: 'Home',
    routeURL: '/'
};
export const reduxReducerRouter = (state = initialReduxStateRouter, action) => {
    switch (action.type) {
        case Actions.Router.UPDATE_ROUTE_NAME().type:
            // manually push routeURL to history Stack
            history.push(action.payload.routeURL);
            return Object.assign({}, state, { routeName: action.payload.routeName, routeURL: action.payload.routeURL });
        default: {
            return state;
        }
    }
};
const ob1Profile = {
    peerID: "",
    handle: "",
    name: "",
    location: "",
    about: "",
    shortDescription: "",
    nsfw: false,
    vendor: false,
    moderator: false,
    contactInfo: {
        website: "",
        email: "",
        phoneNumber: "",
        social: []
    },
    colors: {
        primary: "#FFFFFF",
        secondary: "#ECEEF2",
        text: "#252525",
        highlight: "#2BAD23",
        highlightText: "#252525"
    },
    stats: {
        followerCount: 0,
        followingCount: 0,
        listingCount: 0,
        ratingCount: 0,
        averageRating: 0
    },
    bitcoinPubkey: "",
    lastModified: ""
};
//# sourceMappingURL=reducer.js.map