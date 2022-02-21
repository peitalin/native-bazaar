import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import Price from '../../components/Price';
import { lightGrey, mediumGrey, selectedItemColor } from '../../utils/colors';
class EditCurrency extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            exchangeRates: {
                "USD": { "15m": 478.68, "last": 478.68, "buy": 478.55, "sell": 478.68, "symbol": "$" },
                "JPY": { "15m": 51033.99, "last": 51033.99, "buy": 51020.13, "sell": 51033.99, "symbol": "¥" },
                "CNY": { "15m": 2937.05, "last": 2937.05, "buy": 2936.25, "sell": 2937.05, "symbol": "¥" },
                "SGD": { "15m": 605.39, "last": 605.39, "buy": 605.22, "sell": 605.39, "symbol": "$" },
                "HKD": { "15m": 3709.91, "last": 3709.91, "buy": 3708.9, "sell": 3709.91, "symbol": "$" },
                "CAD": { "15m": 526.72, "last": 526.72, "buy": 526.58, "sell": 526.72, "symbol": "$" },
                "NZD": { "15m": 582.26, "last": 582.26, "buy": 582.1, "sell": 582.26, "symbol": "$" },
                "AUD": { "15m": 524.61, "last": 524.61, "buy": 524.46, "sell": 524.61, "symbol": "$" },
                "CLP": { "15m": 283014.81, "last": 283014.81, "buy": 282937.95, "sell": 283014.81, "symbol": "$" },
                "GBP": { "15m": 297.4, "last": 297.4, "buy": 297.32, "sell": 297.4, "symbol": "£" },
                "DKK": { "15m": 2756.84, "last": 2756.84, "buy": 2756.09, "sell": 2756.84, "symbol": "kr" },
                "SEK": { "15m": 3403.41, "last": 3403.41, "buy": 3402.49, "sell": 3403.41, "symbol": "kr" },
                "ISK": { "15m": 56797.78, "last": 56797.78, "buy": 56782.35, "sell": 56797.78, "symbol": "kr" },
                "CHF": { "15m": 447.19, "last": 447.19, "buy": 447.07, "sell": 447.19, "symbol": "CHF" },
                "BRL": { "15m": 1093.06, "last": 1093.06, "buy": 1092.77, "sell": 1093.06, "symbol": "R$" },
                "EUR": { "15m": 370.13, "last": 370.13, "buy": 370.03, "sell": 370.13, "symbol": "€" },
                "RUB": { "15m": 17806.28, "last": 17806.28, "buy": 17801.44, "sell": 17806.28, "symbol": "RUB" },
                "PLN": { "15m": 1557.38, "last": 1557.38, "buy": 1556.96, "sell": 1557.38, "symbol": "zł" },
                "THB": { "15m": 15398.04, "last": 15398.04, "buy": 15393.86, "sell": 15398.04, "symbol": "฿" },
                "KRW": { "15m": 494436.55, "last": 494436.55, "buy": 494302.27, "sell": 494436.55, "symbol": "₩" },
                "TWD": { "15m": 14340.68, "last": 14340.68, "buy": 14336.79, "sell": 14340.68, "symbol": "NT$" },
            }
        };
        this.handlePress = () => {
            this.props.history.goBack();
        };
        this.handleChangeCurrency = (currency) => {
            this.props.updateStoreSettings(Object.assign({}, this.props.storeSettings, { currency: currency }));
            this.props.history.goBack();
        };
        this.generateCurrencyItems = () => {
            return (React.createElement(View, null, (Object.keys(this.state.exchangeRates).map((key, i) => {
                let symbol = this.state.exchangeRates[key]['symbol'];
                let exchangeRate = this.state.exchangeRates[key]['15m'];
                let selectedCurrency = this.props.storeSettings.currency.code === key;
                return (React.createElement(TouchableHighlight, { key: i, onPress: () => this.handleChangeCurrency({
                        name: key,
                        code: key,
                        symbol: this.state.exchangeRates[key]['symbol'],
                    }) },
                    React.createElement(View, null,
                        React.createElement(ListItem, { hideChevron: true, containerStyle: selectedCurrency ? [styles.listItem, styles.selectedItem] : styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' } },
                                React.createElement(Text, { style: { flex: 1 } }, key),
                                React.createElement(Price, { style: { flex: 1 }, price: exchangeRate, symbol: symbol }),
                                React.createElement(View, { style: { flex: 1 } }, ((selectedCurrency)
                                    ? React.createElement(Text, { style: { flex: 1 } }, (" (Selected)"))
                                    : React.createElement(Text, { style: { flex: 1 } }, (""))))) }))));
            }))));
        };
    }
    componentWillMount() {
        let url = 'https://blockchain.info/ticker';
        fetch(url).then(res => res.json()).then(data => {
            this.setState({ exchangeRates: data });
        });
    }
    render() {
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(Text, { style: styles.headings }, "Pick your Currency")),
            React.createElement(View, { style: { backgroundColor: '#EFEFF4', padding: 0 } },
                React.createElement(List, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey } },
                    React.createElement(TouchableHighlight, { onPress: () => this.handleChangeCurrency({
                            name: 'Bitcoin', symbol: 'Ƀ', code: 'BTC'
                        }) },
                        React.createElement(View, null,
                            React.createElement(ListItem, { hideChevron: true, containerStyle: (this.props.storeSettings.currency.code === 'BTC')
                                    ? [styles.listItem, styles.selectedItem]
                                    : styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' } },
                                    React.createElement(Text, { style: { flex: 1 } }, ("Bitcoin (Ƀ)")),
                                    ((this.props.storeSettings.currency.code === 'BTC')
                                        ? React.createElement(Text, { style: { flex: 2 } }, (" (Selected)"))
                                        : React.createElement(Text, { style: { flex: 2 } }, ("")))) }))),
                    (!this.state.exchangeRates
                        ? React.createElement(Text, null, "Loading...")
                        : this.generateCurrencyItems()))),
            React.createElement(Link, { to: "/settings", underlayColor: '#f0f4f7' },
                React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } },
                    React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Back to Settings" })))));
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
        padding: 0,
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
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
        storeSettings: state.reduxUser.storeSettings
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateStoreSettings: (storeSettings) => dispatch(Actions.User.UPDATE_STORE_SETTINGS(storeSettings)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCurrency));
//# sourceMappingURL=EditCurrency.js.map