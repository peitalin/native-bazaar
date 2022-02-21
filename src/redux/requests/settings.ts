

import { Actions, ActionType } from '../actions'
import { iOB1Settings } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'


// GET ob/settings
const getObSettings = ({ username, password, auth64 }: {
  username?: string
  password?: string
  auth64?: string
}) => {
  let url = `${APIgatewayURL}/ob/settings`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// POST ob/settings
const setObSettings = ({ username, password, auth64, body }: {
  username?: string
  password?: string
  auth64?: string
  body?: iOB1Settings
}) => {
  let url = `${APIgatewayURL}/ob/settings`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// PUT settings: PUT ob/settings
const updateObSettings = ({ username, password, auth64, body }: {
  username?: string
  password?: string
  auth64?: string
  body?: iOB1Settings
}) => {
  let url = `${APIgatewayURL}/ob/settings`
  const headers = {
    method: "PUT",
    headers: {
      "Authorization": auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// PATCH settings: PATCH ob/settings
const patchObSettings = ({ username, password, auth64, body }: {
  username?: string
  password?: string
  auth64?: string
  body?: iOB1Settings
}) => {
  let url = `${APIgatewayURL}/ob/settings`
  const headers = {
    method: "PATCH",
    headers: {
      "Authorization": auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

export const settings = {
  getObSettings: getObSettings,
  setObSettings: setObSettings,
  updateObSettings: updateObSettings,
  patchObSettings: patchObSettings,
}


