import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import { lightGrey, mediumGrey, linkUnderlayColor } from '../../utils/colors';
class SettingsCurrency extends Component {
    render() {
        return (React.createElement(Link, { to: "/settings/edit-currency", underlayColor: linkUnderlayColor },
            React.createElement(View, null,
                React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Currency", component: () => React.createElement(View, { style: styles.insideContainer },
                        React.createElement(View, { style: { flex: 1, marginLeft: 20 } },
                            React.createElement(Text, { style: styles.listItemTitle }, "Currency")),
                        React.createElement(View, { style: { flex: 1 } },
                            React.createElement(View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10 } },
                                React.createElement(Text, { style: styles.listItemTitle }, (`${this.props.storeSettings.currency.name} (${this.props.storeSettings.currency.symbol})`)),
                                React.createElement(Icon, { name: "keyboard-arrow-right", color: "#222", iconStyle: { fontSize: 28 } })))) }))));
    }
}
const styles = StyleSheet.create({
    listItem: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
    insideContainer: {
        flex: 1,
        flexDirection: 'row', alignItems: 'center',
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        marginTop: 10,
        paddingBottom: 10,
        paddingRight: 0,
        marginRight: 0,
    },
});
const mapStateToProps = (state) => {
    return {
        storeSettings: state.reduxUser.storeSettings,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStoreSettings: (storeSettings) => dispatch(Actions.User.UPDATE_STORE_SETTINGS(storeSettings)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingsCurrency);
//# sourceMappingURL=SettingsCurrency.js.map