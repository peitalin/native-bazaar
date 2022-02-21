import * as React from 'react';
import { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reduxReducerOB1, reduxReducerUser, reduxReducerRouter, reduxReducerLogin, } from './redux/reducer';
import { Actions } from './redux/actions';
// redux-persist
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// Redux-Saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import history from './redux/routerHistory';
// React-Router
import { Router } from 'react-router-native';
// React-router-navigation
import { Navigation, Card } from 'react-router-navigation';
import { withRouter } from 'react-router';
// React-native-elements components
import { SearchBar, Icon } from 'react-native-elements';
import OpenBazaarApp from './OpenBazaarApp';
import Settings from './views/settings';
import HomePage from './views/home';
import Store from './views/store';
import Listing from './views/listing';
import CreateListing from './views/createlisting';
import UserProfile from './views/settings/UserProfile';
import ShippingAddresses from './views/settings/ShippingAddresses';
import AddShippingAddress from './views/settings/AddShippingAddress';
import EditCountry from './views/settings/EditCountry';
import EditCurrency from './views/settings/EditCurrency';
import EditPolicies from './views/settings/EditPolicies';
import EditModerators from './views/settings/EditModerators';
import EditModerationSettings from './views/settings/EditModerationSettings';
import EditWallets from './views/settings/EditWallets';
class OpenBazaar extends Component {
    constructor() {
        super(...arguments);
        this.handleGoTo = ({ routeName, routeURL }) => {
            this.props.updateRouteName({ routeName, routeURL });
            // this.props.history.go(-this.props.history.length)
        };
        this.handleGoBack = () => {
            this.props.history.goBack();
        };
        this.showSearchBar = () => {
            return this.props.history.location.pathname.includes('home-page');
            // array of routeNames that are compatible
        };
        this.renderNavBar = (props) => {
            // if (this.props.history.location.pathname === '/') {
            //   return (<View></View>)
            // }
            return (React.createElement(View, { style: [{ backgroundColor: '#fff' }] },
                React.createElement(View, { style: {
                        height: 60,
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
                        backgroundColor: '#f6f6f6', borderBottomWidth: 1, borderBottomColor: lightGrey,
                        padding: 10,
                        paddingBottom: 5,
                    } },
                    React.createElement(Icon, { name: 'chevron-left', color: '#222', onPress: this.handleGoBack }),
                    React.createElement(Text, { style: { fontFamily: 'futura', fontSize: 18, fontWeight: '800' } },
                        "OB1: ",
                        this.props.routeName),
                    React.createElement(Icon, { name: 'settings', color: '#222', onPress: () => this.handleGoTo({ routeURL: '/settings', routeName: 'Settings' }) })),
                (this.showSearchBar() &&
                    React.createElement(SearchBar, { lightTheme: true, onChangeText: () => alert('searching'), placeholder: 'Search', containerStyle: {
                            backgroundColor: '#f6f6f6',
                            borderBottomWidth: 0,
                            height: 44,
                            borderTopWidth: 0
                        }, inputStyle: { backgroundColor: '#eaeaea' } }))));
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Navigation, { title: this.props.history.location.pathname, titleStyle: { color: '#f1f1f1' }, backButtonTintColor: "#f1f1f1", navBarStyle: { backgroundColor: '#222' }, renderNavBar: this.renderNavBar },
                React.createElement(Card, { exact: true, path: "/", component: OpenBazaarApp }),
                React.createElement(Card, { path: "/home-page", component: HomePage }),
                React.createElement(Card, { path: "/store/:peerID", component: Store }),
                React.createElement(Card, { path: "/listing/:peerID/:slug", component: Listing }),
                React.createElement(Card, { path: "/createlisting/:peerID", component: CreateListing }),
                React.createElement(Card, { exact: true, path: "/settings", component: Settings }),
                React.createElement(Card, { path: "/settings/user-profile", component: UserProfile }),
                React.createElement(Card, { path: "/settings/shipping-addresses", component: ShippingAddresses }),
                React.createElement(Card, { path: "/settings/add-shipping-address", component: AddShippingAddress }),
                React.createElement(Card, { path: "/settings/edit-country", component: EditCountry }),
                React.createElement(Card, { path: "/settings/edit-currency", component: EditCurrency }),
                React.createElement(Card, { path: "/settings/edit-policies", component: EditPolicies }),
                React.createElement(Card, { path: "/settings/edit-moderators", component: EditModerators }),
                React.createElement(Card, { path: "/settings/edit-moderation-settings", component: EditModerationSettings }),
                React.createElement(Card, { path: "/settings/edit-wallets", component: EditWallets })),
            React.createElement(View, { style: styles.nav },
                React.createElement(TouchableHighlight, { style: styles.navItem, underlayColor: "#444", onPress: () => this.handleGoTo({ routeName: 'Login', routeURL: '/' }) },
                    React.createElement(Text, { style: styles.navItemText }, "Login")),
                React.createElement(TouchableHighlight, { style: styles.navItem, underlayColor: "#444", onPress: () => this.handleGoTo({ routeName: 'Home', routeURL: '/home-page' }) },
                    React.createElement(Text, { style: styles.navItemText }, "Home")),
                React.createElement(TouchableHighlight, { style: styles.navItem, underlayColor: "#444", onPress: () => this.handleGoTo({ routeName: 'Settings', routeURL: '/settings' }) },
                    React.createElement(Text, { style: styles.navItemText }, "Settings")))));
    }
}
const mapStateToProps = (state) => {
    return {
        routeName: state.reduxRouter.routeName,
        routeURL: state.reduxRouter.routeURL,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
    };
};
const OpenBazaarWithRouter = connect(mapStateToProps, mapDispatchToProps)(withRouter(OpenBazaar));
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        fontSize: 20,
    },
    nav: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#222",
        borderColor: "#444",
        borderWidth: 1,
    },
    navItemText: {
        color: '#f1f1f1',
        padding: 2,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    },
});
/////////////// REDUX/REDUX-SAGA ////////////////
const sagaMiddleware = createSagaMiddleware();
let reduxStore = createStore(combineReducers({
    reduxOB1: reduxReducerOB1,
    reduxLogin: reduxReducerLogin,
    reduxUser: reduxReducerUser,
    reduxRouter: reduxReducerRouter,
}), // reducer
applyMiddleware(sagaMiddleware) // redux-saga
);
// redux-presist
persistStore(reduxStore, { storage: AsyncStorage });
// run saga watchers
sagaMiddleware.run(rootSaga);
export default class OpenBazaarWithReduxRouter extends Component {
    render() {
        return (React.createElement(Provider, { key: Math.random(), store: reduxStore },
            React.createElement(Router, { history: history },
                React.createElement(OpenBazaarWithRouter, null))));
    }
}
AppRegistry.registerComponent('OB1', () => OpenBazaarWithReduxRouter);
// must register as 'ob1', since we started project with name: ob1
//# sourceMappingURL=index.ios.js.map