import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import SettingsCountry from './SettingsCountry';
import SettingsCurrency from './SettingsCurrency';
import ListAvatar from '../../components/ListAvatar';
class Settings extends Component {
    render() {
        let profile = this.props.profile;
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(Text, { style: styles.headings }, "Profile"),
            React.createElement(Link, { to: "/settings/user-profile", underlayColor: linkUnderlayColor },
                React.createElement(View, null,
                    React.createElement(ListAvatar, { profile: this.props.profile }))),
            React.createElement(Text, { style: styles.headings }, "Store"),
            React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                React.createElement(List, { containerStyle: styles.listContainer },
                    React.createElement(SettingsCountry, null),
                    React.createElement(SettingsCurrency, null),
                    React.createElement(Link, { to: "/settings/shipping-addresses", underlayColor: linkUnderlayColor },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Shipping Address" }))),
                    React.createElement(Link, { to: "/settings/edit-policies", underlayColor: linkUnderlayColor },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Policies" }))),
                    React.createElement(Link, { to: "/settings/edit-moderators", underlayColor: linkUnderlayColor },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Moderators" }))))),
            React.createElement(Text, { style: styles.headings }, "Moderation"),
            React.createElement(Link, { to: "/settings/edit-moderation-settings", underlayColor: linkUnderlayColor },
                React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                    React.createElement(List, { containerStyle: styles.listContainer },
                        React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Moderation Settings" })))),
            React.createElement(Text, { style: styles.headings }, "Advanced"),
            React.createElement(Link, { to: "/settings/edit-wallets", underlayColor: linkUnderlayColor },
                React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                    React.createElement(List, { containerStyle: styles.listContainer },
                        React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Wallet", rightTitle: this.props.profile.bitcoinPubkey })))),
            React.createElement(View, { style: styles.buttonContainer },
                React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: () => Alert.alert("Pressed!"), onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Logout" }))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
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
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: lightGrey
    },
    listContainerTop: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: lightGrey
    },
    listItem: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
});
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile,
        storeSettings: state.reduxUser.storeSettings,
        moderationSettings: state.reduxUser.moderationSettings,
        advancedSettings: state.reduxUser.advancedSettings,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStoreSettings: (storeSettings) => dispatch(Actions.User.UPDATE_STORE_SETTINGS(storeSettings)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
//# sourceMappingURL=index.js.map