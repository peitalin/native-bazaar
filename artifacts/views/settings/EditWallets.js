import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
class EditWallets extends Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            this.props.history.goBack();
        };
    }
    render() {
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(Text, { style: styles.headings }, "Bitcoin Wallets")),
            React.createElement(View, { style: { backgroundColor: '#EFEFF4', padding: 0 } },
                React.createElement(List, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey } }, ([
                    '0x21sqawl34sdf234', '0x1234laxnwq1l234',
                ].map((title, i) => React.createElement(View, { key: i },
                    React.createElement(ListItem, { hideChevron: true, containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { flex: 2 } }, title),
                            React.createElement(Text, { style: { flex: 2 } }, "-"),
                            React.createElement(Text, { style: { flex: 1 } })) })))))),
            React.createElement(View, { style: { marginTop: 10, marginBottom: 10 } },
                React.createElement(Text, { style: styles.headings }, "Resync Wallet"),
                React.createElement(View, { style: { padding: 20, backgroundColor: '#fff' } },
                    React.createElement(Text, null, "This button will trigger the internal Bitcoin Wallet to resynchronise. It is generally advised that you only do this if you suspect that there is a problem with the wallet.")),
                React.createElement(Button, { raised: true, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Resync Wallet" })),
            React.createElement(Link, { to: "/settings", underlayColor: '#f0f4f7' },
                React.createElement(View, { style: { marginTop: 5 } },
                    React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Back to Settings" })))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const styles = StyleSheet.create({
    headings: {
        padding: 10,
        paddingTop: 20,
        color: '#222',
        borderBottomWidth: 0,
        borderColor: lightGrey,
    },
    listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: lightGrey,
        backgroundColor: '#fff',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 0,
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    listItemColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
    addNewAddress: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: lightGrey,
    },
    chosenAddress: {
        backgroundColor: '#90E0F3',
    },
});
const mapStateToProps = (state) => {
    return {
        shippingAddresses: state.reduxUser.storeSettings.shippingAddresses,
        country: state.reduxUser.storeSettings.country,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: ({ userProfile }) => dispatch(Actions.User.UPDATE_USER_PROFILE(userProfile)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditWallets));
//# sourceMappingURL=EditWallets.js.map