import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index';
// const username = 'peita-001'
// const password = 'password'
// const auth = `Basic ZHJ3YXNoby10ZXN0LTA3MDpwYXNzd29yZA==`
// const auth = `Basic ${btoa(username + ':' + password)}`
// GET ob/profile
const getObProfile = ({ username, password, auth64, peerId, useCache = false, async = true }) => {
    if (!peerId) {
        var url = async ? `${APIgatewayURL}/ob/profile?async=true` : `${APIgatewayURL}/ob/profile`;
    }
    else {
        var url = async
            ? `${APIgatewayURL}/ob/profile/${peerId}?useCache=${useCache}&async=true`
            : `${APIgatewayURL}/ob/profile/${peerId}?useCache=${useCache}&async=true`;
    }
    const headers = {
        method: "GET",
        headers: {
            authorization: auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// POST ob/profile
const registerObProfile = ({ username, email, password, password_confirmation }) => {
    let url = 'https://cloud.ob1.io/auth/register';
    const headers = {
        method: "POST",
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        })
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// PUT ob/profile
const putObProfile = ({ body, auth64, username, password }) => {
    let url = `${APIgatewayURL}/ob/profile`;
    const headers = {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .catch(err => alert(JSON.stringify(err)));
};
export const profile = {
    getObProfile: getObProfile,
    registerObProfile: registerObProfile,
    putObProfile: putObProfile,
};
//# sourceMappingURL=profile.js.map