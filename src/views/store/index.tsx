

import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Text,
  Dimensions,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  Button,
  SearchBar,
  Icon,
  List,
  ListItem,
  Avatar
} from 'react-native-elements'

import FastImage from 'react-native-fast-image'
import { Tabs, Tab } from 'react-router-navigation'
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { withRouter, RouteComponentProps } from 'react-router'
import { iOB1Profile, iListing } from '../../typings/ob1Types'
import { APIgatewayURL, ob1API } from '../../redux/requests'

import Listings from './listings'
import StoreAbout from './about'
import Following from './following'
import Followers from './followers'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height




class Store extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  state = {
    tabBarTop: false,
  }

  private _scrollViewParent: any

  componentWillMount() {
    if (this.props.browsedListings.length < 1 ) {
      this.props.initGetListings({ peerId: this.props.browsedProfile.peerID })
    }
    this.props.getSettings({ auth64: this.props.auth64 })
    this.props.getMyModerators({ auth64: this.props.auth64 })
    // TEMPORARY FOR DEV ONLY, SPEED THINGS UP SO
    // I DON'T HAVE TO WAIT FOR LISTINGS REQUEST EVERYTIME
  }

  componentWillUnmount() {
    this.props.setBrowsedListings({ browsedListings: [] })
  }

  componentDidUpdate(prevProps: ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, prevState) {
		let props = this.props
    let isMyStore = this.props.browsedProfile.peerID === this.props.profile.peerID // user's profile
    let scrollDistance = isMyStore ? 286 : 216
    let scrollThreshold = 50
    this.scrollAnimation({ props, prevProps, scrollDistance, scrollThreshold })
  }

  scrollAnimation = ({ props, prevProps, scrollDistance, scrollThreshold }) => {
    /////// SCROLL ANIMATION
    if (prevProps.scrollY !== this.props.scrollY) {
      if (this.props.scrollY*2 < scrollDistance) {
        this._scrollViewParent.scrollTo({ y: this.props.scrollY*2, animated: false })
        // this.setState({ tabBarTop: false })
      } else {
        this._scrollViewParent.scrollTo({ y: scrollDistance, animated: false })
        // this.setState({ tabBarTop: true })
      }
    }
    if (this.props.browsedProfile.peerID !== prevProps.browsedProfile.peerID) {
      this.props.setBrowsedListings({ browsedListings: [] })
      // if the browsedProfile changes, i.e. browsing followers' stores,
      // then we need to reload the listings
      this.props.initGetListings({ peerId: this.props.browsedProfile.peerID })
    }
  }

  handleSell = () => {
    this.props.updateRouteName({
      routeName: 'Create Listing',
      routeURL: `/createlisting/${this.props.profile.peerID}`
    })
  }

  render() {
    let {
      browsedProfile,
      profile,
    } = this.props
    // pass in state from <Link to={{ to: '/store/peerID', state={state} }}>
    // see <StoreFront/> component
    let bannerHeight = 140
    let bannerURI = browsedProfile.headerHashes.original
      ? `${APIgatewayURL}/ob/images/${browsedProfile.headerHashes.original}`
      : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg'
    let isMyStore = browsedProfile.peerID === profile.peerID // user's profile

    return (
      <ScrollView
        style={[ styles.container ]}
        ref={(scrollView) => { this._scrollViewParent = scrollView }}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#f1f1f1',
          borderBottomColor: lightGrey,
          borderBottomWidth: 1,
        }}>

          {/* <Button */}
          {/*   raised */}
          {/*   icon={{name: 'reply'}} */}
          {/*   onPress={() => this.props.initGetListings({ peerId: this.props.browsedProfile.peerID })} */}
          {/*   buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }} */}
          {/*   textStyle={{textAlign: 'center'}} */}
          {/*   title={"Request Data"} */}
          {/* /> */}

          <View style={[ styles.shadowBox, styles.storeContainer ]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <FastImage source={{
                  uri: bannerURI,
                  method: 'GET',
                }}
                style={{
                  position: 'absolute',
                  borderRadius: 0,
                  width: '100%',
                  height: bannerHeight,
                  top: 0,
                }}
              />
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: bannerHeight,
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: mediumGrey,
              }}>
              {(
                (browsedProfile.handle.length > 0) &&
                <View style={{
                  backgroundColor: 'rgba(250, 250, 250, 0.8)',
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderWidth: 1,
                  borderColor: '#222',
                }}>
                  <Text style={{ fontSize: 20, fontFamily: 'futura', color: '#222' }}>
                    {( `${browsedProfile.handle}'s` )} Store
                  </Text>
                </View>
              )}
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
              <Avatar
                rounded
                medium
                overlayContainerStyle={{ backgroundColor: '#aaa' }}
                containerStyle={{ marginTop: 0 }}
                avatarStyle={{ borderWidth: 1, borderColor: lightGrey }}
                source={{ uri: `${APIgatewayURL}/ob/images/${browsedProfile.avatarHashes.original}` }}
                title={browsedProfile.name}
              />
              <View style={{ width: 10 }}></View>
              <View style={{ width: 10, flex: 1, flexDirection: 'column' }}>
                <Text>{browsedProfile.name}</Text>
                <Text style={{ color: mediumGrey }}>{browsedProfile.handle}</Text>
                <Text style={{ color: mediumGrey }}>{browsedProfile.location}</Text>
              </View>
            </View>
          </View>

          {(
            isMyStore &&
            <View style={[ styles.shadowBox, {
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: windowWidth,
              padding: 10,
              backgroundColor: '#fff',
              borderTopWidth: 1,
              borderColor: mediumGrey,
            }]}>
              <Text>What do you want to sell?</Text>
              <Button
                raised
                icon={{name: 'send'}}
                onPress={this.handleSell}
                onLongPress={() => alert("Long Pressed")}
                buttonStyle={{
                  backgroundColor: '#222',
                  borderRadius: 4,
                  padding: 16,
                  height: 40,
                  width: 120,
                }}
                textStyle={{textAlign: 'center'}}
                title={"Sell"}
              />
            </View>
          )}

          {/* <TabViewAnimated */}
          {/*   style={styles.container} */}
          {/*   navigationState={this.state} */}
          {/*   renderScene={this._renderScene} */}
          {/*   renderHeader={this._renderHeader} */}
          {/*   onIndexChange={this._handleIndexChange} */}
          {/* /> */}

          <Tabs
            labelStyle={{
              color: !this.state.tabBarTop ? '#222': '#f6f6f6',
              // color: '#f6f6f6',
            }}
            tabBarStyle={[{
              backgroundColor: !this.state.tabBarTop ? '#fafafa' : '#333',
              // backgroundColor: '#222',
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: mediumGrey,
            }]}
            tabBarIndicatorStyle={{ backgroundColor: !this.state.tabBarTop ? '#222' : '#f6f6f6' }}
            lazy={true}
          >
            <Tab path="/store"
              label='Store'
              component={() => {
                return (
                  <Listings
                    listings={this.props.browsedListings}
                    isLoading={this.props.isLoading}
                  />
                )
              }}
            />
            <Tab path="/about"
              label='About'
              component={() => {
                return (
                  <StoreAbout
                    profile={this.props.browsedProfile}
                    isLoading={this.props.isLoading}
                  />
                )
              }}
            />
            <Tab path="/following" label='Following' component={() => {
                return (
                  <Following
                    auth64={this.props.auth64}
                    isMyStore={isMyStore}
                    browsedProfile={this.props.browsedProfile}
                    isLoading={this.props.isLoading}
                  />
                )
              }}
            />
            <Tab path="/followers" label='Followers' component={() => {
                return (
                  <Followers
                    auth64={this.props.auth64}
                    isMyStore={isMyStore}
                    browsedProfile={this.props.browsedProfile}
                    isLoading={this.props.isLoading}
                  />
                )
              }}
            />
          </Tabs>

        </View>
      </ScrollView>
    )
  }
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
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
  shadowBox: {
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
  },
  storeContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: mediumGrey,
  }
})

interface ReduxDispatchProps {
  setBrowsedListings?(payload?: { browsedListings: iListing[] }): Dispatch<ActionType>
  initGetListings?(payload?: { peerId: string }): Dispatch<ActionType>
  updateIsLoading?({ isLoading }): Dispatch<ActionType>
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
  getSettings?(payload?: { auth64: string }): Dispatch<ActionType>
  getMyModerators?(payload: { auth64: string, async?: string, include?: string }): Dispatch<ActionType>
}
interface ReduxProps {
  browsedProfile?: iOB1Profile
  browsedListings?: iListing[]
  profile?: iOB1Profile
  auth64?: string
  isLoading?: boolean
  scrollY?: number
  myModerators?: iOB1Profile[]
}
interface ReactProps {
}
interface ReactState {
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    browsedProfile: state.reduxOB1.browsedProfile,
    browsedListings: state.reduxOB1.browsedListings,
    profile: state.reduxOB1.profile,
    auth64: state.reduxLogin.auth64,
    isLoading: state.reduxLogin.isLoading,
    scrollY: state.reduxOB1.scrollY,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    setBrowsedListings: ({ browsedListings }) => dispatch(
      Actions.OB1.SET_BROWSED_LISTINGS( browsedListings )
    ),
    initGetListings: ({ peerId }: { peerId: string }) => dispatch(
      Actions.OB1.INIT_GET_LISTINGS({ peerId })
    ),
    getSettings: (payload?: { auth64: string }) => dispatch(
      Actions.Settings.INIT_GET_SETTINGS(payload)
    ),
    getMyModerators: ({ auth64, async, include }) => dispatch(
      Actions.OB1.INIT_GET_MY_MODERATORS({ auth64, async, include })
    ),
    updateIsLoading: ({ isLoading }) => dispatch(
      Actions.Login.IS_LOADING( isLoading )
    ),
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( Store )
