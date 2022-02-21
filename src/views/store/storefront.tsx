

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

import JSONTree from 'react-native-json-tree' // aliased to react-native-json-tree for native



class StoreFront extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  goToStore = ({ profile }) => {
    this.props.initVisitStore({ browsedProfile: profile })
    // scrollToTop onPress, for follower menu
    if (this.props.scrollToTopOnPress) {
      // this.props.setScrollY({ scrollY: -121 })
      // -121 scrollY triggers scrollToTop on parent ScrollView
    }
  }

  render() {
    let { profile, auth64, isMyStore, storeTitle } = this.props
    let bannerURI = profile.headerHashes
      ? `${APIgatewayURL}/ob/images/${profile.headerHashes.small}`
      : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg'

    return (
      <TouchableHighlight
        onPress={() => this.goToStore({ profile })}
        underlayColor={'#eee'}
      >
        {/* <JSONTree data={profile}/> */}
        {/* Link must Wrap View, can't wrap List>ListItem */}
        <View>
          <ListItem
            chevronColor="#222"
            containerStyle={styles.listItem}
            titleStyle={styles.listItemTitle}
            title={ storeTitle || `Browse: ${profile.name}` }
          />
          <FastImage
            source={{
              uri: bannerURI,
              headers: { Authorization: this.props.auth64 },
            }}
            style={{ width: Dimensions.get('window').width, height: 140 }}
          />
        </View>
      </TouchableHighlight>
    )
  }
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
  initVisitStore?(payload: { browsedProfile: iOB1Profile }): Dispatch<ActionType>
  setScrollY?(payload: { scrollY: number }): Dispatch<ActionType>
}
interface ReduxProps {
}
interface ReactProps {
  profile: iOB1Profile,
  auth64: string,
  isMyStore?: boolean,
  storeTitle?: string,
  scrollToTopOnPress?: boolean
}
interface ReactState {
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    initVisitStore: ({ browsedProfile }) => dispatch(
      Actions.OB1.INIT_VISIT_STORE(browsedProfile)
    ),
    setScrollY: ({ scrollY }) => dispatch(
      Actions.OB1.SET_SCROLL_Y( scrollY )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( StoreFront ))
