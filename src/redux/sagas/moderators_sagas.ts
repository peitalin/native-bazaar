
import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects'
import { Actions, ActionType } from '../actions'
import { ReduxState } from '../reducer'
import { iOB1Profile } from '../../typings/ob1Types'
import { ob1API } from '../requests'
let { getObProfile } = ob1API.profile



// ////////// INIT_GET_MODERATORS saga ///////////
// saga-watcher
export const watchGetModerators = function* () {
  yield takeEvery(Actions.OB1.INIT_GET_MODERATORS().type, getModerators)
}
// saga
const getModerators = function* () {

  const state: ReduxState = yield select()
  let { auth64 } = state.reduxLogin
  // let { peerId } = action.payload

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // clear existing list of moderators
    yield put(Actions.OB1.CLEAR_MODERATORS())
    // fetch peerIds
    const peerIds = yield call(ob1API.moderators.getObModerators, { auth64 })
    // const peerIds = yield call(ob1API.misc.getObPeers, { auth64 })
    // map peerIds to get an array of peerProfiles, and put profile in redux
    yield all(peerIds.map(peerId => fork(fetch_put_moderators_in_redux, { auth64, peerId })))
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getModeratorsSaga() error: ${e}`)
  }
}
// helper function for GET_MODERATORS
const fetch_put_moderators_in_redux = function* ({ auth64, peerId }: {
  auth64?: string,
  peerId?: string,
}) {
  try {
    // get peerProfile
    let peerProfile: iOB1Profile = yield call(getObProfile, { auth64, peerId: peerId })
    if (peerProfile.peerID && peerProfile.moderator && peerProfile.avatarHashes) {
      // if peerProfile has the peerID and avatarHashes, put peerProfile in redux
      yield put(Actions.OB1.APPEND_MODERATORS( [peerProfile] ))
    }
  } catch(err) {
    alert(JSON.stringify(err))
  }
}



// ////////// INIT_GET_MY_MODERATORS saga ///////////
// saga-watcher
export const watchGetMyModerators = function* () {
  yield takeEvery(Actions.OB1.INIT_GET_MY_MODERATORS().type, getMyModerators)
}
// saga
const getMyModerators = function* () {

  const state: ReduxState = yield select()
  let { auth64 } = state.reduxLogin
  // pass in peerIds
  let peerIds = state.reduxSettings.settings.storeModerators

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // // clear existing list of moderators
    yield put(Actions.OB1.CLEAR_MY_MODERATORS())
    // // map peerIds to get an array of peerProfiles, and put profile in redux
    yield all(peerIds.map(peerId => fork(fetch_put_my_moderators_in_redux, { auth64, peerId })))
    // yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getMyModeratorsSaga() error: ${e}`)
  }
}
// helper function for GET_FOLLOWERS
const fetch_put_my_moderators_in_redux = function* ({ auth64, peerId }: {
  auth64?: string,
  peerId?: string,
}) {
  try {
    // get peerProfile
    let peerProfile: iOB1Profile = yield call(getObProfile, { auth64, peerId: peerId })
    if (peerProfile.peerID && peerProfile.moderator && peerProfile.avatarHashes) {
      // if peerProfile has the peerID and avatarHashes, put peerProfile in redux
      yield put(Actions.OB1.APPEND_MY_MODERATORS( [peerProfile] ))
    }
  } catch(err) {
    alert(JSON.stringify(err))
  }
}

