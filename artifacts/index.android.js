import * as React from 'react';
import { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableHighlight } from 'react-native';
// Redux
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reduxReducerOB1, reduxReducerUser, reduxReducerRouter } from './redux/reducer';
import { Actions } from './redux/actions';
// React-Router
import { NativeRouter } from 'react-router-native';
// React-router-navigation
import { Navigation, Card } from 'react-router-navigation';
import { withRouter } from 'react-router';
import OpenBazaarApp from './OpenBazaarApp';
import Settings from './views/settings';
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
        this.handlePress = ({ routeName, routeURL }) => {
            this.props.updateRouteName({ routeName, routeURL });
            this.props.history.push(routeURL);
        };
        this.handleGoHome = ({ routeName, routeURL }) => {
            this.props.updateRouteName({ routeName, routeURL });
            this.props.history.go(-this.props.history.length);
        };
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Navigation, { title: this.props.routeName, titleStyle: { color: '#f1f1f1' }, backButtonTintColor: "#f1f1f1", navBarStyle: { backgroundColor: '#222' } },
                React.createElement(Card, { exact: true, path: "/", component: OpenBazaarApp }),
                React.createElement(Card, { path: "/settings", component: Settings }),
                React.createElement(Card, { path: "/user-profile", component: UserProfile }),
                React.createElement(Card, { path: "/shipping-addresses", component: ShippingAddresses }),
                React.createElement(Card, { path: "/add-shipping-address", component: AddShippingAddress }),
                React.createElement(Card, { path: "/edit-country", component: EditCountry }),
                React.createElement(Card, { path: "/edit-currency", component: EditCurrency }),
                React.createElement(Card, { path: "/edit-policies", component: EditPolicies }),
                React.createElement(Card, { path: "/edit-moderators", component: EditModerators }),
                React.createElement(Card, { path: "/edit-moderation-settings", component: EditModerationSettings }),
                React.createElement(Card, { path: "/edit-wallets", component: EditWallets })),
            React.createElement(View, { style: styles.nav },
                React.createElement(TouchableHighlight, { style: styles.navItem, underlayColor: "#444", onPress: () => this.handleGoHome({ routeName: 'Home', routeURL: '/' }) },
                    React.createElement(Text, { style: styles.navItemText }, "Open Bazaar")),
                React.createElement(TouchableHighlight, { style: styles.navItem, underlayColor: "#444", onPress: () => this.handlePress({ routeName: 'Settings', routeURL: '/settings' }) },
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
    }
});
/////////////// REDUX ////////////////
let reduxStore = createStore(combineReducers({
    reduxOB1: reduxReducerOB1,
    reduxUser: reduxReducerUser,
    reduxRouter: reduxReducerRouter,
}));
export default class OpenBazaarWithReduxRouter extends Component {
    render() {
        return (React.createElement(Provider, { key: Math.random(), store: reduxStore },
            React.createElement(NativeRouter, null,
                React.createElement(OpenBazaarWithRouter, null))));
    }
}
AppRegistry.registerComponent('ob1', () => OpenBazaarWithReduxRouter);
// must register as 'ob1', since we started project with name: ob1
//# sourceMappingURL=index.android.js.map