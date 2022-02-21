
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native'

import {
  Button,
  List,
  ListItem,
  Icon,
} from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'
import { iOB1Profile } from '../../typings/ob1Types'

import FastImage from 'react-native-fast-image'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL, ob1API } from '../../redux/requests'
const windowWidth = Dimensions.get('window').width

import StoreFront from '../store/storefront'



class Channel extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  goToStore = ({ peerID }) => {
    this.props.updateRouteName({
      routeName: 'Store',
      routeURL: `/store/${peerID}`,
    })
  }

  componentWillMount() {
    // load up connected peers
    // http://{{url}}:{{port}}/ob/peers
    // use those peerIds and then map them to userProfile requests
    // -> now we have a bunch of stores to browse.

    setTimeout(() => {
      this.props.getObPeerProfiles({ auth64: this.props.auth64 })
    }, 0)
    if (this.props.peerProfiles.length < 1) {
      // this.props.getObPeerProfiles({ auth64: this.props.auth64 })
      // add 0ms delay before requesting profiles
      // Workaround, OTHERWISE ERROR??
      setTimeout(() => {
        this.props.getObPeerProfiles({ auth64: this.props.auth64 })
        // SLOW LOAD... which congests all following requests
        // redux-saga FORK is not working as expected???!
      }, 0)
    }
  }


  render() {
    return (
      <ScrollView style={[ styles.container ]}>
        <View style={{
          backgroundColor: '#fff',
          borderBottomColor: '#f1f1f1',
          borderBottomWidth: 1,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
          <StoreFront
            profile={this.props.profile}
            auth64={this.props.auth64}
            isMyStore={true}
            storeTitle={'Manage My Store'}
          />
        </View>
        <ListItem
          chevronColor="#222"
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          title={'Collections'}
        />

        <CategoryBelt/>

        <View style={{
          flex: 1,
          borderBottomColor: '#f1f1f1',
          borderBottomWidth: 1,
        }}>

          {(
              (this.props.isLoading)
              ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                  <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
                    {( `Loading Peer Stores...` )}
                  </Text>
                  <ActivityIndicator
                    color="#222"
                    animating={true}
                  />
                </View>
              : <View/>
          )}
          {(
            this.props.peerProfiles &&
            this.props.peerProfiles.map(( profile, i ) => {
              return (
                <StoreFront key={profile.peerID + i}
                  profile={profile}
                  auth64={this.props.auth64}
                  isMyStore={false}
                />
              )
            })
          )}

          {/* <JSONTree data={this.props.peerProfiles}/> */}
        </View>
      </ScrollView>
    )
  }
}


const CategoryBelt = (props) => {
  return (
    <ScrollView horizontal style={{
      flexDirection: 'row', padding: 10,
      borderBottomWidth: 1, borderBottomColor: lightGrey, backgroundColor: '#f6f6f6',
      height: 100,
    }}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Electronics</Text>
        <Icon name='memory' color='#F99575' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Pets</Text>
        <Icon name='pets' color='#D93A92' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Computers</Text>
        <Icon name='mouse' color='#4A96B2' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Mobiles</Text>
        <Icon name='phone-iphone' color='#FFAF01' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Watches</Text>
        <Icon name='watch' color='#5A4BA2' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Tools</Text>
        <Icon name='build' color='#01B788' reverse />
      </View>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>Gear</Text>
        <Icon name='settings' color='#F99575' reverse />
      </View>
      <View style={{ width: 20 }}>
      </View>
    </ScrollView>
  )
}


const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  listItem: {
   borderBottomColor: lightGrey,
   borderBottomWidth: 1 ,
   height: 40,
  },
  listItemTitle: {
   color: '#222',
   fontWeight: '600',
   fontSize: 14,
   marginLeft: 0,
  },
})

interface ReduxDispatchProps {
  getProfile?(payload: {
    username: string
    password: string
  }): Dispatch<ActionType>
  getObPeerProfiles?(payload: {
    auth64?: string
  }): Dispatch<ActionType>
  updateProfile?({ profile }): Dispatch<ActionType>
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
  updateIsLoading?({ isLoading }): Dispatch<ActionType>
}
interface ReduxProps {
  profile?: iOB1Profile
  username?: string
  password?: string
  auth64?: string
  peerProfiles?: iOB1Profile[]
  isLoading?: boolean
}
interface ReactProps {
}
interface ReactState {
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    password: state.reduxLogin.password,
    username: state.reduxLogin.username,
    auth64: state.reduxLogin.auth64,
    peerProfiles: state.reduxOB1.peerProfiles,
    isLoading: state.reduxLogin.isLoading,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    getProfile: (payload: { username: string, password: string }) => dispatch(
      Actions.OB1.INIT_GET_OB_PROFILE(payload)
    ),
    getObPeerProfiles: (payload: { auth64: string }) => dispatch(
      Actions.OB1.INIT_GET_OB_PEER_PROFILES(payload)
    ),
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
    updateIsLoading: ({ isLoading }) => dispatch(
      Actions.Login.IS_LOADING( isLoading )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( Channel ))
