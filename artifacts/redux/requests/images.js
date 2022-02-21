import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index';
//////// Just use <Image source={{ uri: 'http://localhost/ob/images/:imgHash' }}/>
// GET /ob/images/:imageHash
const getObImages = ({ username, password, auth64, imageHash }) => {
    // imageHash can also be a listing :hash
    let url = `${APIgatewayURL}/ob/images/${imageHash}`;
    const headers = {
        method: "GET",
        headers: {
            Authorization: auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
        }
    };
    return fetch(url, headers)
        .then(response => response.json());
};
//////// Just use <Image source={{ uri: 'http://localhost/ob/avatar/:peerId/:size' }}/>
// GET /ob/avatar/:peerId/:size
// const getObAvatar = ({ username, password, peerId, size }) => {
//   let url = `${APIgatewayURL}/ob/avatar/${peerId}/${size}`
//   const headers = {
//     method: "GET",
//     headers: {
//       Authorization: `Basic ${btoa(username + ':' + password)}`,
//     }
//   }
//   return fetch(url, headers)
//     .then(response => response.json())
// }
export const images = {
    getObImages: getObImages,
};
//# sourceMappingURL=images.js.map