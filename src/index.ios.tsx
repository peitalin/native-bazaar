
import * as React from 'react'
import { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Platform,
} from 'react-native'
// React-router
import { Router } from 'react-router-native'
import history from './redux/routerHistory'
// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import {
  reduxReducerOB1,
  reduxReducerUser,
  reduxReducerRouter,
  reduxReducerLogin,
  reduxReducerSettings,
} from './redux/reducer'
// redux-persist
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
// Redux-Saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/sagas'
import OB1Routes from './OB1Routes'



/////////////// REDUX/REDUX-SAGA ////////////////
const sagaMiddleware = createSagaMiddleware()

let reduxStore = createStore(
  combineReducers({
    reduxOB1: reduxReducerOB1,
    reduxLogin: reduxReducerLogin,
    reduxUser: reduxReducerUser,
    reduxRouter: reduxReducerRouter,
    reduxSettings: reduxReducerSettings,
  }), // reducer
  applyMiddleware(sagaMiddleware) // redux-saga
);
// redux-presist
persistStore(reduxStore, { storage: AsyncStorage })
// run saga watchers
sagaMiddleware.run(rootSaga)


export default class OpenBazaarWithReduxRouter extends Component<any, any> {
  render() {
    // NOTE: remove key-{Math.random() in production}
    // It's just a hack to get hot-reloading working with redux
    return (
      <Provider key={Math.random()} store={reduxStore}>
        <Router history={history}>
          <OB1Routes/>
        </Router>
      </Provider>
    )
  }
}


AppRegistry.registerComponent('OB1', () => OpenBazaarWithReduxRouter);

