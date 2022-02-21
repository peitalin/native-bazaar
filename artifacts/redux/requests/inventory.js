import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index';
// GET ob/inventory
const getObInventory = ({ username, password }) => {
    let url = `${APIgatewayURL}/ob/inventory`;
    const headers = {
        method: "GET",
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        }
    };
    return fetch(url, headers)
        .then(response => response.json());
};
// POST ob/inventory
const postObInventory = ({ username, password, body }) => {
    let url = `${APIgatewayURL}/ob/inventory`;
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
export const inventory = {
    getObInventory: getObInventory,
    postObInventory: postObInventory,
};
//# sourceMappingURL=inventory.js.map