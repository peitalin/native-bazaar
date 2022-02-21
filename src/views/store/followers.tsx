
import * as React from 'react'
import { Component } from 'react'

import { StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Text,
  Button,
  Alert,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native'

import { connect, Dispatch } from 'react-redux'
import { ReduxState } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { APIgatewayURL, ob1API } from '../../redux/requests'
import { iOB1Profile, iListing } from '../../typings/ob1Types'

import StoreFront from '../store/storefront'




class Followers extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  static defaultProps = {
    isLoading: true,
  }

  componentWillMount() {
    // get the peers of whoever browsedProfile we're looking at
    this.props.getFollowersProfiles({ peerId: this.props.browsedProfile.peerID })
  }

  componentDidUpdate(prevProps: ReduxProps & ReduxDispatchProps & ReactProps, prevState) {
    if (this.props.browsedProfile.peerID !== prevProps.browsedProfile.peerID) {
      this.props.clearFollowersProfiles()
      // if the browsedProfile changes, i.e. browing followers' stores,
      // then we need to reload the followers
      this.props.getFollowersProfiles({ peerId: this.props.browsedProfile.peerID })
    }
  }

  private _scrollView: any

  handleScroll = (event) => {
    let { y } = event.nativeEvent.contentOffset
    this.props.setScrollY({ scrollY: y })
  }

  hasFollowers = () => {
    this.props.followers.length > 0
  }

  render() {
    return (
      <View style={[ styles.shadowBox, styles.container ]}>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView }}
          onScroll={this.handleScroll}
          scrollEventThrottle={1} // 1: 1 update per frame, 16: lowest updates
        >
          <View>
            {(
                (this.props.isLoading)
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10 }}>
                    <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
                      Loading Followers...
                    </Text>
                    <ActivityIndicator
                      color="#222"
                      animating={true}
                    />
                  </View>
                : <View/>
            )}
          </View>
          {(
            !this.hasFollowers() && !this.props.isLoading &&
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
              <Text>No Followers Found.</Text>
            </View>
          )}
          {(
            this.props.followers &&
            this.props.followers.map(profile => {
              return (
                <StoreFront
                  key={profile.peerID}
                  profile={profile}
                  auth64={this.props.auth64}
                  isMyStore={false}
                />
              )
            })
          )}
        </ScrollView>
      </View>
    )
  }
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 507,
    backgroundColor: '#f1f1f1',
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
})

interface ReduxDispatchProps {
  getFollowersProfiles?(payload: { peerId: string }): Dispatch<ActionType>
  clearFollowersProfiles?(): Dispatch<ActionType>
  setScrollY?(payload: { scrollY: number }): Dispatch<ActionType>
}
interface ReduxProps {
  followers?: iOB1Profile[]
}
interface ReactProps {
  auth64: string
  browsedProfile?: iOB1Profile
  isLoading?: boolean
  isMyStore?: boolean
}


//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    followers: state.reduxOB1.followers
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    clearFollowersProfiles: () => dispatch(
      Actions.OB1.CLEAR_FOLLOWERS()
    ),
    getFollowersProfiles: ({ peerId }) => dispatch(
      Actions.OB1.INIT_GET_FOLLOWERS({ peerId })
    ),
    setScrollY: ({ scrollY }) => dispatch(
      Actions.OB1.SET_SCROLL_Y( scrollY )
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( Followers )
