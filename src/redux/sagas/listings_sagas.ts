
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
import { iOB1Profile } from '../../typings/ob1Types'
import { ReduxState } from '../reducer'
import { ob1API } from '../requests'


// ////////// INIT_VISIT_STORE saga ///////////
// saga-watcher
export const watchVisitStore = function* () {
  yield takeEvery(Actions.OB1.INIT_VISIT_STORE().type, visitStore)
}
// saga
const visitStore = function* ( action: ActionType<iOB1Profile> ) {
  let browsedProfile = action.payload
  try {
    yield put(Actions.Login.IS_LOADING(true))
    yield put(Actions.OB1.SET_BROWSED_PROFILE( browsedProfile ))
    yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'Store', routeURL: `/store/${browsedProfile.peerID}` }))
    // yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: visitStoreSaga() error: ${e}`)
  }
}



////////// INIT_GET_LISTINGS saga ///////////
// saga-watcher
export const watchGetListings = function* () {
  yield takeEvery(Actions.OB1.INIT_GET_LISTINGS().type, getListingsSaga)
}
// saga
const getListingsSaga = function* ( action: ActionType<{ peerId?: string }> ) {

  let { auth64 } = yield select((state: ReduxState) => state.reduxLogin)
  let { getObListings } = ob1API.listings
  let { peerId } = action.payload

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // clear array of browsedListings
    yield put(Actions.OB1.SET_BROWSED_LISTINGS( [] ))
    let listings = yield getObListings({ auth64: auth64, peerId: peerId })
    yield put(Actions.OB1.SET_BROWSED_LISTINGS( listings ))
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-saga: getObListingsSaga() error: ${e}`)
  }
}
