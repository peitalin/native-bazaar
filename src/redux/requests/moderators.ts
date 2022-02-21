
import { Actions, ActionType } from '../actions'
import { iOB1Profile } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'


// GET ob/moderators
const getObModerators = ({ username, password, auth64, async='', include='' }: {
  username?: string
  password?: string
  auth64?: string
  async?: string
  include?: string
}) => {
  var url = `${APIgatewayURL}/ob/moderators?async=${async}&include=${include}`
  const headers = {
    method: "GET",
    headers: {
      authorization: auth64 ? auth64 : `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}



// POST ob/moderator
// set yourself as moderator
const setObModerator = ({ auth64, body }: {
  auth64?: string
  body?: iObModeratorPayload
}) => {
  var url = `${APIgatewayURL}/ob/moderator`
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
    .catch(err => alert(JSON.stringify(err)))
}
interface iObModeratorPayload {
  description: string
  termsAndConditions: string
  languages: string[]
  fee: {
    feeType: string
    fixedFee: {
      currencyCode: string
      amount: number
    },
    percentage: number
  }
}


// PUT ob/moderator
// update moderator information
const putObModerator = ({ auth64, body }: {
  auth64?: string
  body?: iObModeratorPayload
}) => {
  var url = `${APIgatewayURL}/ob/moderator`
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
    .catch(err => alert(JSON.stringify(err)))
}

// DELETE ob/moderator
// set yourself as moderator
const deleteObModerator = ({ auth64, peerID }: { auth64?: string, peerID?: string }) => {
  var url = `${APIgatewayURL}/ob/moderator/${peerID}`
  const headers = {
    method: "DELETE",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json",
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}



export const moderators = {
  getObModerators: getObModerators,
  setObModerator: setObModerator,
  deleteObModerator: deleteObModerator,
}
