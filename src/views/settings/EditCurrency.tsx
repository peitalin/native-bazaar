
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native';
import {
  Text,
  View,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import { List, ListItem, Button, Avatar } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Settings } from '../../typings/ob1Types'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'

import Price from '../../components/Price'
import { APIgatewayURL, ob1API } from '../../redux/requests'
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from '../../utils/colors'



class EditCurrency extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  state = {
    exchangeRates: {
      "USD": {"15m" : 478.68, "last" : 478.68, "buy" : 478.55, "sell" : 478.68,  "symbol" : "$"},
      "JPY": {"15m" : 51033.99, "last" : 51033.99, "buy" : 51020.13, "sell" : 51033.99,  "symbol" : "¥"},
      "CNY": {"15m" : 2937.05, "last" : 2937.05, "buy" : 2936.25, "sell" : 2937.05,  "symbol" : "¥"},
      "SGD": {"15m" : 605.39, "last" : 605.39, "buy" : 605.22, "sell" : 605.39,  "symbol" : "$"},
      "HKD": {"15m" : 3709.91, "last" : 3709.91, "buy" : 3708.9, "sell" : 3709.91,  "symbol" : "$"},
      "CAD": {"15m" : 526.72, "last" : 526.72, "buy" : 526.58, "sell" : 526.72,  "symbol" : "$"},
      "NZD": {"15m" : 582.26, "last" : 582.26, "buy" : 582.1, "sell" : 582.26,  "symbol" : "$"},
      "AUD": {"15m" : 524.61, "last" : 524.61, "buy" : 524.46, "sell" : 524.61,  "symbol" : "$"},
      "CLP": {"15m" : 283014.81, "last" : 283014.81, "buy" : 282937.95, "sell" : 283014.81,  "symbol" : "$"},
      "GBP": {"15m" : 297.4, "last" : 297.4, "buy" : 297.32, "sell" : 297.4,  "symbol" : "£"},
      "DKK": {"15m" : 2756.84, "last" : 2756.84, "buy" : 2756.09, "sell" : 2756.84,  "symbol" : "kr"},
      "SEK": {"15m" : 3403.41, "last" : 3403.41, "buy" : 3402.49, "sell" : 3403.41,  "symbol" : "kr"},
      "ISK": {"15m" : 56797.78, "last" : 56797.78, "buy" : 56782.35, "sell" : 56797.78,  "symbol" : "kr"},
      "CHF": {"15m" : 447.19, "last" : 447.19, "buy" : 447.07, "sell" : 447.19,  "symbol" : "CHF"},
      "BRL": {"15m" : 1093.06, "last" : 1093.06, "buy" : 1092.77, "sell" : 1093.06,  "symbol" : "R$"},
      "EUR": {"15m" : 370.13, "last" : 370.13, "buy" : 370.03, "sell" : 370.13,  "symbol" : "€"},
      "RUB": {"15m" : 17806.28, "last" : 17806.28, "buy" : 17801.44, "sell" : 17806.28,  "symbol" : "RUB"},
      "PLN": {"15m" : 1557.38, "last" : 1557.38, "buy" : 1556.96, "sell" : 1557.38,  "symbol" : "zł"},
      "THB": {"15m" : 15398.04, "last" : 15398.04, "buy" : 15393.86, "sell" : 15398.04,  "symbol" : "฿"},
      "KRW": {"15m" : 494436.55, "last" : 494436.55, "buy" : 494302.27, "sell" : 494436.55,  "symbol" : "₩"},
      "TWD": {"15m" : 14340.68, "last" : 14340.68, "buy" : 14336.79, "sell" : 14340.68,  "symbol" : "NT$"},
    }
  }

  componentWillMount() {
    let url = 'https://blockchain.info/ticker'
    fetch(url).then(res => res.json()).then(data => {
      this.setState({ exchangeRates: data })
    })
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleChangeCurrency = async(localCurrency: string) => {
    let res = await ob1API.settings.patchObSettings({
      auth64: this.props.auth64,
      body: {
        localCurrency: localCurrency
      } // patchObSettings: I only need to send changes in user settings
    })
    this.props.updateSettings({
      ...this.props.settings,
      localCurrency: localCurrency,
    })
    this.props.history.goBack()
  }

  generateCurrencyItems = () => {
    return (
      <View>
      {(
        Object.keys(this.state.exchangeRates).map((key, i) => {

          let symbol = this.state.exchangeRates[key]['symbol']
          let exchangeRate = this.state.exchangeRates[key]['15m']
          let selectedCurrency = this.props.settings.localCurrency === key

          return (
            <TouchableHighlight key={i}
              onPress={() => this.handleChangeCurrency(key)}
            >
              <View>
                <ListItem
                  hideChevron
                  containerStyle={selectedCurrency ? [styles.listItem, styles.selectedItem] : styles.listItem}
                  titleStyle={styles.listItemTitle}
                  title={
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ flex: 1 }}>{ key }</Text>
                      <Price style={{ flex: 1 }} price={exchangeRate} symbol={symbol}/>
                      <View style={{ flex: 1 }}>
                      {(
                        (selectedCurrency)
                        ? <Text style={{ flex: 1 }}>{( " (Selected)" )}</Text>
                        : <Text style={{ flex: 1 }}>{( "" )}</Text>
                      )}
                      </View>
                    </View>
                  }
                />
              </View>
            </TouchableHighlight>
          )
        })
      )}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Pick your Currency</Text>
        </View>

        <View style={{ backgroundColor: '#EFEFF4', padding: 0 }}>
          <List style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}>
            <TouchableHighlight onPress={() => this.handleChangeCurrency('BTC')}>
              <View>
                <ListItem
                  hideChevron
                  containerStyle={(this.props.settings.localCurrency === 'BTC')
                    ? [styles.listItem, styles.selectedItem]
                    : styles.listItem
                  }
                  titleStyle={styles.listItemTitle}
                  title={
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ flex: 1 }}>{( "Bitcoin (Ƀ)" )}</Text>
                      {(
                        (this.props.settings.localCurrency === 'BTC')
                        ? <Text style={{ flex: 2 }}>{( " (Selected)" )}</Text>
                        : <Text style={{ flex: 2 }}>{( "" )}</Text>
                      )}
                    </View>
                  }
                />
              </View>
            </TouchableHighlight>
          {(
            !this.state.exchangeRates
            ? <Text>Loading...</Text>
            : this.generateCurrencyItems()
          )}
          </List>
        </View>

        <Link to="/settings" underlayColor='#f0f4f7'>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Button
              raised
              icon={{name: 'reply'}}
              onPress={this.handlePress}
              onLongPress={() => alert("Long Pressed")}
              buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
              textStyle={{textAlign: 'center'}}
              title={"Back to Settings"}
            />
          </View>
        </Link>
      </ScrollView>
    )
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
    borderBottomWidth: 1 ,
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
})


interface ReduxDispatchProps {
  updateSettings?(settings: iOB1Settings): Dispatch<ActionType>
}
interface ReduxProps {
  settings?: iOB1Settings
  auth64?: string
}
interface ReactProps {
}
interface ReactState {
  exchangeRates?: iExchangeRate
}
interface iExchangeRate {
  [key: string]: {
    '15m': number
    last: number
    buy: number
    sell: number
    symbol: string
  }
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    settings: state.reduxSettings.settings,
    auth64: state.reduxLogin.auth64,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateSettings: ( settings: iOB1Settings ) => dispatch(
      Actions.Settings.UPDATE_SETTINGS( settings )
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditCurrency ))

