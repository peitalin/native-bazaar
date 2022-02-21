

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



class Signup extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {
    username: 'peita-',
    email: 'peita@',
    password: 'password',
    passwordConfirm: 'password'
  }

  handleUsername = (event) => {
    this.setState({ username: event })
  }

  handleEmail = (event) => {
    this.setState({ email: event })
  }

  handlePassword = (event) => {
    this.setState({ password: event })
  }

  handlePasswordConfirm = (event) => {
    this.setState({ passwordConfirm: event })
  }

  isValidAccount = () => {
    return (this.state.password === this.state.passwordConfirm) &&
      (this.state.password.length > 0) &&
      (this.state.email.includes('@') && this.state.email.includes('.')) &&
      (this.state.username !== '')
  }

  registerAccount = async() => {
    let { username, email, password, passwordConfirm } = this.state
    if (this.isValidAccount()) {
      // register account first
      let regRes = await this.props.registerOb1Account({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirm,
      })
    } else {
      alert("Can't have empty details.")
    }
  }

  render() {
    return (
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: '#fff',
      }}>

        <Text style={{ margin: 10, fontSize: 16, fontWeight: '600' }}>Signup to OB1</Text>
        <View style={{ width: '80%' }}>
          <FormInput
            containerStyle={styles.formFieldContainer}
            inputStyle={styles.formFieldTextInput}
            maxLength={80}
            placeholder='Username'
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handleUsername}
            value={this.state.username}
          />
        </View>

        <View style={{ width: '80%' }}>
          <FormInput
            containerStyle={styles.formFieldContainer}
            inputStyle={styles.formFieldTextInput}
            placeholder='Email'
            maxLength={80}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handleEmail}
            value={this.state.email}
          />
          {(
            (
              (this.state.email.length > 6) &&
              (!this.state.email.includes('@') || !this.state.email.includes('.'))
            ) &&
            <FormValidationMessage>Invalid email.</FormValidationMessage>
          )}
        </View>

        <View style={{ width: '80%' }}>
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
        </View>

        <View style={{ width: '80%' }}>
          <FormInput
            containerStyle={styles.formFieldContainer}
            inputStyle={styles.formFieldTextInput}
            placeholder='Password Confirm'
            maxLength={80}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.handlePasswordConfirm}
            value={this.state.passwordConfirm}
          />
          {(
            (this.state.passwordConfirm.length > 4 && this.state.password !== this.state.passwordConfirm) &&
            <FormValidationMessage>Invalid passwords. Check that passwords match.</FormValidationMessage>
          )}
        </View>

        <Button
          onPress={this.registerAccount}
          buttonStyle={{
            backgroundColor: '#222',
            width: Dimensions.get('window').width * 0.7,
            height: 40,
            borderRadius: 2,
            marginTop: 10,
            paddingTop: 5, paddingBottom: 5
          }}
          textStyle={{textAlign: 'center' }}
          title={this.isValidAccount() ? "Register" : "Enter Details"}
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
  registerOb1Account?(payload): Dispatch<ActionType<{
    username: string
    email: string
    password: string
    password_confirmation: string
  }>>
}
interface ReduxProps {
  username?: string
  password?: string
}
interface ReactProps {
}
interface ReactState {
  username?: string
  email?: string
  password?: string
  passwordConfirm?: string
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUsername: ({ username }) => dispatch(
      Actions.Login.UPDATE_USERNAME( username )
    ),
    updatePassword: ({ password }) => dispatch(
      Actions.Login.UPDATE_PASSWORD( password )
    ),
    registerOb1Account: ({ username, email, password, password_confirmation }) => dispatch(
      Actions.OB1.INIT_REGISTER_OB_PROFILE({ username, email, password, password_confirmation })
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
)( Signup )


