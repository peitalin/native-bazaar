import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
import Flag from 'react-native-flags';
import { countries } from '../../utils/Countries';
import { LazyloadScrollView, LazyloadView } from 'react-native-lazyload';
import { lightGrey, mediumGrey, selectedItemColor } from '../../utils/colors';
const defaultCountries = [
    'AU', 'US', 'CA', 'GB', 'BR', 'CN', 'FR',
    'HK', 'IT', 'JP', 'RU', 'ES', 'SE', 'UA', 'AE',
];
class EditCountry extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            countries: countries,
            loadMoreCountries: false,
        };
        this.handlePress = () => {
            this.props.history.goBack();
        };
        this.handleSelectCountry = (country) => {
            this.props.updateStoreSettings(Object.assign({}, this.props.storeSettings, { country: country }));
            this.props.history.goBack();
        };
        this.handleLoadMoreCountries = () => {
            this.setState({ loadMoreCountries: !this.state.loadMoreCountries });
        };
    }
    render() {
        return (React.createElement(View, { style: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' } },
            React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                    React.createElement(Text, { style: styles.headings }, "Pick your Country")),
                React.createElement(View, { style: { backgroundColor: '#EFEFF4', padding: 0 } },
                    React.createElement(LazyloadScrollView, { style: styles.listContainer, contentContainerStyle: { borderWidth: 0 }, name: "lazyload-list" }, (countries
                        .filter(country => defaultCountries.includes(country.cca2))
                        .map((country, i) => {
                        let selectedCountry = this.props.country.cca2 === country.cca2;
                        return (React.createElement(View, { key: i },
                            React.createElement(TouchableHighlight, { onPress: () => this.handleSelectCountry(country), underlayColor: "#bbb" },
                                React.createElement(LazyloadView, { host: "lazyload-list", style: styles.listItem },
                                    React.createElement(ListItem, { hideChevron: true, containerStyle: selectedCountry ? [styles.listItem, styles.selectedItem] : styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
                                            React.createElement(View, { style: { flex: 1 } },
                                                React.createElement(Flag, { code: country.cca2, size: 24 })),
                                            React.createElement(Text, { style: { flex: 6 } }, country.name),
                                            ((selectedCountry)
                                                ? React.createElement(Text, { style: { flex: 2 } }, ("(Selected)"))
                                                : React.createElement(Text, { style: { flex: 2 } }, ("")))) })))));
                    }))),
                    React.createElement(View, { style: { marginTop: 10, marginBottom: 10, backgroundColor: 'rgba(0, 0, 0, 0)' } },
                        React.createElement(Button, { raised: true, icon: { name: (this.state.loadMoreCountries) ? "keyboard-arrow-up" : "keyboard-arrow-down" }, onPress: this.handleLoadMoreCountries, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: (this.state.loadMoreCountries) ? "Close List" : "Load More Countries" })),
                    React.createElement(LazyloadScrollView, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }, contentContainerStyle: { marginTop: 0 }, name: "lazyload-list-rest" }, (this.state.loadMoreCountries &&
                        countries.map((country, i) => React.createElement(View, { key: i },
                            React.createElement(LazyloadView, { host: "lazyload-list-rest", style: styles.listItem },
                                React.createElement(ListItem, { hideChevron: true, containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(TouchableHighlight, { onPress: () => this.handleSelectCountry(country) },
                                        React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' } },
                                            React.createElement(View, { style: { flex: 1 } },
                                                React.createElement(Flag, { code: country.cca2, size: 24 })),
                                            React.createElement(Text, { style: { flex: 7 } }, country.name))) }))))))))));
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
        padding: 0,
        borderColor: lightGrey,
        backgroundColor: '#fff',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 0,
        borderBottomColor: lightGrey,
        borderBottomWidth: 0.5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: selectedItemColor,
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
});
const mapStateToProps = (state) => {
    return {
        shippingAddresses: state.reduxUser.storeSettings.shippingAddresses,
        country: state.reduxUser.storeSettings.country,
        storeSettings: state.reduxUser.storeSettings,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStoreSettings: (storeSettings) => dispatch(Actions.User.UPDATE_STORE_SETTINGS(storeSettings)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCountry));
//# sourceMappingURL=EditCountry.js.map