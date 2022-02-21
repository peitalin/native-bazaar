
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
import { iOB1Settings } from '../../typings/ob1Types'
import { ob1API } from '../requests'



////////// INIT_GET_SETTINGS saga ///////////
// saga-watcher
export const watchGetSettings = function* () {
  yield takeLatest(Actions.Settings.INIT_GET_SETTINGS().type, getSettingsSaga)
}
// saga
const getSettingsSaga = function* ( action: ActionType<{ auth64: string }> ) {
  // destructure auth64 from action payload
  let { auth64 } = action.payload

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // request OB1 profile from ob1 API
    const settings: iOB1Settings = yield call(ob1API.settings.getObSettings, { auth64 })
    // put the settings in Redux
    yield put(Actions.Settings.UPDATE_SETTINGS(settings))
    // stop loading indicator
    yield put(Actions.Login.IS_LOADING(false))
  } catch(e) {
    alert(`Redux-Saga getSettingsSaga error: ${e}`)
    yield put(Actions.Login.IS_LOADING(false))
  }
}





