
import { Actions, ActionType } from '../actions'
import { iOB1Profile, iOB1RegistrationResponse, iOB1SetProfileBody } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'


//////// Just use <Image source={{ uri: 'http://localhost/ob/images/:imgHash' }}/>
// GET /ob/images/:imageHash
const getObImages = ({ username, password, auth64, imageHash }: {
  username?: string
  password?: string
  auth64?: string
  imageHash?: string
}) => {
  // imageHash can also be a listing :hash
  let url = `${APIgatewayURL}/ob/images/${imageHash}`
  const headers = {
    method: "GET",
    headers: {
      Authorization: auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}



//////// Just use <Image source={{ uri: 'http://localhost/ob/avatar/:peerId/:size' }}/>
// GET /ob/avatar/:peerId/:size
const getObAvatar = ({ auth64, peerId, size }: {
  auth64: string
  peerId: string
  size: string
}) => {
  let url = `${APIgatewayURL}/ob/avatar/${peerId}/${size}`
  const headers = {
    method: "GET",
    headers: {
      Authorization: auth64,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

//////// Just use <Image source={{ uri: 'http://localhost/ob/header/:peerId/:size' }}/>
// GET /ob/header/:peerId/:size
const getObHeader = ({ auth64, peerId, size }: {
  auth64: string
  peerId: string
  size: string
}) => {
  let url = `${APIgatewayURL}/ob/avatar/${peerId}/${size}`
  const headers = {
    method: "GET",
    headers: {
      Authorization: auth64,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}


// POST /ob/image
const postObImage = ({ auth64, body }: {
  auth64?: string
  body?: postObImagesBody[]
}) => {
  // imageHash can also be a listing :hash
  let url = `${APIgatewayURL}/ob/images`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

interface postObImagesBody {
  filename: string
  image: string // base64 image string
}
interface postObImagesResponse {
  filename: string
  hashes: {
    large: string
    medium: string
    original: string
    small: string
    tiny: string
  }
}

// POST /ob/avatar
const postObAvatar = ({ auth64, body }: {
  auth64?: string
  body?: { avatar: string } // base64 image string
}) => {
  let url = `${APIgatewayURL}/ob/avatar`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// POST /ob/header
const postObHeader = ({ auth64, body }: {
  auth64?: string
  body?: { header: string } // base64 image string
}) => {
  let url = `${APIgatewayURL}/ob/header`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}


export const images = {
  getObImages: getObImages,
  getObAvatar: getObAvatar,
  postObImage: postObImage,
  postObAvatar: postObAvatar,
  postObHeader: postObHeader,
}
