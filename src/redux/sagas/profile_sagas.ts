
import {
  call,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import { Actions, ActionType } from '../actions'
import { ReduxState } from '../reducer'
import {
  iOB1Profile,
  iOB1RegistrationResponse,
  iOB1SetProfileBody,
  iOB1Settings
} from '../../typings/ob1Types'
import { ob1API } from '../requests'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
let {
  getObProfile,
  registerObProfile,
  putObProfile,
} = ob1API.profile
// import all requests to OB1 2.0 API // https://api.openbazaar.org



////////// INIT_GET_OB_PROFILE saga ///////////
// saga-watcher
export const watchGetObProfile = function* () {
  yield takeLatest(Actions.OB1.INIT_GET_OB_PROFILE().type, getObProfileSaga)
}
// saga
const getObProfileSaga = function* ( action: ActionType<{ username: string, password: string }> ) {

  let { username, password } = action.payload
  // NEED TO REFACTOR THIS AS A LOGIN -> LOGOUT CONTROL FLOW
  // https://redux-saga.js.org/docs/advanced/FutureActions.html
  // CLEANER. LOGIN MUST FOLLOW LOGOUT, MUST FOLLOW LOGIN

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // request OB1 profile from ob1 API
    const res = yield call( getObProfile, { username, password })
    // put the profile in Redux
    let profile: { type: string, payload: iOB1Profile } = yield put(Actions.OB1.STORE_OB_PROFILE(res))
    // stop loading indicator
    if (profile.payload.peerID) {
      // update authorization headers
      yield put(Actions.Login.UPDATE_AUTH64(`Basic ${btoa(username + ':' + password)}`))
      // uses history from routerHistory.ts
      yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'HomePage', routeURL: '/home-page' }))
    } else {
      alert(`Login error: ${JSON.stringify(profile.payload.errors)}`)
    }
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-Saga getObProfileSaga error: \n${e}\n\nYour OpenBazaar Node can't be found!\n`)
    yield put(Actions.Login.IS_LOADING(false))
  }
}



////////// INIT_REGISTER_OB_PROFILE saga ///////////
// saga-watcher
export const watchRegisterObProfile = function* () {
  yield takeLatest(Actions.OB1.INIT_REGISTER_OB_PROFILE().type, registerObProfileSaga)
}
// saga
const registerObProfileSaga = function* (action: ActionType<{
  username: string
  email: string
  password: string
  password_confirmation: string
}>) {

  let { username, email, password, password_confirmation } = action.payload
  let body = {
    handle: username,
    name: username,
    contactInfo: {
      website: "",
      email: email,
      phoneNumber: ""
    }
  }

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // register OB1 Profile
    const res: iOB1RegistrationResponse = yield call(registerObProfile, { username, email, password, password_confirmation })
    // get the response and put it in redux
    if (res.password_hash) {
      // registration successful, set a basic profile for the user
      const resSet = yield call(putObProfile, { body, username, password })
      // update authorization headers
      yield put(Actions.Login.UPDATE_AUTH64(`Basic ${btoa(username + ':' + password)}`))
      // uses history from routerHistory.ts to programmatically navigate routes
      yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'HomePage', routeURL: '/home-page' }))
    } else {
      alert(`Login Error: ${JSON.stringify(res)}`)
    }
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga registerObProfileSaga error: ${e}`)
    yield put(Actions.Login.IS_LOADING(false))
  }
}


// ////////// INIT_PUT_OB_PROFILE saga ///////////
// saga-watcher
export const watchPutObProfile = function* () {
  yield takeLatest(Actions.OB1.INIT_PUT_OB_PROFILE().type, putObProfileSaga)
}
// saga
const putObProfileSaga = function* ( action: ActionType<{ body: iOB1SetProfileBody, auth64?: string }> ) {

  let { body, auth64 } = action.payload
  try {
    yield put(Actions.Login.IS_LOADING(true))
    yield call(putObProfile, { body, auth64 })
    // make another call for the profile
    const profile = yield call( getObProfile, { auth64 })
    // put the profile in Redux
    yield put(Actions.OB1.PUT_OB_PROFILE(profile))
    // https://github.com/peitalin/native-bazaar/issues/1
    // returns this message (even though it's correct):
    // {
    //   "success": false,
    //   "reason": "no such column: proof"
    // }
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: putObProfilePayload() error: ${e}`)
  }
}


////////// INIT_RELOAD_OB_PROFILE saga ///////////
// saga-watcher
export const watchReloadObProfile = function* () {
  yield takeLatest(Actions.OB1.INIT_RELOAD_OB_PROFILE().type, reloadObProfileSaga)
}
// saga
const reloadObProfileSaga = function* ( action: ActionType<{ auth64: string }> ) {

  let { auth64 } = action.payload

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // request OB1 profile from ob1 API
    const profile = yield call(getObProfile, { auth64 })
    // put the profile in Redux
    yield put(Actions.OB1.PUT_OB_PROFILE(profile))
    // stop loading indicator
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-Saga getObProfileSaga error: ${e}`)
    yield put(Actions.Login.IS_LOADING(false))
  }
}

