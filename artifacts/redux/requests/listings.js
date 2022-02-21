import { APIgatewayURL } from './index';
// GET /ob/listings
const getObListings = ({ auth64, peerId = undefined }) => {
    let url = peerId
        ? `${APIgatewayURL}/ob/listings/${peerId}`
        : `${APIgatewayURL}/ob/listings`;
    const headers = {
        method: "GET",
        headers: {
            "Authorization": auth64,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// GET /ob/listings/:peerId/:slug_or_listingHash
// GET an external listing: GET http://{{url}}:{{port}}/ob/listing/:peerID/:slug_or_listingHash
const getObListingsSlug = ({ auth64, peerId, slug_or_listingHash }) => {
    let url = `${APIgatewayURL}/ob/listing/${peerId}/${slug_or_listingHash}`;
    const headers = {
        method: "GET",
        headers: {
            "Authorization": auth64,
        }
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// POST ob/listings
const postObListings = ({ auth64, body }) => {
    let url = `${APIgatewayURL}/ob/listing`;
    const headers = {
        method: "POST",
        headers: {
            "Authorization": auth64,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// UPDATE ob/listings
const updateObListings = ({ auth64, body }) => {
    let url = `${APIgatewayURL}/ob/listing`;
    const headers = {
        method: "PUT",
        headers: {
            "Authorization": auth64,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
// DELETE ob/listings
const deleteObListings = ({ auth64, body }) => {
    let url = `${APIgatewayURL}/ob/listing`;
    const headers = {
        method: "PUT",
        headers: {
            "Authorization": auth64,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            slug: body.slug,
        })
    };
    return fetch(url, headers)
        .then(response => response.json())
        .catch(err => alert(JSON.stringify(err)));
};
export const listings = {
    getObListings: getObListings,
    getObListingsSlug: getObListingsSlug,
    postObListings: postObListings,
    updateObListings: updateObListings,
    deleteObListings: deleteObListings,
};
//# sourceMappingURL=listings.js.map