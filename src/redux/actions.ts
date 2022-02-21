
import {
  iOB1Profile,
  iListing,
  iOB1Settings,
} from '../typings/ob1Types'

export type ActionType<T = any> = { type: string, payload: T }

// Action Creating Functions
export const Actions = {
  OB1: {
    // this action dispatches the INIT_REGISTER_OB_PROFILE saga
    INIT_REGISTER_OB_PROFILE: (payload?: {
      username: string
      email: string
      password: string
      password_confirmation: string
    }): ActionType<any> => ({
      type: "INIT_REGISTER_OB_PROFILE",
      payload: payload
    }),

    // this action dispatches the INIT_GET_OB_PROFILE saga
    INIT_GET_OB_PROFILE: (payload?: {
      username?: string
      password?: string
    }): ActionType<any> => ({
      type: "INIT_GET_OB_PROFILE",
      payload: payload
    }),
    STORE_OB_PROFILE: (payload?: iOB1Profile): ActionType<iOB1Profile> => ({
      type: "STORE_OB_PROFILE",
      payload: payload
    }),

    // this action dispatches the INIT_RELOAD_OB_PROFILE saga
    INIT_RELOAD_OB_PROFILE: (payload?: { auth64?: string }): ActionType<any> => ({
      type: "INIT_RELOAD_OB_PROFILE",
      payload: payload
    }),

    // this action dispatches the INIT_RELOAD_OB_SETTINGS saga
    INIT_RELOAD_OB_SETTINGS: (payload?: { auth64?: string }): ActionType<any> => ({
      type: "INIT_RELOAD_OB_SETTINGS",
      payload: payload
    }),

    // this action dispatches the INIT_PUT_OB_PROFILE saga
    INIT_PUT_OB_PROFILE: (payload?: {
      body: Object
      auth64?: string
      username?: string
      password?: string
    }): ActionType<any> => ({
      type: "INIT_PUT_OB_PROFILE",
      payload: payload
    }),
    PUT_OB_PROFILE: (payload?: iOB1Profile): ActionType<iOB1Profile> => ({
      type: "PUT_OB_PROFILE",
      payload: payload
    }),

    // this action dispatches the INIT_PATCH_OB_PROFILE saga
    INIT_PATCH_OB_PROFILE: (): ActionType<any> => ({
      type: "INIT_PATCH_OB_PROFILE",
      payload: undefined
    }),
    PATCH_OB_PROFILE: (payload?: iOB1Profile): ActionType<iOB1Profile> => ({
      type: "PATCH_OB_PROFILE",
      payload: payload
    }),

    // this action dispatches the INIT_GET_OB_PEER_PROFILES saga
    INIT_GET_OB_PEER_PROFILES: (payload?: { auth64: string }): ActionType<any> => ({
      type: "INIT_GET_OB_PEER_PROFILES",
      payload: payload
    }),
    CLEAR_OB_PEER_PROFILES: (): ActionType<any> => ({
      type: "CLEAR_OB_PEER_PROFILES",
      payload: []
    }),
    APPEND_OB_PEER_PROFILES: (payload?: iOB1Profile[]): ActionType<iOB1Profile[]> => ({
      type: "APPEND_OB_PEER_PROFILES",
      payload: payload
    }),

    // this action dispatches the INIT_GET_LISTINGS saga
    INIT_GET_LISTINGS: (payload?: { peerId: string }): ActionType<{ peerId: string }> => ({
      type: "INIT_GET_LISTINGS",
      payload: payload
    }),
    CLEAR_LISTINGS: (): ActionType<any> => ({
      type: "CLEAR_LISTINGS",
      payload: []
    }),
    APPEND_LISTINGS: (payload?: iListing[]): ActionType<iListing[]> => ({
      type: "APPEND_LISTINGS",
      payload: payload
    }),

    // Get the listings for the current store your browsing
    SET_BROWSED_LISTINGS: (payload?: iListing[]): ActionType<iListing[]> => ({
      type: "SET_BROWSED_LISTINGS",
      payload: payload
    }),
    // Get the userprofile for the current store your browsing
    SET_BROWSED_PROFILE: (payload?: iOB1Profile): ActionType<iOB1Profile> => ({
      type: "SET_BROWSED_PROFILE",
      payload: payload
    }),

    INIT_VISIT_STORE: (payload?: iOB1Profile): ActionType<iOB1Profile> => ({
      type: "INIT_VISIT_STORE",
      payload: payload
    }),

    SET_SCROLL_Y: (payload?: number): ActionType<number> => ({
      type: "SET_SCROLL_Y",
      payload: payload
    }),

    INIT_GET_FOLLOWERS: (payload?: {
      username?: string
      password?: string
      auth64?: string
      peerId?: string
    }): ActionType<any> => ({
      type: "INIT_GET_FOLLOWERS",
      payload: payload
    }),
    CLEAR_FOLLOWERS: (): ActionType<iOB1Profile[]> => ({
      type: "CLEAR_FOLLOWERS",
      payload: undefined
    }),
    APPEND_FOLLOWERS: (payload?: iOB1Profile[]): ActionType<iOB1Profile[]> => ({
      type: "APPEND_FOLLOWERS",
      payload: payload
    }),

    INIT_GET_FOLLOWING: (payload?: {
      username?: string
      password?: string
      auth64?: string
      peerId?: string
    }): ActionType<any> => ({
      type: "INIT_GET_FOLLOWING",
      payload: payload
    }),
    CLEAR_FOLLOWING: (): ActionType<iOB1Profile[]> => ({
      type: "CLEAR_FOLLOWING",
      payload: undefined
    }),
    APPEND_FOLLOWING: (payload?: iOB1Profile[]): ActionType<iOB1Profile[]> => ({
      type: "APPEND_FOLLOWING",
      payload: payload
    }),

    // get a list of nearby moderators
    INIT_GET_MODERATORS: (payload?: {
      username?: string
      password?: string
      auth64?: string
      async?: string
      include?: string
    }): ActionType<any> => ({
      type: "INIT_GET_MODERATORS",
      payload: payload
    }),
    CLEAR_MODERATORS: (): ActionType<iOB1Profile[]> => ({
      type: "CLEAR_MODERATORS",
      payload: undefined
    }),
    APPEND_MODERATORS: (payload?: iOB1Profile[]): ActionType<iOB1Profile[]> => ({
      type: "APPEND_MODERATORS",
      payload: payload
    }),

    // get a list of MY moderators that I've chosen
    INIT_GET_MY_MODERATORS: (payload?: {
      username?: string
      password?: string
      auth64?: string
      async?: string
      include?: string
    }): ActionType<any> => ({
      type: "INIT_GET_MY_MODERATORS",
      payload: payload
    }),
    CLEAR_MY_MODERATORS: (): ActionType<iOB1Profile[]> => ({
      type: "CLEAR_MY_MODERATORS",
      payload: undefined
    }),
    APPEND_MY_MODERATORS: (payload?: iOB1Profile[]): ActionType<iOB1Profile[]> => ({
      type: "APPEND_MY_MODERATORS",
      payload: payload
    }),
  },

  Login: {
    UPDATE_USERNAME: ( payload?: string ): ActionType<string> => ({
      type: "UPDATE_USERNAME",
      payload: payload
    }),
    UPDATE_PASSWORD: ( payload?: string ): ActionType<string> => ({
      type: "UPDATE_PASSWORD",
      payload: payload
    }),
    UPDATE_AUTH64: ( payload?: string ): ActionType<string> => ({
      type: "UPDATE_AUTH64",
      payload: payload
    }),
    IS_LOADING: ( payload?: boolean ): ActionType<boolean> => ({
      type: "IS_LOADING",
      payload: payload
    }),
    UPDATE_API_GATEWAY_URL: ( payload?: string ): ActionType<string> => ({
      type: "UPDATE_API_GATEWAY_URL",
      payload: payload
    }),
  },

  User: {
  },

  Settings: {
    // this action dispatches the INIT_GET_OB_PROFILE saga
    INIT_GET_SETTINGS: (payload?: { auth64: string }): ActionType<any> => ({
      type: "INIT_GET_SETTINGS",
      payload: payload
    }),
    UPDATE_SETTINGS: ( payload?: iOB1Settings ): ActionType => ({
      type: "UPDATE_SETTINGS",
      payload: payload
    }),
    UPDATE_COUNTRY: ( payload?: string ): ActionType => ({
      type: "UPDATE_COUNTRY",
      payload: payload
    }),
    UPDATE_SHIPPING_ADDRESSES: ( payload?: Object ): ActionType => ({
      type: "UPDATE_SHIPPING_ADDRESSES",
      payload: payload
    }),
    UPDATE_MODERATION_SETTINGS: ( payload?: Object ): ActionType => ({
      type: "UPDATE_MODERATION_SETTINGS",
      payload: payload
    }),
    UPDATE_ADVANCED_SETTINGS: ( payload?: Object ): ActionType => ({
      type: "UPDATE_ADVANCED_SETTINGS",
      payload: payload
    }),
  },

  Router: {
    UPDATE_ROUTE_NAME: ( payload?: Object ): ActionType => ({
      type: "UPDATE_ROUTE_NAME",
      payload: payload
    }),
  }
}

