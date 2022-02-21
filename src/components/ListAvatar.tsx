

import * as React from 'react'
import { Component } from 'react'
import { AppRegistry, StyleSheet, Platform, } from 'react-native'
import {
  View,
} from 'react-native'
import { List, ListItem, Avatar, Button, Icon } from 'react-native-elements'
import { iOB1Profile } from '../typings/ob1Types'
import { APIgatewayURL, ob1API } from '../redux/requests'


class ListAvatar extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  static defaultProps = {
    large: true
  }

  render() {
    let { profile } = this.props
    let avatarURI = profile.avatarHashes
      ? `${APIgatewayURL}/ob/images/${profile.avatarHashes.small}`
      : ''
    return (
      <View style={{ padding: 0 }}>
      <List containerStyle={[ styles.listContainerTop, {
        backgroundColor: this.props.chosen ? '#D4AFDF' : '#fff',
      }]}>
          <ListItem
            chevronColor="#222"
            containerStyle={{
              borderBottomWidth: 0,
              height: this.props.large ? 90 : 40,
            }}
            titleContainerStyle={{
              marginLeft: 45,
              marginTop: this.props.large ? 18 : 0,
            }}
            subtitleContainerStyle={{ marginLeft: 45, marginTop: -4 }}
            avatar={
              <Avatar
                rounded
                large={this.props.large}
                overlayContainerStyle={{ backgroundColor: '#aaa' }}
                containerStyle={{ marginTop: this.props.large ? -2 : -6 }}
                avatarStyle={{ borderWidth: 1, borderColor: lightGrey }}
                source={{ uri: avatarURI }}
                title={profile.name}
              />
            }
            title={profile.name}
            subtitle={profile.handle}
          />
        </List>
      </View>
    )
  }
}

interface ReduxDispatchProps {
}
interface ReduxProps {
  profile?: iOB1Profile
}
interface ReactProps {
  large?: boolean
  chosen?: boolean
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  listContainerTop: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: lightGrey
  },
})


export default ListAvatar
