
import { Actions, ActionType } from '../actions'
import { iOB1Profile } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'

// GET /ob/listings
const getObListings = ({ auth64, peerId=undefined }: {
  auth64: string,
  peerId?: string
}) => {
  let url = peerId
    ? `${APIgatewayURL}/ob/listings/${peerId}`
    : `${APIgatewayURL}/ob/listings`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": auth64,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}


// GET /ob/listings/:peerId/:slug_or_listingHash
// GET an external listing: GET http://{{url}}:{{port}}/ob/listing/:peerID/:slug_or_listingHash
const getObListingsSlug = ({ auth64, peerId, slug_or_listingHash }: {
  auth64?: string
  peerId?: string
  slug_or_listingHash?: string
}) => {
  let url = `${APIgatewayURL}/ob/listing/${peerId}/${slug_or_listingHash}`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": auth64,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}

// POST ob/listings
const postObListings = ({ auth64, body }: {
  auth64: string
  body: iOB1ListingsPostBody
}) => {
  let url = `${APIgatewayURL}/ob/listing`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": auth64,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}

// UPDATE ob/listings
const updateObListings = ({ auth64, body }: {
  auth64: string
  body: iOB1ListingsPostBody
}) => {
  let url = `${APIgatewayURL}/ob/listing`
  const headers = {
    method: "PUT",
    headers: {
      "Authorization": auth64,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}

// DELETE ob/listings
const deleteObListings = ({ auth64, body }) => {
  let url = `${APIgatewayURL}/ob/listing`
  const headers = {
    method: "PUT",
    headers: {
      "Authorization": auth64,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      slug: body.slug,
    })
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}


export const listings = {
  getObListings: getObListings,
  getObListingsSlug: getObListingsSlug,
  postObListings: postObListings,
  updateObListings: updateObListings,
  deleteObListings: deleteObListings,
}


export interface iOB1ListingsPostBody {
  slug?: string
  metadata?: {
    contractType?: string
    format?: string
    expiry?: string
    pricingCurrency?: string
  }
  item?: {
    title?: string
    description?: string
    processingTime?: string
    price?: number
    tags?: string[]
    images?: Array<{
      filename?: string
      tiny?: string
      small?: string
      medium?: string
      large?: string
      original?: string
    }>
    categories?: string[]
  }
}
