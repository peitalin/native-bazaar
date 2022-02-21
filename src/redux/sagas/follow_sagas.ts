
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


// ////////// INIT_GET_FOLLOWING saga ///////////
// saga-watcher
export const watchGetFollowing = function* () {
  yield takeEvery(Actions.OB1.INIT_GET_FOLLOWING().type, getFollowing)
}
// saga
const getFollowing = function* ( action: ActionType<{ peerId?: string }> ) {

  const state: ReduxState = yield select()
  let { auth64 } = state.reduxLogin
  let { peerId } = action.payload
  // peerId, is it's another user's store we're browsing
  // in which case, peerIds, would be the peer's peers
  try {
    yield put(Actions.Login.IS_LOADING(true))
    // clear list of people following
    yield put(Actions.OB1.CLEAR_FOLLOWING())
    // fetch peerIds
    const peerIds = yield call(ob1API.follow.getObFollowing, { auth64, peerId })
    // const peerIds = yield call(ob1API.misc.getObPeers, { auth64 })
    // map peerIds to get an array of peerProfiles, and put profile in redux
    yield all(peerIds.map(peerId => fork(fetch_put_following_in_redux, { auth64, peerId })))
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getFollowersSaga() error: ${e}`)
  }
}
// helper function for GET_FOLLOWERS
const fetch_put_following_in_redux = function* ({ auth64, peerId }: {
  auth64?: string,
  peerId?: string,
}) {
  try {
    // get peerProfile
    let peerProfile: iOB1Profile = yield call(getObProfile, { auth64, peerId: peerId })
    if (peerProfile.peerID && peerProfile.headerHashes) {
      if (peerProfile.headerHashes.original) {
        // if peerProfile has the peerID and headerHashes, put peerProfile in redux
        yield put(Actions.OB1.APPEND_FOLLOWING( [peerProfile] ))
      }
    }
    return peerProfile
  } catch(err) {
    alert(JSON.stringify(err))
  }
}




// ////////// INIT_GET_FOLLOWERS saga ///////////
// saga-watcher
export const watchGetFollowers = function* () {
  yield takeEvery(Actions.OB1.INIT_GET_FOLLOWERS().type, getFollowers)
}
// saga
const getFollowers = function* ( action: ActionType<any> ) {

  const state: ReduxState = yield select()
  let { auth64 } = state.reduxLogin

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // clear followers first
    yield put(Actions.OB1.CLEAR_FOLLOWERS())
    // fetch peerIds
    const peerIds = yield call(ob1API.follow.getObFollowers, { auth64 })
    if (peerIds.length > 0) {
      // map peerIds to get an array of peerProfiles, and put profile in redux
      yield all(peerIds.map(peerId => fork(fetch_put_followers_in_redux, { auth64, peerId })))
    }
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getFollowersSaga() error: ${e}`)
  }
}
// helper function for GET_FOLLOWERS
const fetch_put_followers_in_redux = function* ({ auth64, peerId }) {
  try {
    // get peerProfile
    let peerProfile: iOB1Profile = yield call(getObProfile, { auth64, peerId: peerId })
    if (peerProfile.peerID && peerProfile.headerHashes) {
      if (peerProfile.headerHashes.original) {
        // if peerProfile has the peerID and headerHashes, put peerProfile in redux
        yield put(Actions.OB1.APPEND_FOLLOWERS( [peerProfile] ))
      }
    }
    return peerProfile
  } catch(err) {
    alert(JSON.stringify(err))
  }
}

