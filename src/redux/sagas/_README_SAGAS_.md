
## What are sagas?

Sagas are just a way for us to organise async actions.
Say you want to make a request, then update the redux-store, then
make another request and update the redux-store--in in an ordered sequence,
redux-saga helps you organise that so it's easy to read.


Typically, a saga has 2 functions:
1) A Watcher function, which watches for any saga-initiating redux-actions:
e.g. `INIT_GET_OB_PROFILE` saga:

```
// saga-watcher
const watchGetObProfile = function* () {
  yield takeLatest(Actions.OB1.INIT_GET_OB_PROFILE().type, getObProfileSaga)
}
```

2) The Saga function, which describes the sequence of async actions, and redux actions
you want in this particular saga.
e.g.

```
// saga
const getObProfileSaga = function* ( action: ActionType<{ username: string, password: string }> ) {

  let { username, password } = action.payload

  try {
    yield put(Actions.Login.IS_LOADING(true))
    // request OB1 profile from ob1 API
    const res = yield call( getObProfile, { username, password })
    // then put the profile reponse in Redux
    let profile: { type: string, payload: iOB1Profile } = yield put(Actions.OB1.GET_OB_PROFILE(res))
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
    alert(`Redux-Saga getObProfileSaga error: ${e}`)
    yield put(Actions.Login.IS_LOADING(false))
  }
}
```
