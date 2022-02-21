import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Text, ScrollView, } from 'react-native';
import { withRouter } from 'react-router';
class Announcements extends Component {
    render() {
        return (React.createElement(ScrollView, { style: [styles.container, { backgroundColor: '#fff', padding: 15 }] },
            React.createElement(Text, { style: styles.heading }, "Welcome to the OB1 testing group!"),
            React.createElement(Text, { style: styles.block }, "We're super excited to share with your somethign we've been working on quietly for the past few months."),
            React.createElement(Text, { style: styles.block }, "The OB1 app will allow anyone in the wolrd to create their own OpenBazaar 2.0 node to buy and sell goods and services for Bitcoin and alternative cryptocurrencies, entirely for free!"),
            React.createElement(Text, { style: styles.block }, "This app is in 'testnet-beta', which means you should expect some weird behaviour and bugs in the app. Also, the app is using testnet coins, *not* real Bitcoin."),
            React.createElement(Text, { style: styles.heading }, "What's New?"),
            React.createElement(Text, { style: styles.block }, "1. The announcements on the Home tab is the first thing that's new to the app. We'll update this seciton continually to let you know whe na new version is coming up, what bugs we've fixed, and any exciting new features."),
            React.createElement(Text, { style: styles.block }, "2. For our early testers, you should hopefully find that most of the bugs you've reported have been fixed. But if we've missed something, don't hesitate to remind us."),
            React.createElement(Text, { style: styles.block }, "That's all for now, check back soon for more updates!")));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    heading: {
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
    },
    block: {
        paddingTop: 5,
        paddingBottom: 5,
    },
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default withRouter(Announcements);
//# sourceMappingURL=announcements.js.map