import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
class EditModeratorSettings extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            applyToBeMod: false
        };
        this.handlePress = () => {
            this.setState({ applyToBeMod: !this.state.applyToBeMod });
        };
    }
    render() {
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(Text, { style: styles.headings }, "Edit Your Moderator Profile")),
            React.createElement(View, { style: { backgroundColor: '#EFEFF4', padding: 0 } },
                React.createElement(List, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey } },
                    React.createElement(ListItem, { hideChevron: true, containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, { style: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' } },
                            React.createElement(Text, { style: { fontWeight: '600' } }, " Moderators "),
                            React.createElement(Text, { style: { flex: 1, margin: 5 } }, "Moderators on the OpenBazaar network help resolve disputes between buyers and vendors, and release funds held in escrow. Anyone can become a moderator on the network, but you should do so only if you are serious about offering your services to OpenBazaar users."),
                            React.createElement(Text, { style: { flex: 1, margin: 5 } }, "Moderators need to respond quickly to new disputes, communicate with both parties to learn the details of the dispute, and then impartially settle the dispute and distribute the escrowed funds.")) }))),
            React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } }, (!this.state.applyToBeMod
                ? React.createElement(Button, { raised: true, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Become a Moderator" })
                : React.createElement(View, null,
                    React.createElement(Text, { style: styles.headings }, "Profile Information"),
                    React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                        React.createElement(List, { containerStyle: styles.listContainer },
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Description" }),
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Terms of Service" }))),
                    React.createElement(Text, { style: styles.headings }, "Languages"),
                    React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                        React.createElement(List, { containerStyle: styles.listContainer },
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Primary Language" }),
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Secondary Language" }),
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Third Language" }))),
                    React.createElement(Text, { style: styles.headings }, "Fees"),
                    React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                        React.createElement(List, { containerStyle: styles.listContainer },
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Flat Fee or Percentage or Flat Fee + Percentage" }),
                            React.createElement(ListItem, { hideChevron: true, containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Fee ($)", rightTitle: "Enter Amount" }))),
                    React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } },
                        React.createElement(Button, { raised: true, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#BB4959', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Stop Being a Moderator" })))))));
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
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: ({ userProfile }) => dispatch(Actions.User.UPDATE_USER_PROFILE(userProfile)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditModeratorSettings));
//# sourceMappingURL=EditModerationSettings.js.map