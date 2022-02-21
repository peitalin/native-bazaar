import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index';
// GET ob/settings
const getObSettings = ({ username, password }) => {
    let url = `${APIgatewayURL}/ob/settings`;
    const headers = {
        method: "GET",
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        }
    };
    return fetch(url, headers)
        .then(response => response.json());
};
// POST ob/settings
const setObSettings = ({ username, password, body }) => {
    let url = `${APIgatewayURL}/ob/settings`;
    const headers = {
        method: "POST",
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json());
};
// UPDATE settings: PUT ob/settings
const updateObSettings = ({ username, password, body }) => {
    let url = `${APIgatewayURL}/ob/settings`;
    const headers = {
        method: "PUT",
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json());
};
// PATCH settings: PATCH ob/settings
const patchObSettings = ({ username, password, body }) => {
    let url = `${APIgatewayURL}/ob/settings`;
    const headers = {
        method: "PATCH",
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json());
};
export const inventory = {
    getObSettings: getObSettings,
    setObSettings: setObSettings,
    updateObSettings: updateObSettings,
    patchObSettings: patchObSettings,
};
//# sourceMappingURL=settings.js.map