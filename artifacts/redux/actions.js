// Action Creating Functions
export const Actions = {
    OB1: {
        // this action dispatches the INIT_REGISTER_OB_PROFILE saga
        INIT_REGISTER_OB_PROFILE: (payload) => ({
            type: "INIT_REGISTER_OB_PROFILE",
            payload: payload
        }),
        // this action dispatches the INIT_GET_OB_PROFILE saga
        INIT_GET_OB_PROFILE: (payload) => ({
            type: "INIT_GET_OB_PROFILE",
            payload: payload
        }),
        GET_OB_PROFILE: (payload) => ({
            type: "GET_OB_PROFILE",
            payload: payload
        }),
        // this action dispatches the INIT_PUT_OB_PROFILE saga
        INIT_PUT_OB_PROFILE: (payload) => ({
            type: "INIT_PUT_OB_PROFILE",
            payload: payload
        }),
        PUT_OB_PROFILE: (payload) => ({
            type: "PUT_OB_PROFILE",
            payload: payload
        }),
        // this action dispatches the INIT_PATCH_OB_PROFILE saga
        INIT_PATCH_OB_PROFILE: () => ({
            type: "INIT_PATCH_OB_PROFILE",
            payload: undefined
        }),
        PATCH_OB_PROFILE: (payload) => ({
            type: "PATCH_OB_PROFILE",
            payload: payload
        }),
        // this action dispatches the INIT_GET_OB_PEER_PROFILES saga
        INIT_GET_OB_PEER_PROFILES: (payload) => ({
            type: "INIT_GET_OB_PEER_PROFILES",
            payload: payload
        }),
        CLEAR_OB_PEER_PROFILES: () => ({
            type: "CLEAR_OB_PEER_PROFILES",
            payload: []
        }),
        APPEND_OB_PEER_PROFILES: (payload) => ({
            type: "APPEND_OB_PEER_PROFILES",
            payload: payload
        }),
        // this action dispatches the INIT_GET_LISTINGS saga
        INIT_GET_LISTINGS: (payload) => ({
            type: "INIT_GET_LISTINGS",
            payload: payload
        }),
        CLEAR_LISTINGS: () => ({
            type: "CLEAR_LISTINGS",
            payload: []
        }),
        APPEND_LISTINGS: (payload) => ({
            type: "APPEND_LISTINGS",
            payload: payload
        }),
        // Get the listings for the current store your browsing
        SET_BROWSED_LISTINGS: (payload) => ({
            type: "SET_BROWSED_LISTINGS",
            payload: payload
        }),
        // Get the userprofile for the current store your browsing
        SET_BROWSED_PROFILE: (payload) => ({
            type: "SET_BROWSED_PROFILE",
            payload: payload
        }),
        INIT_VISIT_STORE: (payload) => ({
            type: "INIT_VISIT_STORE",
            payload: payload
        }),
        SET_SCROLL_Y: (payload) => ({
            type: "SET_SCROLL_Y",
            payload: payload
        }),
        INIT_GET_FOLLOWERS: (payload) => ({
            type: "INIT_GET_FOLLOWERS",
            payload: payload
        }),
        CLEAR_FOLLOWERS: () => ({
            type: "CLEAR_FOLLOWERS",
            payload: undefined
        }),
        APPEND_FOLLOWERS: (payload) => ({
            type: "APPEND_FOLLOWERS",
            payload: payload
        }),
        INIT_GET_FOLLOWING: (payload) => ({
            type: "INIT_GET_FOLLOWING",
            payload: payload
        }),
        CLEAR_FOLLOWING: () => ({
            type: "CLEAR_FOLLOWING",
            payload: undefined
        }),
        APPEND_FOLLOWING: (payload) => ({
            type: "APPEND_FOLLOWING",
            payload: payload
        }),
        INIT_GET_MODERATORS: (payload) => ({
            type: "INIT_GET_MODERATORS",
            payload: payload
        }),
        CLEAR_MODERATORS: () => ({
            type: "CLEAR_MODERATORS",
            payload: undefined
        }),
        APPEND_MODERATORS: (payload) => ({
            type: "APPEND_MODERATORS",
            payload: payload
        }),
    },
    Login: {
        UPDATE_USERNAME: (payload) => ({
            type: "UPDATE_USERNAME",
            payload: payload
        }),
        UPDATE_PASSWORD: (payload) => ({
            type: "UPDATE_PASSWORD",
            payload: payload
        }),
        UPDATE_AUTH64: (payload) => ({
            type: "UPDATE_AUTH64",
            payload: payload
        }),
        IS_LOADING: (payload) => ({
            type: "IS_LOADING",
            payload: payload
        }),
        UPDATE_API_GATEWAY_URL: (payload) => ({
            type: "UPDATE_API_GATEWAY_URL",
            payload: payload
        }),
    },
    User: {
        UPDATE_USER_PROFILE: (payload) => ({
            type: "UPDATE_USER_PROFILE",
            payload: payload
        }),
        UPDATE_STORE_SETTINGS: (payload) => ({
            type: "UPDATE_STORE_SETTINGS",
            payload: payload
        }),
        UPDATE_SHIPPING_ADDRESSES: (payload) => ({
            type: "UPDATE_SHIPPING_ADDRESSES",
            payload: payload
        }),
        UPDATE_MODERATION_SETTINGS: (payload) => ({
            type: "UPDATE_MODERATION_SETTINGS",
            payload: payload
        }),
        UPDATE_ADVANCED_SETTINGS: (payload) => ({
            type: "UPDATE_ADVANCED_SETTINGS",
            payload: payload
        }),
    },
    Router: {
        UPDATE_ROUTE_NAME: (payload) => ({
            type: "UPDATE_ROUTE_NAME",
            payload: payload
        }),
    }
};
//# sourceMappingURL=actions.js.map