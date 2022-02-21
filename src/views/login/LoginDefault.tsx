

import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Button, FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { withRouter, RouteComponentProps } from 'react-router'

import { iOB1Profile } from '../../typings/ob1Types'

// API requests
import { ob1API } from '../../redux/requests'
import { btoa } from 'Base64' // btoa() encodes authorization headers in base64
import { APIgatewayURL } from '../../redux/requests'

const windowWidth = Dimensions.get('window').width



class LoginDefault extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  handleUsername = (event) => {
    this.props.updateUsername({ username: event })
  }

  handlePassword = (event) => {
    this.props.updatePassword({ password: event })
  }

  onLongPressButton = async() => {
    let data =  await ob1API.listings.getObListingsSlug({
      auth64: this.props.auth64,
      peerId: this.props.profile.peerID,
      slug_or_listingHash: 'vintage-dress-digital-options',
    })
  }

  onPressButton = async() => {
    let data = await this.props.getProfile({
      username: this.props.username,
      password: this.props.password,
    })
    this.props.updateProfile({ profile: { name: data } })
  }

  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
      }}>

        <View style={{
          flex: 3,
          width: '80%',
          borderBottomWidth: 1,
          borderBottomColor: '#D6D6D6',
          paddingBottom: 20,
        }}>
          <View style={{
            marginTop: 40,
            paddingTop: 10,
            paddingBottom: 10,
            width: '100%',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            borderWidth: 1,
            borderColor: '#D5D5D5',
            borderRadius: 2,
          }}>
            <Text style={{ fontWeight: '500', fontSize: 16, color: '#3B3E49' }}>Login: Vintage Fashion</Text>
          </View>
          <View style={{
            flex: 1,
            marginTop: 10,
            alignItems: 'center',
          }}>
            <Button
              raised
              onPress={this.onPressButton}
              onLongPress={this.onLongPressButton}
              buttonStyle={{ backgroundColor: '#222', width: windowWidth * 0.8, borderRadius: 2 }}
              textStyle={{textAlign: 'center'}}
              title={"Connect"}
            />
          </View>
        </View>

        <View style={{
          flex: 2,
          marginTop: 20,
          alignItems: 'center',
          width: '100%',
        }}>
          <View style={{ width: '80%'}}>
            <FormInput
              containerStyle={styles.formFieldContainer}
              inputStyle={styles.formFieldTextInput}
              maxLength={80}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.props.username}
              onChangeText={this.handleUsername}
              placeholder='Username'
            />
          </View>
          <View style={{ width: '80%' }}>
            <FormInput
              containerStyle={styles.formFieldContainer}
              inputStyle={styles.formFieldTextInput}
              maxLength={80}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={this.props.password}
              onChangeText={this.handlePassword}
              placeholder='Password'
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formFieldContainer: {
    backgroundColor: '#F2F2F2',
    borderWidth: 1,
    borderColor: "#DDD",
    borderBottomColor: "#DDD",
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  formFieldTextInput: {
    marginLeft: 5,
    width: '100%',
    fontSize: 14,
    textAlign: 'center',
  },
});

interface ReduxDispatchProps {
  getProfile?(payload: {
    username: string
    password: string
  }): Dispatch<ActionType>
  updateProfile?({ profile }): Dispatch<ActionType>
  updateUsername?({ username }: { username: string }): Dispatch<ActionType>
  updatePassword?({ password }: { password: string }): Dispatch<ActionType>
}
interface ReduxProps {
  profile?: iOB1Profile
  auth64?: string
  username?: string
  password?: string
}
interface ReactProps {
}
interface ReactState {
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getProfile: (payload) => dispatch(
      Actions.OB1.INIT_GET_OB_PROFILE(payload)
    ),
    updateProfile: ({ profile }) => dispatch(
      Actions.OB1.PATCH_OB_PROFILE( profile )
    ),
    updateUsername: ({ username }) => dispatch(
      Actions.Login.UPDATE_USERNAME( username )
    ),
    updatePassword: ({ password }) => dispatch(
      Actions.Login.UPDATE_PASSWORD( password )
    ),
  }
}
const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    auth64: state.reduxLogin.auth64,
    username: state.reduxLogin.username,
    password:state.reduxLogin.password,
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( LoginDefault ))
