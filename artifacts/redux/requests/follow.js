import { APIgatewayURL } from './index';
// GET /ob/followers
const getObFollowers = ({ auth64, peerId, offsetId = '', limit = '' }) => {
    if (peerId) {
        // if peerId argument is passed, we know we're looking up a peer's followers
        var url = `${APIgatewayURL}/ob/followers/${peerId}`;
    }
    else {
        // otherwise request a list of people who follow the user
        // var url = `${APIgatewayURL}/ob/followers?offsetId=${offsetId}&limit=${limit}`
        var url = `${APIgatewayURL}/ob/followers`;
    }
    const headers = {
        method: "GET",
        headers: {
            Authorization: auth64,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// GET /ob/following
const getObFollowing = ({ auth64, peerId, offsetId = '', limit = '' }) => {
    if (peerId) {
        // if peerId argument is passed, we know we're looking up who a peer is following
        var url = `${APIgatewayURL}/ob/following/${peerId}`;
    }
    else {
        // otherwise request a list of people the user is following
        var url = `${APIgatewayURL}/ob/following?offsetId=${offsetId}&limit=${limit}`;
    }
    const headers = {
        method: "GET",
        headers: {
            Authorization: auth64,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
export const follow = {
    getObFollowers: getObFollowers,
    getObFollowing: getObFollowing,
};
//# sourceMappingURL=follow.js.map