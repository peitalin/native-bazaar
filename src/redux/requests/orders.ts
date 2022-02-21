
import { Actions, ActionType } from '../actions'
import { iOB1Profile, iListing } from '../../typings/ob1Types'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from './index'


// GET ob/purchase
const getObPurchase = ({ auth64, body }: {
  auth64?: string
  body?: any
}) => {
  var url = `${APIgatewayURL}/ob/purchase`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json"
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}



let ll = {
  "shipTo": "Dr Washington Sanchez",
  "address": "1060 W Addison",
  "city": "Chicago",
  "state": "Illinois",
  "countryCode": "UNITED_STATES",
  "postalCode": "60613",
  "addressNotes": "Leave at reception",
  "items": [{
    "listingHash": "zb2rhnA6Bb4PJ91VxvXF1o41oWHZakBYuK9LLjzcZZ6GEDQW8",
    "quantity": 1,
    "options": [],
    "shipping": {
      "name": "International",
      "type": "FIXED_PRICE",
    "service": "Express"
    },
    "memo": "thanks!",
    "coupons": []
  }],
  "moderator": "QmYDqR2G3hSZUeybtQjEUWjfRQZcVw4AiyLZhuw3jCbE6n"
}


interface purchaseResponse {
  amount: string,
  orderId: string,
  paymentAddress: string,
  vendorOnline: boolean
}


// purchaseResponse {
//   "amount": 10053084,
//   "orderId": "Qmc6WoAED23kFaZFpYEuEGrnV3QDPiGZ1nxx96LencUgd3",
//   "paymentAddress": "bc1q6zdzy3dtjc23hl80rrctcwj8msec96cm6cqp0h8y5kf4022lqngsfgedwn",
//   "vendorOnline": false
// }

// {
//   "shipTo": "Dr Washington Sanchez",
//   "address": "1060 W Addison",
//   "city": "Chicago",
//   "state": "Illinois",
//   "countryCode": "UNITED_STATES",
//   "postalCode": "60613",
//   "addressNotes": "Leave at reception",
//   "items": [{
//     "listingHash": "QmWh4G8UsAtKAEWaYGrayQ8wJHqFtYS2nAZScafCrvSJ1N",
//     "quantity": 1,
//     "options": [],
//     "shipping": {
//       "name": "Worldwide Shipping",
//       "service": "Standard"
//     },
//     "memo": "thanks!",
//     "coupons": []
//   }]
// }

// GET ob/estimatetotal
const getObEstimateTotal = ({ auth64, body }: {
  auth64?: string
  body?: any
}) => {
  var url = `${APIgatewayURL}/ob/purchase`
  const headers = {
    method: "GET",
    headers: {
      "Authorization": auth64,
      "Content-Type": "application/json"
    }
  }
  return fetch(url, headers)
    .then(response => response.json())
    .catch(err => alert(JSON.stringify(err)))
}
