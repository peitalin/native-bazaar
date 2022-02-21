
import { ActionType, Actions } from './actions'
import {
  iOB1Profile,
  iListing,
  iOB1Settings,
} from '../typings/ob1Types'
import { APIgatewayURL } from './requests'
// import history for React-Route programmatic routing
import history from './routerHistory'


///// Grand Redux State Shape ////////
export interface ReduxState {
  reduxOB1: ReduxStateOB1
  reduxLogin: ReduxStateLogin
  reduxUser: ReduxStateUser
  reduxRouter: ReduxStateRouter
  reduxSettings: ReduxStateSettings
}

//////////////////////////////////////
////// OB1 state reducer //////////
export interface ReduxStateOB1 {
  profile: iOB1Profile
  browsedProfile: iOB1Profile
  browsedListings: iListing[],
  peerProfiles: iOB1Profile[]
  listings: iListing[]
  followers: iOB1Profile[]
  following: iOB1Profile[]
  moderators: iOB1Profile[]
  myModerators: iOB1Profile[]
  scrollY: number
}
const initialReduxStateOB1: ReduxStateOB1 = {
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
  myModerators: [],
  scrollY: 0,
}
export const reduxReducerOB1 = (
    state: ReduxStateOB1 = initialReduxStateOB1,
    action: ActionType<any>
  ): ReduxStateOB1 => {

  switch ( action.type ) {
    case Actions.OB1.STORE_OB_PROFILE().type:
      return { ...state, profile: action.payload }

    case Actions.OB1.PUT_OB_PROFILE().type:
      return { ...state, profile: action.payload }

    case Actions.OB1.PATCH_OB_PROFILE().type:
      return { ...state, profile: action.payload }

    case Actions.OB1.CLEAR_OB_PEER_PROFILES().type:
      return { ...state, peerProfiles: [] }

    case Actions.OB1.APPEND_OB_PEER_PROFILES().type:
      return { ...state, peerProfiles: [ ...state.peerProfiles, ...action.payload ] }

    case Actions.OB1.CLEAR_LISTINGS().type:
      return { ...state, listings: [] }

    case Actions.OB1.APPEND_LISTINGS().type:
      return { ...state, listings: [ ...state.listings, ...action.payload ] }

    case Actions.OB1.SET_BROWSED_LISTINGS().type:
      return { ...state, browsedListings: action.payload }

    case Actions.OB1.SET_BROWSED_PROFILE().type:
      return { ...state, browsedProfile: action.payload }

    case Actions.OB1.SET_SCROLL_Y().type:
      return { ...state, scrollY: action.payload }

    case Actions.OB1.CLEAR_FOLLOWERS().type:
      return { ...state, followers: [] }

    case Actions.OB1.APPEND_FOLLOWERS().type:
      return { ...state, followers: [ ...state.followers, ...action.payload ] }

    case Actions.OB1.CLEAR_FOLLOWING().type:
      return { ...state, following: [] }

    case Actions.OB1.APPEND_FOLLOWING().type:
      return { ...state, following: [ ...state.following, ...action.payload ] }

    case Actions.OB1.CLEAR_MODERATORS().type:
      return { ...state, moderators: [] }

    case Actions.OB1.APPEND_MODERATORS().type:
      return { ...state, moderators: [ ...state.moderators, ...action.payload ] }

    case Actions.OB1.CLEAR_MY_MODERATORS().type:
      return { ...state, myModerators: [] }

    case Actions.OB1.APPEND_MY_MODERATORS().type:
      return { ...state, myModerators: [ ...state.myModerators, ...action.payload ] }

    default: {
      return state
    }
  }
}




////// Login state reducer //////////
export interface ReduxStateLogin {
  username: string
  password: string
  auth64: string
  isLoading: boolean
  APIgatewayURL: string
}
const initialReduxStateLogin: ReduxStateLogin = {
  username: 'peita-001',
  password: 'password',
  auth64: '',
  isLoading: false,
  APIgatewayURL: APIgatewayURL,
}
export const reduxReducerLogin = (
    state: ReduxStateLogin = initialReduxStateLogin,
    action: ActionType
  ): ReduxStateLogin => {

  switch ( action.type ) {

    case Actions.Login.UPDATE_USERNAME().type:
      return { ...state, username: action.payload }

    case Actions.Login.UPDATE_PASSWORD().type:
      return { ...state, password: action.payload }

    case Actions.Login.UPDATE_AUTH64().type:
      return { ...state, auth64: action.payload }

    case Actions.Login.IS_LOADING().type:
      return { ...state, isLoading: action.payload }

    default: {
      return state
    }
  }
}


////// User state reducer //////////
export interface ReduxStateUser {
}
const initialReduxStateUser: ReduxStateUser = {
}

export const reduxReducerUser = (
    state: ReduxStateUser = initialReduxStateUser,
    action: ActionType
  ): ReduxStateUser => {

  switch ( action.type ) {
    default: {
      return state
    }
  }
}

////// Settings state reducer //////////
export interface ReduxStateSettings {
  settings?: iOB1Settings
}
const initialReduxStateSettings: ReduxStateSettings = {
  settings: {
    blockedNodes: [],
    country: "Spain",
    language: "en-US",
    localCurrency: "ETH",
    mispaymentBuffer: 1,
    paymentDataInQR: false,
    refundPolicy: "",
    shippingAddresses: [
      {
        name: 'Mr. N Wail',
        company: 'Narwhale Expeditions Company Ltd',
        addressLineOne: "Griever's Place",
        addressLineTwo: 'Grouch Grove',
        city: 'Las Vegas',
        state: 'Nevaga',
        country: "United States",
        postalCode: "4111",
        addressNotes: 'Near the post office',
      },
    ],
    showNotifications: true,
    showNsfw: true,
    smtpSettings: {
        notifications: false,
        password: "",
        recipientEmail: "",
        senderEmail: "",
        serverAddress: "",
        username: ""
    },
    storeModerators: ["QmVB42zLCzJqHznT5ostfsG9xuVAXzPWRioijogCXzAkxQ"],
    termsAndConditions: "",
    version: "/openbazaar-go:0.7.3/"
  },
}


export const reduxReducerSettings = (
    state: ReduxStateSettings = initialReduxStateSettings,
    action: ActionType
  ): ReduxStateSettings => {

  switch ( action.type ) {

    case Actions.Settings.UPDATE_SETTINGS().type:
      return { ...state, settings: action.payload }

    case Actions.Settings.UPDATE_COUNTRY().type:
      return {
        ...state,
        settings: {
          ...state.settings,
          country: action.payload
        }
      }

    case Actions.Settings.UPDATE_SHIPPING_ADDRESSES().type:
      return {
        ...state,
        settings: {
          ...state.settings,
          shippingAddresses: action.payload
        }
      }

    default: {
      return state
    }
  }
}



////// React-Router state reducer //////////
export interface ReduxStateRouter {
  routeName: string
  routeURL: string
}
const initialReduxStateRouter: ReduxStateRouter = {
  routeName: 'Home',
  routeURL: '/'
}
export const reduxReducerRouter = (
    state: ReduxStateRouter = initialReduxStateRouter,
    action: ActionType<{ routeName: string, routeURL: string }>
  ): ReduxStateRouter => {

  switch ( action.type ) {

    case Actions.Router.UPDATE_ROUTE_NAME().type:
      // manually push routeURL to history Stack
      history.push(action.payload.routeURL)
      return {
        ...state,
        routeName: action.payload.routeName,
        routeURL: action.payload.routeURL,
      }

    default: {
      return state
    }
  }
}


export interface OB1Response {
  ob1Profile: iOB1Profile
}


