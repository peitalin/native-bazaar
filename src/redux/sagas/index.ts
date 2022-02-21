
import {
  all,
  take,
  takeEvery,
  select,
} from 'redux-saga/effects'
import { ReduxState } from '../reducer'

// Saga watchers
import {
  watchGetObProfile,
  watchPutObProfile,
  watchRegisterObProfile,
  watchReloadObProfile,
} from './profile_sagas'
import {
  watchGetSettings,
} from './settings_sagas'
import {
  watchGetFollowers,
  watchGetFollowing,
} from './follow_sagas'
import {
  watchGetObPeerProfiles
} from './peer_profile_sagas'
import {
  watchGetModerators,
  watchGetMyModerators,
} from './moderators_sagas'
import {
  watchGetListings,
  watchVisitStore,
} from './listings_sagas'


// single entry point to start all Sagas
const rootSaga = function* () {
  // put all saga-watchers here
  yield all([
    // watchAndLog(),
    // profile_sagas.ts
    watchGetObProfile(),
    watchRegisterObProfile(),
    watchPutObProfile(),
    watchReloadObProfile(),
    // settings_sagas.ts
    watchGetSettings(),
    // peer_profiles_sagas.ts
    watchGetObPeerProfiles(),
    // follow_sagas.ts
    watchGetFollowers(),
    watchGetFollowing(),
    // listings_sagas.ts
    watchVisitStore(),
    watchGetListings(),
    // moderators_sagas.ts
    watchGetModerators(),
    watchGetMyModerators(),
  ])
}
export default rootSaga



////////// watch and log all sagas ///////////
const watchAndLog = function* () {
  yield takeEvery('*', function* logger(action) {
    const state: ReduxState = yield select()
    alert(JSON.stringify({ action: action }))
    alert(JSON.stringify({ state: state }))
  })
}






