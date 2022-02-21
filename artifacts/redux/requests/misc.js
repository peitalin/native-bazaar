import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index';
// GET /ob/peers
const getObPeers = ({ username, password, auth64 }) => {
    let url = `${APIgatewayURL}/ob/peers`;
    const headers = {
        method: "GET",
        headers: {
            Authorization: auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
export const misc = {
    getObPeers: getObPeers,
};
//# sourceMappingURL=misc.js.map