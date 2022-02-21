
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
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
let { getObProfile } = ob1API.profile



////////// INIT_GET_OB_PEER_PROFILES saga ///////////
export const watchGetObPeerProfiles = function* () {
  // saga-watcher
  yield takeEvery(Actions.OB1.INIT_GET_OB_PEER_PROFILES().type, getObPeerProfilesSaga)
}
const getObPeerProfilesSaga = function* ( action: ActionType<{ auth64?: string }> ) {
  // saga
  let { auth64 } = action.payload
  // let { auth64 } = yield select((state: ReduxState) => state.reduxLogin)
  let { getObProfile } = ob1API.profile
  let { getObPeers } = ob1API.misc

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // clear array of peerProfiles
    yield put(Actions.OB1.CLEAR_OB_PEER_PROFILES())
    // fetch peerIds
    const peerIds = yield call(getObPeers, { auth64 })
    // map peerIds to get an array of peerProfiles, and put profile in redux
    yield all(peerIds.map(peerId => fork(fetch_put_ob_profile_in_redux, { auth64, peerId })))
    // WARNING: call is blocking. will block for a really long time
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getObPeerProfilesSaga() error: ${e}`)
  }
}

const fetch_put_ob_profile_in_redux = function* ({ auth64, peerId }) {
  try {
    // get peerProfile
    let peerProfile: iOB1Profile = yield call(getObProfile, { auth64, peerId: peerId })
    if (peerProfile.peerID && peerProfile.headerHashes) {
      if (peerProfile.headerHashes.original) {
        // if peerProfile has the peerID and headerHashes, put peerProfile in redux
        yield put(Actions.OB1.APPEND_OB_PEER_PROFILES( [peerProfile] ))
      }
    }
    return peerProfile
  } catch(err) {
    alert(JSON.stringify(err))
  }
}

