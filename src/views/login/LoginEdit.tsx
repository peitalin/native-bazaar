

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
} from 'react-native';
import {
  Button, FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { withRouter, RouteComponentProps } from 'react-router'



const windowWidth = Dimensions.get('window').width


class LoginEdit extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {
    name: '',
    IPAddress: '',
    port: '',
    username: '',
    password: '',
  }

  handleUsername = (event) => {
    this.setState({ username: event })
  }

  handleIPAddress = (event) => {
    this.setState({ IPAddress: event })
  }

  handlePort = (event) => {
    this.setState({ port: event })
  }

  handleName = (event) => {
    this.setState({ name: event })
  }

  handlePassword = (event) => {
    this.setState({ password: event })
  }

  isValidAccount = () => {
    return (this.state.password === this.state.password) &&
      (this.state.password.length > 0) &&
      (this.state.IPAddress.includes('.')) &&
      (this.state.username !== '')
  }

  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
      }}>

        <Text style={{ margin: 10, fontSize: 16, fontWeight: '600' }}>Custom Login Settings</Text>
        <View style={{ width: windowWidth * 0.8 }}>
          {/* <FormLabel style={{ marginTop: -10 }}>Name</FormLabel> */}
          <FormInput
            containerStyle={{
              backgroundColor: '#F2F2F2',
              borderWidth: 1, borderColor: "#DDD", borderBottomColor: "#DDD",
              height: 32,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
            inputStyle={{ marginLeft: 5, fontSize: 14, textAlign: 'center'  }}
            placeholder='Name'
            maxLength={80}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handleName}
            value={this.state.name}
          />
          {/* {( */}
          {/*   (this.state.name === '') && */}
          {/*   <FormValidationMessage>Invalid empty name.</FormValidationMessage> */}
          {/* )} */}
        </View>

        <View style={{ flexDirection: 'row', width: '80%' }}>
          <View style={{ flex: 2 }}>
            {/* <FormLabel style={{ marginTop: -10 }}>IP Address</FormLabel> */}
            <FormInput
              containerStyle={styles.formFieldContainer}
              inputStyle={styles.formFieldTextInput}
              maxLength={80}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.handleIPAddress}
              value={this.state.IPAddress}
              placeholder='IP Address'
            />
          </View>
          <View style={{ flex: 1, marginLeft: -35 }}>
            {/* <FormLabel style={{ marginTop: -10 }}>Port</FormLabel> */}
            <FormInput
              containerStyle={styles.formFieldContainer}
              inputStyle={styles.formFieldTextInput}
              maxLength={80}
              autoCapitalize={'none'}
              autoCorrect={false}
              onChangeText={this.handlePort}
              value={this.state.port}
              placeholder='Port'
            />
          </View>
        </View>

        <View style={{ width: '80%' }}>
          {/* <FormLabel style={{ marginTop: -10 }}>Username</FormLabel> */}
          <FormInput
            containerStyle={styles.formFieldContainer}
            inputStyle={styles.formFieldTextInput}
            placeholder='Username'
            maxLength={80}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handleUsername}
            value={this.state.username}
          />
        </View>


        <View style={{ width: '80%' }}>
          {/* <FormLabel style={{ marginTop: -10 }}>Password</FormLabel> */}
          <FormInput
            containerStyle={styles.formFieldContainer}
            inputStyle={styles.formFieldTextInput}
            placeholder='Password'
            maxLength={80}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handlePassword}
            value={this.state.password}
          />
          {(
            (this.state.password !== this.state.password) &&
            <FormValidationMessage>Invalid passwords. Check that passwords match.</FormValidationMessage>
          )}
        </View>

        <Button
          onPress={() => alert("Creating an Open Bazaar Account (not implemented)")}
          buttonStyle={{
            backgroundColor: '#222',
            width: Dimensions.get('window').width * 0.7,
            height: 40,
            borderRadius: 2,
            marginTop: 10,
            paddingTop: 5, paddingBottom: 5
          }}
          textStyle={{textAlign: 'center' }}
          title={"Connect"}
        />
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
  updateUsername?({ username }: { username: string }): Dispatch<ActionType<string>>
  updatePassword?({ password }: { password: string }): Dispatch<ActionType<string>>
}
interface ReduxProps {
  username?: string
  password?: string
}
interface ReactProps {
}
interface ReactState {
  username?: string
  password?: string
  IPAddress?: string
  port?: string
  name?: string
}

const mapDispatchToProps = ( dispatch ) => {
  return {
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
    username: state.reduxLogin.username,
    password: state.reduxLogin.password,
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( LoginEdit )


