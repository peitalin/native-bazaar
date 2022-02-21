import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Alert, View, ScrollView, TouchableHighlight, } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import { selectedItemColor, lightGrey, mediumGrey } from '../../utils/colors';
class ShippingAddresses extends Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            this.props.history.goBack();
        };
        this.handleEditAddress = () => {
            this.props.history.push('/settings/add-shipping-address');
        };
        this.handleSelectAddress = (id) => {
            let newShippingAddresses = this.props.shippingAddresses.map(address => {
                return (address.id === id)
                    ? Object.assign({}, address, { chosenAddress: true }) : Object.assign({}, address, { chosenAddress: false });
            });
            // alert(JSON.stringify(newShippingAddresses))
            this.props.updateShippingAddress(newShippingAddresses);
        };
    }
    componentWillMount() {
    }
    render() {
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(Text, { style: styles.headings }, "Shipping Addresses")),
            React.createElement(Link, { to: "/settings/add-shipping-address", underlayColor: '#f0f4f7' },
                React.createElement(View, null,
                    React.createElement(List, { style: { borderTopWidth: 1, borderTopColor: lightGrey, borderBottomColor: lightGrey } },
                        React.createElement(ListItem, { chevronColor: "#222", title: "Add New Address", containerStyle: styles.listItem, titleStyle: styles.addNewAddress })))),
            React.createElement(List, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey } }, this.props.shippingAddresses.map((address, i) => React.createElement(TouchableHighlight, { key: i, onLongPress: this.handleEditAddress, onPress: () => this.handleSelectAddress(i) },
                React.createElement(View, { key: i },
                    React.createElement(ListItem, { chevronColor: "#222", title: `${address.streetNumber} ${address.street}`, containerStyle: address.chosenAddress ? [styles.listItem, styles.selectedItem] : styles.listItem, titleStyle: styles.listItemAddress, subtitle: React.createElement(View, { style: address.chosenAddress
                                ? [styles.listItem, styles.noBorder, styles.listItemColumn, styles.selectedItem]
                                : [styles.listItem, styles.noBorder, styles.listItemColumn] },
                            React.createElement(View, { style: styles.addressItems },
                                React.createElement(Text, { style: { flex: 1 } }, "Suburb:"),
                                React.createElement(Text, { style: { flex: 1 } }, (`${address.suburb}`))),
                            React.createElement(View, { style: styles.addressItems },
                                React.createElement(Text, { style: { flex: 1 } }, "City:"),
                                React.createElement(Text, { style: { flex: 1 } }, (`${address.city}`))),
                            React.createElement(View, { style: styles.addressItems },
                                React.createElement(Text, { style: { flex: 1 } }, "Country:"),
                                React.createElement(Text, { style: { flex: 1 } }, (`${this.props.country.name}`))),
                            React.createElement(View, { style: styles.addressItems },
                                React.createElement(Text, { style: { flex: 1 } }, "Post Code:"),
                                React.createElement(Text, { style: { flex: 1 } }, (`${address.postCode}`))),
                            (address.chosenAddress
                                ? React.createElement(View, { style: { height: 10 } },
                                    React.createElement(Text, { style: { color: "#96616B" } }, "(Currently Selected)"))
                                : React.createElement(View, { style: { height: 10 } }))), rightTitle: "Hold to Edit", rightTitleContainerStyle: { flex: 0 } }))))),
            React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } },
                React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Back to Settings" }))));
    }
}
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
        padding: 10,
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
    },
    selectedItem: {
        backgroundColor: selectedItemColor,
    },
    noBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    listItemColumn: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listItemAddress: {
        color: '#222',
        fontSize: 16,
    },
    addNewAddress: {
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: lightGrey,
    },
    chosenAddress: {
        backgroundColor: mediumGrey,
    },
    addressItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    }
});
const mapStateToProps = (state) => {
    return {
        shippingAddresses: state.reduxUser.storeSettings.shippingAddresses,
        country: state.reduxUser.storeSettings.country,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateShippingAddress: (shippingAddresses) => dispatch(Actions.User.UPDATE_SHIPPING_ADDRESSES(shippingAddresses)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShippingAddresses));
//# sourceMappingURL=ShippingAddresses.js.map