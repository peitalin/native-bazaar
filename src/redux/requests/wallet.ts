

import { Actions, ActionType } from '../actions'
import { iOB1Settings } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'


// GET wallet/address
const getObWalletAddress = ({ username, password }) => {
  let url = `${APIgatewayURL}/wallet/address`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// GET wallet/mnemonic
const getObWalletMnemonic = ({ username, password }): Promise<{ mnemonic: string }> => {
  let url = `${APIgatewayURL}/wallet/mnemonic`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// GET wallet/balance
const getObWalletBalance = ({ username, password }): Promise<{ confirmed: number, unconfirmed: number }> => {
  let url = `${APIgatewayURL}/wallet/balance`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// GET wallet/history
const getObWalletHistory = ({ username, password }) => {
  let url = `${APIgatewayURL}/wallet/history`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// GET ob/exchangerate
const getObExchangeRate = ({ username, password }) => {
  let url = `${APIgatewayURL}/ob/exchangerate`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// POST ob/wallet/spend
const postObWalletSpend = ({ username, password, body }: {
  username: string
  password: string
  body: { address: string, amount: number, feeLevel: string, memo: string }
}): Promise<{ success?: boolean, reason?: string }> => {
  let url = `${APIgatewayURL}/wallet/spend`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(body)
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// POST wallet/bumpfee
const postObWalletBumpFee = ({ username, password, txid }: {
  username: string
  password: string
  txid: string
}) => {
  let url = `${APIgatewayURL}/wallet/bumpfee`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      txid: txid
    })
  }
  return fetch(url, headers)
    .then(response => response.json())
}

// POST wallet/resyncblockchain
const postObWalletResyncBlockchain = ({ username, password }) => {
  let url = `${APIgatewayURL}/wallet/resyncblockchain`
  const headers = {
    method: "POST",
    headers: {
      "Authorization": `Basic ${btoa(username + ':' + password)}`,
      "Content-Type": 'application/json'
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
}


export const inventory = {
  getObWalletAddress: getObWalletAddress,
  getObWalletBalance: getObWalletBalance,
  getObWalletHistory: getObWalletHistory,
  getObWalletMnemonic: getObWalletMnemonic,
  postObWalletSpend: postObWalletSpend,
  postObWalletBumpFee: postObWalletBumpFee,
  postObWalletResyncBlockchain: postObWalletResyncBlockchain,
}


