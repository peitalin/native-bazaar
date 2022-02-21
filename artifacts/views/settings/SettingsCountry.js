import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { Text, View, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import Flag from 'react-native-flags';
class SettingsCountry extends Component {
    render() {
        return (React.createElement(View, null,
            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Country", component: () => React.createElement(Link, { to: "/settings/edit-country", underlayColor: linkUnderlayColor },
                    React.createElement(View, { style: styles.insideContainer },
                        React.createElement(View, { style: { flex: 5, marginLeft: 20 } },
                            React.createElement(Text, { style: styles.listItemTitle }, "Country")),
                        React.createElement(View, { style: { flex: 1, marginRight: 20 } },
                            React.createElement(View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center' } },
                                React.createElement(Flag, { code: this.props.storeSettings.country.cca2, size: 24 }),
                                React.createElement(Text, { style: styles.listItemTitle }, (` ${this.props.storeSettings.country.cca2}`)),
                                React.createElement(Icon, { name: "keyboard-arrow-right", color: "#222", iconStyle: { fontSize: 28 } }))))) })));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        marginTop: 10,
        paddingBottom: 10,
        paddingRight: 15,
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
export default connect(mapStateToProps, mapDispatchToProps)(SettingsCountry);
//# sourceMappingURL=SettingsCountry.js.map