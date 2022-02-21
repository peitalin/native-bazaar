
import * as React from 'react'
import { Component } from 'react'

import { StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  Alert,
  View,
  ScrollView,
} from 'react-native'
import { List, ListItem, Avatar, Button, Icon } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Profile, iOB1Settings } from '../../typings/ob1Types'

import { Link } from 'react-router-native'
import Flag from 'react-native-flags'

import SettingsCountry from './SettingsCountry'
import SettingsCurrency from './SettingsCurrency'
import ListAvatar from '../../components/ListAvatar'
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from '../../utils/colors'



class Settings extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  componentWillMount() {
    // initialize redux-saga for INIT_GET_SETTINGS
    this.props.getSettings({ auth64: this.props.auth64 })
    this.props.getMyModerators({ auth64: this.props.auth64 })
  }

  componentDidMount() {
  }

  render() {
    let profile = this.props.profile
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <Text style={styles.headings}>Profile</Text>
        <Link to="/settings/user-profile" underlayColor={linkUnderlayColor}>
          <View>
            <ListAvatar profile={this.props.profile}/>
          </View>
        </Link>

        <Text style={styles.headings}>Store</Text>
        <View style={{ padding: 0, backgroundColor: '#fff' }}>
          <List containerStyle={styles.listContainer}>

            <SettingsCountry />
            <SettingsCurrency />

            <Link to="/settings/shipping-addresses" underlayColor={linkUnderlayColor}>
              <View>
                <ListItem
                  chevronColor="#222"
                  containerStyle={styles.listItem}
                  titleStyle={styles.listItemTitle}
                  title={"Shipping Address"}
                />
              </View>
            </Link>
            <Link to="/settings/edit-policies" underlayColor={linkUnderlayColor}>
              <View>
                <ListItem
                  chevronColor="#222"
                  containerStyle={styles.listItem}
                  titleStyle={styles.listItemTitle}
                  title={"Policies"}
                />
              </View>
            </Link>
            <Link to="/settings/edit-moderators" underlayColor={linkUnderlayColor}>
              <View>
                <ListItem
                  chevronColor="#222"
                  containerStyle={{ borderBottomWidth: 0 }}
                  titleStyle={styles.listItemTitle}
                  title={"Moderators"}
                />
              </View>
            </Link>
          </List>
        </View>

        <Text style={styles.headings}>Moderation</Text>

        <Link to="/settings/edit-moderation-settings" underlayColor={linkUnderlayColor}>
          <View style={{ padding: 0, backgroundColor: '#fff' }}>
            <List containerStyle={styles.listContainer}>
              <ListItem
                chevronColor="#222"
                containerStyle={{ borderBottomWidth: 0 }}
                titleStyle={styles.listItemTitle}
                title={"Moderation Settings"}
              />
            </List>
          </View>
        </Link>

        <Text style={styles.headings}>Advanced</Text>
        <Link to="/settings/edit-wallets" underlayColor={linkUnderlayColor}>
          <View style={{ padding: 0, backgroundColor: '#fff' }}>
            <List containerStyle={styles.listContainer}>
              <ListItem
                chevronColor="#222"
                containerStyle={{ borderBottomWidth: 0 }}
                titleStyle={styles.listItemTitle}
                title={"Wallet"}
                rightTitle={this.props.profile.bitcoinPubkey}
              />
            </List>
          </View>
        </Link>

        <View style={styles.buttonContainer}>
          <Button
            raised
            icon={{name: 'reply'}}
            onPress={() => Alert.alert("Pressed!")}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={"Logout"}
          />
        </View>

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
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: lightGrey
  },
  listContainerTop: {
    marginBottom: 0,
    marginTop: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderColor: lightGrey
  },
  listItem: {
   borderBottomColor: lightGrey,
   borderBottomWidth: 1 ,
  },
  listItemTitle: {
   color: mediumGrey,
   fontSize: 14,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
})


interface ReduxDispatchProps {
  getSettings?(payload?: { auth64: string }): Dispatch<ActionType>
  getMyModerators?(payload: { auth64: string, async?: string, include?: string }): Dispatch<ActionType>
}
interface ReduxProps {
  profile?: iOB1Profile
  auth64?: string
  myModerators?: iOB1Profile[]
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    auth64: state.reduxLogin.auth64,
    myModerators: state.reduxOB1.myModerators,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getSettings: (payload?: { auth64: string }) => dispatch(
      Actions.Settings.INIT_GET_SETTINGS(payload)
    ),
    getMyModerators: ({ auth64, async, include }) => dispatch(
      Actions.OB1.INIT_GET_MY_MODERATORS({ auth64, async, include })
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( Settings )
