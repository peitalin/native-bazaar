
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Text,
  View,
} from 'react-native'
import { List, ListItem, Button, Avatar } from 'react-native-elements'
import { lightGrey, mediumGrey } from '../utils/colors'
import { iOB1Profile } from '../typings/ob1Types'



class MyModerator extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  static defaultProps = {
    handleAddModerator: undefined,
    handleRemoveModerator: undefined,
    isListingScreen: false,
  }

  renderButton = ({ isMyModerator, handleAddModerator, handleRemoveModerator }) => {
    if (!handleAddModerator || !handleRemoveModerator) {
      return (
        <div>handleAddModerator || handleRemoveModerator functions missing</div>
      )
    } else {
      if (isMyModerator) {
        return (
          <Button
            raised
            onPress={handleRemoveModerator}
            buttonStyle={{
              backgroundColor: '#96616B',
              borderRadius: 4,
              padding: 12,
              marginTop: 10
            }}
            textStyle={{
              textAlign: 'center',
              fontSize: 14,
            }}
            title={'Remove Moderator'}
          />
        )
      } else {
        return (
          <Button
            raised
            icon={{name: 'add'}}
            onPress={handleAddModerator}
            buttonStyle={{
              backgroundColor: '#222',
              borderRadius: 4,
              padding: 12,
              marginTop: 10
            }}
            textStyle={{
              textAlign: 'center',
              fontSize: 14,
            }}
            title={'Add Moderator'}
          />
        )
      }
    }
  }

  render() {
    let { moderator, avatarURI, isMyModerator } = this.props
    let { handleAddModerator, handleRemoveModerator } = this.props
    return (
      <ListItem
        hideChevron
        containerStyle={styles.listItem}
        titleStyle={styles.listItemTitle}
        title={
          <View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Avatar
                rounded
                medium
                overlayContainerStyle={{ backgroundColor: '#aaa' }}
                containerStyle={{ marginTop: 0 }}
                avatarStyle={{ borderWidth: 1, borderColor: lightGrey }}
                source={{ uri: avatarURI }}
                title={moderator.name}
              />
              <Text style={{ flex: 1, marginLeft: 10 }}>{ moderator.name }</Text>
              <Text style={{ flex: 2 }}>{ moderator.handle }</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, height: 80 }}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '500' }}>Name:</Text>
                <Text style={{ fontWeight: '500' }}>Email:</Text>
                <Text style={{ fontWeight: '500' }}>Website:</Text>
              </View>
              <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text>{ moderator.name }</Text>
                <Text>{ moderator.contactInfo.email }</Text>
                <Text>{ moderator.contactInfo.website }</Text>
              </View>
            </View>
            {(
              !this.props.isListingScreen &&
              this.renderButton({ isMyModerator, handleAddModerator, handleRemoveModerator })
            )}
          </View>
        }
      />
    )
  }
}

interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
  moderator?: iOB1Profile
  avatarURI?: string
  isListingScreen?: boolean
  isMyModerator?: boolean
  handleAddModerator?(any): void
  handleRemoveModerator?(any): void
}


const styles = StyleSheet.create({
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
  listItemTitle: {
   color: mediumGrey,
   fontSize: 14,
  },
})


export default MyModerator
