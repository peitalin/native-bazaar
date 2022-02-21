
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'
// React-Router
import { Router, Route, Link } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'
import history from './redux/routerHistory'
// React-router-navigation
import { Navigation, Card, NavBar } from 'react-router-navigation'
// React-redux
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateRouter } from './redux/reducer'
import { Actions, ActionType } from './redux/actions'
// colors
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from './utils/colors'
// React-native-elements components
import { Button, SearchBar, Icon } from 'react-native-elements'


// OB1 app views and components
import Login from './views/Login'
import Settings from './views/settings'
import HomePage from './views/home'
import Store from './views/store'
import Listing from './views/listing'
import CreateListing from './views/createlisting'

import UserProfile from './views/settings/UserProfile'
import ShippingAddresses from './views/settings/ShippingAddresses'
import AddShippingAddress from './views/settings/AddShippingAddress'
import EditCountry from './views/settings/EditCountry'
import EditCurrency from './views/settings/EditCurrency'
import EditPolicies from './views/settings/EditPolicies'
import EditModerators from './views/settings/EditModerators'
import EditModerationSettings from './views/settings/EditModerationSettings'
import EditWallets from './views/settings/EditWallets'


class OB1Routes extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  handleGoTo = ({ routeName, routeURL }) => {
    this.props.updateRouteName({ routeName, routeURL })
    // this.props.history.go(-this.props.history.length)
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  showSearchBar = () => {
    return this.props.history.location.pathname.includes('home-page')
    // array of routeNames that are compatible
  }

  isLoginPage = () => {
    return this.props.history.location.pathname === '/'
    // array of routeNames that are compatible
  }

  renderNavBar = (props: ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>) => {
    return (
      <View style={[ { backgroundColor: '#fff' } ]}>
        {/* <NavBar {...props}/> */}
        {(
          !this.isLoginPage()
          ? <View style={{
              height: 60,
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
              backgroundColor: '#f6f6f6', borderBottomWidth: 1, borderBottomColor: lightGrey,
              padding: 10,
              paddingBottom: 5,
            }}>
                <Icon name='chevron-left' color='#222' onPress={this.handleGoBack} />
                <Text style={{ fontFamily: 'futura', fontSize: 18, fontWeight: '800' }}>
                  OB1: {this.props.routeName}
                </Text>
                <Icon name='settings' color='#222' onPress={() => this.handleGoTo({ routeURL: '/settings', routeName: 'Settings' })}/>
            </View>
          : <View/>
        )}
        {(
          this.showSearchBar() &&
          <SearchBar
            lightTheme
            onChangeText={() => alert('searching')}
            placeholder='Search'
            containerStyle={{
              backgroundColor: '#f6f6f6',
              borderBottomWidth: 0,
              height: 44,
              borderTopWidth: 0
            }}
            inputStyle={{ backgroundColor: '#eaeaea' }}
          />
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation
          title={this.props.history.location.pathname}
          titleStyle={{ color: '#f1f1f1' }}
          backButtonTintColor="#f1f1f1"
          navBarStyle={{ backgroundColor: '#222' }}
          renderNavBar={this.renderNavBar}
        >
          <Card exact path="/" component={ Login }/>
          <Card path="/home-page" component={ HomePage }/>
          <Card path="/store/:peerID" component={ Store }/>
          <Card path="/listing/:peerID/:slug" component={ Listing }/>
          <Card path="/createlisting/:peerID" component={ CreateListing }/>

          <Card exact path="/settings" component={ Settings }/>
          <Card path="/settings/user-profile" component={ UserProfile }/>
          <Card path="/settings/shipping-addresses" component={ ShippingAddresses }/>
          <Card path="/settings/add-shipping-address" component={ AddShippingAddress }/>
          <Card path="/settings/edit-country" component={ EditCountry }/>
          <Card path="/settings/edit-currency" component={ EditCurrency }/>
          <Card path="/settings/edit-policies" component={ EditPolicies }/>
          <Card path="/settings/edit-moderators" component={ EditModerators }/>
          <Card path="/settings/edit-moderation-settings" component={ EditModerationSettings }/>
          <Card path="/settings/edit-wallets" component={ EditWallets }/>
        </Navigation>

        <View style={styles.nav}>
          <TouchableHighlight
            style={styles.navItem}
            underlayColor="#444"
            onPress={() => this.handleGoTo({ routeName: 'Login', routeURL: '/' })}
          >
            <Text style={styles.navItemText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.navItem}
            underlayColor="#444"
            onPress={() => this.handleGoTo({ routeName: 'Home', routeURL: '/home-page' })}
          >
            <Text style={styles.navItemText}>Home</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.navItem}
            underlayColor="#444"
            onPress={() => this.handleGoTo({ routeName: 'Settings', routeURL: '/settings' })}
          >
            <Text style={styles.navItemText}>Settings</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    padding: 0,
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    fontSize: 20,
  },
  nav: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#222",
    borderColor: "#444",
    borderWidth: 1,
  },
  navItemText: {
    color: '#f1f1f1',
    padding: 2,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
})

interface ReduxDispatchProps {
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
}
interface ReduxProps {
  routeName?: string
  routeURL?: string
}
interface ReactProps {
}
interface ReactState {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    routeName: state.reduxRouter.routeName,
    routeURL: state.reduxRouter.routeURL,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter( OB1Routes ))
