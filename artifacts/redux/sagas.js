import { all, call, fork, put, takeEvery, takeLatest, select, } from 'redux-saga/effects';
import { Actions } from './actions';
import { ob1API } from './requests';
import { btoa } from 'Base64'; // btoa() encodes authorization headers in base64
let { getObProfile, registerObProfile, putObProfile, } = ob1API.profile;
// import all requests to OB1 2.0 API // https://api.openbazaar.org
// single entry point to start all Sagas
const rootSaga = function* () {
    // put all saga-watchers here
    yield all([
        // watchAndLog(),
        watchGetObProfile(),
        watchRegisterObProfile(),
        watchPutObProfile(),
        watchGetObPeerProfiles(),
        watchVisitStore(),
        watchGetListings(),
        watchGetFollowers(),
        watchGetFollowing(),
        watchGetModerators(),
    ]);
};
export default rootSaga;
////////// watch and log all sagas ///////////
const watchAndLog = function* () {
    yield takeEvery('*', function* logger(action) {
        const state = yield select();
        alert(JSON.stringify({ action: action }));
        alert(JSON.stringify({ state: state }));
    });
};
////////// INIT_GET_OB_PROFILE saga ///////////
// saga-watcher
const watchGetObProfile = function* () {
    yield takeLatest(Actions.OB1.INIT_GET_OB_PROFILE().type, getObProfileSaga);
};
// saga
const getObProfileSaga = function* (action) {
    let { username, password } = action.payload;
    // NEED TO REFACTOR THIS AS A LOGIN -> LOGOUT CONTROL FLOW
    // https://redux-saga.js.org/docs/advanced/FutureActions.html
    // CLEANER. LOGIN MUST FOLLOW LOGOUT, MUST FOLLOW LOGIN
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // request OB1 profile from ob1 API
        const res = yield call(getObProfile, { username, password });
        // put the profile in Redux
        let profile = yield put(Actions.OB1.GET_OB_PROFILE(res));
        // stop loading indicator
        if (profile.payload.peerID) {
            // update authorization headers
            yield put(Actions.Login.UPDATE_AUTH64(`Basic ${btoa(username + ':' + password)}`));
            // uses history from routerHistory.ts
            yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'HomePage', routeURL: '/home-page' }));
        }
        else {
            alert(`Login error: ${JSON.stringify(profile.payload.errors)}`);
        }
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-Saga getObProfileSaga error: ${e}`);
        yield put(Actions.Login.IS_LOADING(false));
    }
};
////////// INIT_REGISTER_OB_PROFILE saga ///////////
// saga-watcher
const watchRegisterObProfile = function* () {
    yield takeLatest(Actions.OB1.INIT_REGISTER_OB_PROFILE().type, registerObProfileSaga);
};
// saga
const registerObProfileSaga = function* (action) {
    let { username, email, password, password_confirmation } = action.payload;
    let body = {
        handle: username,
        name: username,
        contactInfo: {
            website: "",
            email: email,
            phoneNumber: ""
        }
    };
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // register OB1 Profile
        const res = yield call(registerObProfile, { username, email, password, password_confirmation });
        // get the response and put it in redux
        if (res.password_hash) {
            // registration successful, set a basic profile for the user
            const resSet = yield call(putObProfile, { body, username, password });
            // alert(JSON.stringify(resSet))
            // update authorization headers
            yield put(Actions.Login.UPDATE_AUTH64(`Basic ${btoa(username + ':' + password)}`));
            // uses history from routerHistory.ts to programmatically navigate routes
            yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'HomePage', routeURL: '/home-page' }));
        }
        else {
            alert(`Login Error: ${JSON.stringify(res)}`);
        }
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga registerObProfileSaga error: ${e}`);
        yield put(Actions.Login.IS_LOADING(false));
    }
};
// ////////// INIT_PUT_OB_PROFILE saga ///////////
// saga-watcher
const watchPutObProfile = function* () {
    yield takeLatest(Actions.OB1.INIT_PUT_OB_PROFILE().type, putObProfileSaga);
};
// saga
const putObProfileSaga = function* (action) {
    let { body, auth64 } = action.payload;
    try {
        yield put(Actions.Login.IS_LOADING(true));
        yield call(putObProfile, { body, auth64 });
        // make another call for the profile
        const profile = yield call(getObProfile, { auth64 });
        // put the profile in Redux
        yield put(Actions.OB1.GET_OB_PROFILE(profile));
        // yield put(Actions.OB1.PUT_OB_PROFILE(body))
        // yield put(Actions.OB1.PUT_OB_PROFILE(profile))
        // https://github.com/peitalin/native-bazaar/issues/1
        // returns this message (even though it's correct):
        // {
        //   "success": false,
        //   "reason": "no such column: proof"
        // }
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: putObProfilePayload() error: ${e}`);
    }
};
////////// INIT_GET_OB_PEER_PROFILES saga ///////////
// saga-watcher
const watchGetObPeerProfiles = function* () {
    yield takeEvery(Actions.OB1.INIT_GET_OB_PEER_PROFILES().type, getObPeerProfilesSaga);
};
// saga
const getObPeerProfilesSaga = function* (action) {
    let { auth64 } = action.payload;
    // let { auth64 } = yield select((state: ReduxState) => state.reduxLogin)
    let { getObProfile } = ob1API.profile;
    let { getObPeers } = ob1API.misc;
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // clear array of peerProfiles
        yield put(Actions.OB1.CLEAR_OB_PEER_PROFILES());
        // fetch peerIds
        const peerIds = yield call(getObPeers, { auth64 });
        // map peerIds to get an array of peerProfiles, and put profile in redux
        yield all(peerIds.map(peerId => fork(fetch_put_ob_profile_in_redux, { auth64, peerId })));
        // WARNING: call is blocking. will block for a really long time
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: getObPeerProfilesSaga() error: ${e}`);
    }
};
const fetch_put_ob_profile_in_redux = function* ({ auth64, peerId }) {
    try {
        // get peerProfile
        let peerProfile = yield call(getObProfile, { auth64, peerId: peerId });
        if (peerProfile.peerID && peerProfile.headerHashes) {
            if (peerProfile.headerHashes.original) {
                // if peerProfile has the peerID and headerHashes, put peerProfile in redux
                yield put(Actions.OB1.APPEND_OB_PEER_PROFILES([peerProfile]));
            }
        }
        return peerProfile;
    }
    catch (err) {
        alert(JSON.stringify(err));
    }
};
// ////////// INIT_VISIT_STORE saga ///////////
// saga-watcher
const watchVisitStore = function* () {
    yield takeEvery(Actions.OB1.INIT_VISIT_STORE().type, visitStore);
};
// saga
const visitStore = function* (action) {
    let browsedProfile = action.payload;
    try {
        yield put(Actions.Login.IS_LOADING(true));
        yield put(Actions.OB1.SET_BROWSED_PROFILE(browsedProfile));
        yield put(Actions.Router.UPDATE_ROUTE_NAME({ routeName: 'Store', routeURL: `/store/${browsedProfile.peerID}` }));
        // yield put(Actions.Login.IS_LOADING(false))
    }
    catch (e) {
        alert(`Redux-saga: visitStoreSaga() error: ${e}`);
    }
};
////////// INIT_GET_LISTINGS saga ///////////
// saga-watcher
const watchGetListings = function* () {
    yield takeEvery(Actions.OB1.INIT_GET_LISTINGS().type, getListingsSaga);
};
// saga
const getListingsSaga = function* (action) {
    let { auth64 } = yield select((state) => state.reduxLogin);
    let { getObListings } = ob1API.listings;
    let { peerId } = action.payload;
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // clear array of browsedListings
        yield put(Actions.OB1.SET_BROWSED_LISTINGS([]));
        let listings = yield getObListings({ auth64: auth64, peerId: peerId });
        yield put(Actions.OB1.SET_BROWSED_LISTINGS(listings));
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: getObListingsSaga() error: ${e}`);
    }
};
// ////////// INIT_GET_FOLLOWING saga ///////////
// saga-watcher
const watchGetFollowing = function* () {
    yield takeEvery(Actions.OB1.INIT_GET_FOLLOWING().type, getFollowing);
};
// saga
const getFollowing = function* (action) {
    const state = yield select();
    let { auth64 } = state.reduxLogin;
    let { peerId } = action.payload;
    // peerId, is it's another user's store we're browsing
    // in which case, peerIds, would be the peer's peers
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // clear list of people following
        yield put(Actions.OB1.CLEAR_FOLLOWING());
        // fetch peerIds
        const peerIds = yield call(ob1API.follow.getObFollowing, { auth64, peerId });
        // const peerIds = yield call(ob1API.misc.getObPeers, { auth64 })
        // map peerIds to get an array of peerProfiles, and put profile in redux
        yield all(peerIds.map(peerId => fork(fetch_put_following_in_redux, { auth64, peerId })));
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: getFollowersSaga() error: ${e}`);
    }
};
// helper function for GET_FOLLOWERS
const fetch_put_following_in_redux = function* ({ auth64, peerId }) {
    try {
        // get peerProfile
        let peerProfile = yield call(getObProfile, { auth64, peerId: peerId });
        if (peerProfile.peerID && peerProfile.headerHashes) {
            if (peerProfile.headerHashes.original) {
                // if peerProfile has the peerID and headerHashes, put peerProfile in redux
                yield put(Actions.OB1.APPEND_FOLLOWING([peerProfile]));
            }
        }
        return peerProfile;
    }
    catch (err) {
        alert(JSON.stringify(err));
    }
};
// ////////// INIT_GET_FOLLOWERS saga ///////////
// saga-watcher
const watchGetFollowers = function* () {
    yield takeEvery(Actions.OB1.INIT_GET_FOLLOWERS().type, getFollowers);
};
// saga
const getFollowers = function* (action) {
    const state = yield select();
    let { auth64 } = state.reduxLogin;
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // clear followers first
        yield put(Actions.OB1.CLEAR_FOLLOWERS());
        // fetch peerIds
        const peerIds = yield call(ob1API.follow.getObFollowers, { auth64 });
        if (peerIds.length > 0) {
            // map peerIds to get an array of peerProfiles, and put profile in redux
            yield all(peerIds.map(peerId => fork(fetch_put_followers_in_redux, { auth64, peerId })));
        }
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: getFollowersSaga() error: ${e}`);
    }
};
// helper function for GET_FOLLOWERS
const fetch_put_followers_in_redux = function* ({ auth64, peerId }) {
    try {
        // get peerProfile
        let peerProfile = yield call(getObProfile, { auth64, peerId: peerId });
        if (peerProfile.peerID && peerProfile.headerHashes) {
            if (peerProfile.headerHashes.original) {
                // if peerProfile has the peerID and headerHashes, put peerProfile in redux
                yield put(Actions.OB1.APPEND_FOLLOWERS([peerProfile]));
            }
        }
        return peerProfile;
    }
    catch (err) {
        alert(JSON.stringify(err));
    }
};
// ////////// INIT_GET_MODERATORS saga ///////////
// saga-watcher
const watchGetModerators = function* () {
    yield takeEvery(Actions.OB1.INIT_GET_MODERATORS().type, getModerators);
};
// saga
const getModerators = function* () {
    const state = yield select();
    let { auth64 } = state.reduxLogin;
    // let { peerId } = action.payload
    try {
        yield put(Actions.Login.IS_LOADING(true));
        // clear existing list of moderators
        yield put(Actions.OB1.CLEAR_MODERATORS());
        // fetch peerIds
        const peerIds = yield call(ob1API.moderators.getObModerators, { auth64 });
        // const peerIds = yield call(ob1API.misc.getObPeers, { auth64 })
        // map peerIds to get an array of peerProfiles, and put profile in redux
        yield all(peerIds.map(peerId => fork(fetch_put_moderators_in_redux, { auth64, peerId })));
        yield put(Actions.Login.IS_LOADING(false));
    }
    catch (e) {
        alert(`Redux-saga: getFollowersSaga() error: ${e}`);
    }
};
// helper function for GET_FOLLOWERS
const fetch_put_moderators_in_redux = function* ({ auth64, peerId }) {
    try {
        // get peerProfile
        let peerProfile = yield call(getObProfile, { auth64, peerId: peerId });
        if (peerProfile.peerID && peerProfile.moderator && peerProfile.avatarHashes) {
            // if peerProfile has the peerID and avatarHashes, put peerProfile in redux
            yield put(Actions.OB1.APPEND_MODERATORS([peerProfile]));
        }
    }
    catch (err) {
        alert(JSON.stringify(err));
    }
};
//# sourceMappingURL=sagas.js.map