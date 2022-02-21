import * as React from 'react';
import { Component } from 'react';
import { AppRegistry, StyleSheet, Platform, View, Text } from 'react-native';
// Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reduxReducerOB1, reduxReducerUser } from './redux/reducer';
// React-Router
import { Route, Link, BrowserRouter } from 'react-router-dom';
import OpenBazaarApp from './OpenBazaarApp.web';
let reduxStore = createStore(combineReducers({
    reduxOB1: reduxReducerOB1,
    reduxUser: reduxReducerUser,
}));
class Home extends Component {
    render() {
        return (React.createElement(Text, { style: styles.header }, "Home"));
    }
}
class About extends Component {
    render() {
        return (React.createElement(Text, { style: styles.header }, "About"));
    }
}
export default class OB1 extends Component {
    render() {
        return (React.createElement(BrowserRouter, null,
            React.createElement(Provider, { key: Math.random(), store: reduxStore },
                React.createElement(View, { style: styles.container },
                    React.createElement(View, { style: styles.nav },
                        React.createElement(Link, { to: "/", style: navItem },
                            React.createElement(Text, null, "Home")),
                        React.createElement(Link, { to: "/about", style: navItem },
                            React.createElement(Text, null, "About")),
                        React.createElement(Link, { to: "/openbazaar", style: navItem },
                            React.createElement(Text, null, "Open"),
                            " Bazaar")),
                    React.createElement(Route, { exact: true, path: "/", component: Home }),
                    React.createElement(Route, { path: "/about", component: About }),
                    React.createElement(Route, { path: "/openbazaar", component: OpenBazaarApp })))));
    }
}
const navItem = {
    padding: 10,
    backgroundColor: "#2a9",
    borderColor: "#222",
    borderWidth: 1,
};
const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        alignItems: "center",
        padding: 10,
        backgroundColor: "#2a9",
        borderColor: "#222",
        borderWidth: 1,
    },
    subNavItem: {
        padding: 5,
    },
    topic: {
        textAlign: 'center',
        fontSize: 15,
    }
});
console.info(Object(styles.navItem));
AppRegistry.registerComponent('ob1', () => OB1);
if (Platform.OS === 'web') {
    AppRegistry.runApplication('ob1', {
        rootTag: document.getElementById('react-root')
    });
}
//# sourceMappingURL=index.web.js.map