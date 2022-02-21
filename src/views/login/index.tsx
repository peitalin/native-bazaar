

import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  TextInput,
  Alert,
  TouchableHighlight,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native'
import {
  Button,
	FormLabel, FormInput, FormValidationMessage
} from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Profile } from '../../typings/ob1Types'

import { withRouter, RouteComponentProps } from 'react-router'

import LoginDefault from './LoginDefault'
import LoginEdit from './LoginEdit'
import Signup from './Signup'

import Swiper from 'react-native-swiper';


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


class Login extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  state = {
    swiperPage: 'login',
    swiperPageLookup: {
      0: 'login',
      1: 'login-edit',
      2: 'signup',
    }, // lookup index/page for swiper
  }

  private swiper: any

  handleUsername = (event) => {
    this.props.updateUsername({ username: event })
  }

  handlePassword = (event) => {
    this.props.updatePassword({ password: event })
  }

  handleLogin = ({ routeName, routeURL }) => {
    if (this.state.swiperPage === 'login-edit') {
      this.swiper.scrollBy(-1)
    }
    if (this.state.swiperPage === 'signup') {
      this.swiper.scrollBy(1)
    }
    this.setState({ swiperPage: 'login' })
  }

  handleLoginEdit = ({ routeName, routeURL }) => {
    if (this.state.swiperPage === 'login') {
      this.swiper.scrollBy(1)
    }
    if (this.state.swiperPage === 'signup') {
      this.swiper.scrollBy(-1)
    }
    this.setState({ swiperPage: 'login-edit' })
  }


  handleSignup = ({ routeName, routeURL }) => {
    if (this.state.swiperPage === 'login') {
      this.swiper.scrollBy(-1)
    }
    if (this.state.swiperPage === 'login-edit') {
      this.swiper.scrollBy(1)
    }
    this.setState({ swiperPage: 'signup' })
  }

  onMomentumScrollEnd = (e, state: swiperEvent, context) => {
    this.setState({
      swiperPage: this.state.swiperPageLookup[state.index]
    })
  }

  renderLoginScreens = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 0,
      }}>
        {(
          (this.state.swiperPage !== 'login') &&
          <Button
            onPress={this.handleLogin}
            containerViewStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginText}
            title={"Login"}
            underlayColor={'#666'}
          />
        )}
        {(
          (this.state.swiperPage !== 'login-edit') &&
          <Button
            onPress={this.handleLoginEdit}
            containerViewStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginText}
            title={"Edit Login"}
            underlayColor={'#666'}
          />
        )}
        {(
          (this.state.swiperPage !== 'signup') &&
          <Button
            onPress={this.handleSignup}
            containerViewStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginText}
            title={"Signup to OB1"}
            underlayColor={'#666'}
          />
        )}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#f6f6f6',
        }}>

          <View style={[ styles.shadowBox, {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 260,
            paddingTop: 40,
            zIndex: 5,
          }]}>
            <Text style={{ fontSize: 64, fontWeight: '800', fontFamily: 'Futura-Medium' }}>
              OB1
            </Text>
            {(
              this.props.isLoading
              ? <View>
                  <Text style={{ height: 20, fontSize: 12, color: '#999' }}>
                    {( `Loading... ${this.props.APIgatewayURL}` )}
                  </Text>
                  <ActivityIndicator
                    color="#222"
                    animating={true}
                  />
                </View>
              : <View style={{ height: 40 }}></View>
            )}
          </View>

          <View style={[ styles.shadowBox, {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderColor: '#d5d5d5',
            backgroundColor: '#fff',
            marginTop: -5, // offset for shadowBox
          }]}>
            <Swiper
              width={windowWidth}
              height={windowHeight * 0.4}
              showsPagination={false}
              ref={(component) => { this.swiper = component }}
              onMomentumScrollEnd={this.onMomentumScrollEnd}
            >
              <LoginDefault/>
              <LoginEdit/>
              <Signup/>
            </Swiper>
          </View>

          { this.renderLoginScreens() }

          <Text style={{ color: '#aaa', fontSize: 14, paddingTop: 10, paddingBottom: 10, textAlign: 'center' }}>
            Clear saved logins?
          </Text>

        </View>
      </ScrollView>
    );
  }
}


interface swiperEvent {
  autoplayEnd: boolean
  loopJump: boolean
  total: number
  index: number
  dir: string
  width: number
  height: number
  offset: {
    x: number
    y: number
  }
  isScrolling: boolean
}


const styles = StyleSheet.create({
  loginButtonContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  loginButton: {
    backgroundColor: '#fff',
    width: 150,
    borderRadius: 50,
    borderColor: '#222',
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
  },
  loginText: {
    textAlign: 'center',
    color: '#222',
    fontSize: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5dCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  transformExample: {
    color: '#BB4959',
    marginTop: 20,
    transform: [
      { scale: 2 },
    ]
  },
  shadowBox: {
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
  }
});



interface ReduxDispatchProps {
  getProfile?(): Dispatch<ActionType>
  updateProfile?({ profile }): Dispatch<ActionType>
  updateUsername?({ username }: { username: string }): Dispatch<ActionType>
  updatePassword?({ password }: { password: string }): Dispatch<ActionType>
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
  updateIsLoading?({ isLoading }): Dispatch<ActionType>
}
interface ReduxProps {
  profile?: iOB1Profile
  username?: string
  password?: string
  routeName?: string
  routeURL?: string
  isLoading?: boolean
  APIgatewayURL?: string
}
interface ReactProps {
}
interface ReactState {
  swiperPage?: string // keeps track of which swiper page we're on
  // useful for relative indexing (press buton and change swiper)
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    username: state.reduxLogin.username,
    password: state.reduxLogin.password,
    routeName: state.reduxRouter.routeName,
    routeURL: state.reduxRouter.routeURL,
    isLoading: state.reduxLogin.isLoading,
    APIgatewayURL: state.reduxLogin.APIgatewayURL,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    getProfile: () => dispatch(
      Actions.OB1.INIT_GET_OB_PROFILE()
    ),
    updateProfile: ({ profile }) => dispatch(
      Actions.OB1.PATCH_OB_PROFILE( profile )
    ),
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
    updateUsername: ({ username }) => dispatch(
      Actions.Login.UPDATE_USERNAME( username )
    ),
    updatePassword: ({ password }) => dispatch(
      Actions.Login.UPDATE_PASSWORD( password )
    ),
    updateIsLoading: ({ isLoading }) => dispatch(
      Actions.Login.IS_LOADING( isLoading )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( Login ))

