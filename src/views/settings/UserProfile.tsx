
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
// redux
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
// react-router
import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'
// external libraries
import FastImage from 'react-native-fast-image'
import HTMLView from 'react-native-htmlview'
import CameraRollPicker from 'react-native-camera-roll-picker'
import ImagePicker from 'react-native-image-crop-picker'
// Typings and API
import { iOB1Profile, iOB1SetProfileBody } from '../../typings/ob1Types'
import { APIgatewayURL, ob1API } from '../../redux/requests'
// Components
import { Button, Avatar } from 'react-native-elements'
import UserProfileField from '../../components/UserProfileField'




class UserProfile extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  state = {
    editShortDescription: false,
    profile: {} as iOB1Profile,
    headerURI: '',
    avatarURI: '',
  }

  componentWillMount() {
    if (this.props.profile) {
      this.setState({
        profile: this.props.profile
      })
    }
  }

  handleAvatarChange = async() => {
    // Open ImagePicker
    let image: iCameraRollImage = await ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true,
      includeBase64: true
    })
    // Set avatar image.data as base64 image data
    this.setState({
      avatarURI: image.data
    })
    // POST base64 image data to OB1 API -> IPFS
    const res = await ob1API.images.postObAvatar({
      auth64: this.props.auth64,
      body: {
        avatar: image.data
      }
    })
    // reload UserProfile from OB1 API
    this.props.reloadUserProfile({ auth64: this.props.auth64 })
  }

  handleHeaderChange = async() => {
    // Same process as handleAvatarChange
    let image: iCameraRollImage = await ImagePicker.openPicker({
      width: 800,
      height: 400,
      cropping: true,
      includeBase64: true
    })
    this.setState({
      headerURI: image.data,
    })
    const res = await ob1API.images.postObHeader({
      auth64: this.props.auth64,
      body: {
        header: image.data
      }
    })
    this.props.reloadUserProfile({ auth64: this.props.auth64 })
  }

  handleClickShortDescription = () => {
    this.setState({ editShortDescription: !this.state.editShortDescription })
  }

  onChangeText = ({ profile }) => {
    this.setState({ profile: profile })
  }

  render() {
    let profile = this.props.profile
    let bannerHeight = 140
    let bannerURI = profile.headerHashes
        ? { uri: `${APIgatewayURL}/ob/images/${profile.headerHashes.original}` }
        : { uri: 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg' }
    let avatarURI = profile.avatarHashes
      ? `${APIgatewayURL}/ob/images/${profile.avatarHashes.original}`
      : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg'

    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>
        <TouchableHighlight onPress={this.handleHeaderChange}>
          <View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dbc',
              borderBottomColor: lightGrey,
              borderBottomWidth: 1,
              height: 140,
            }}>
              <Image source={bannerURI}
                style={{
                  position: 'absolute',
                  borderRadius: 0,
                  width: '100%',
                  height: bannerHeight,
                  top: 0,
                }}
              />
            </View>
          </View>
        </TouchableHighlight>


        <View style={styles.listContainer}>
          <TouchableHighlight onPress={this.handleAvatarChange}>
            <View style={[ styles.listItem, styles.noBorder, {
              paddingVertical: 5,
              paddingHorizontal: 10,
            }]}>
              <Text>Avatar</Text>
              <Avatar
                rounded
                medium
                overlayContainerStyle={{ backgroundColor: '#aaa' }}
                containerStyle={{ marginTop: -2 }}
                avatarStyle={{ borderWidth: 1, borderColor: lightGrey }}
                source={{ uri: this.state.avatarURI ? `data:image/jpg;base64,${this.state.avatarURI}` : avatarURI }}
                title={this.props.profile.name}
              />
            </View>
          </TouchableHighlight>
        </View>


        <View style={{ backgroundColor: '#EFEFF4', flex: 1, flexDirection: 'row' }}>
          <Text style={styles.headings}>Profile Information</Text>
          <Text style={[styles.headings, { color: mediumGrey }]}>(Tap to Edit)</Text>
        </View>


        <View style={styles.listContainer}>

          <UserProfileField
            height={50}
            field={'name'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          <UserProfileField
            height={50}
            field={'handle'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          <UserProfileField
            height={50}
            field={'location'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />

          <TouchableHighlight onPress={this.handleClickShortDescription}>
            <View style={[ styles.listItem, styles.listItemColumn ]}>
              <View style={[ styles.listItemTitle, {
                flex: 1,
              }]}>
                <Text style={styles.listItemText}>Short Description</Text>
              </View>
              <Text style={{ flex: 1, height: height }}>
                {this.props.profile.shortDescription}
              </Text>
            </View>
          </TouchableHighlight>

          {(
            this.state.editShortDescription &&
            <View style={{ height: height*2, padding: 10 }}>
              <TextInput
                autoFocus={true}
                style={{ flex: 1, height: height, backgroundColor: '#fafafa', padding: 10 }}
                value={this.state.profile.shortDescription}
                onChangeText={(text) => this.setState({
                  profile: {
                    ...this.state.profile,
                    shortDescription: text
                  }
                })}
                placeholder={"Short Description"}
              />
            </View>
          )}

          <UserProfileField
            height={50}
            field={'email'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          <UserProfileField
            height={50}
            field={'phone'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          <UserProfileField
            height={50}
            field={'website'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          <UserProfileField
            height={50}
            field={'about'}
            profile={this.state.profile}
            oldProfile={this.props.profile}
            onChangeText={this.onChangeText}
          />
          {/* <HTMLView */}
          {/*   value={this.props.profile.about} */}
          {/*   stylesheet={styles} */}
          {/* /> */}

        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            raised
            icon={{name: 'reply'}}
            onPress={this.handlePress}
            onLongPress={() => Alert.alert("Long Pressed")}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={"Back without Saving"}
          />
        </View>

        <Link to="/settings" underlayColor='#f0f4f7'>
          <View style={{ marginBottom: 20 }}>
            <Button
              raised
              icon={{name: 'save'}}
              onPress={this.handleSave}
              onLongPress={() => Alert.alert("Long Pressed")}
              buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
              textStyle={{textAlign: 'center'}}
              title={"Save Settings"}
            />
          </View>
        </Link>

      </ScrollView>
    )
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleSave = async() => {
    if (this.state.profile.handle.length > 10) {
      alert(`cannot have handle longer than 10 characters: ${this.state.profile.handle}`)
    }
    await this.props.postUserProfile({
      body: this.state.profile,
      auth64: this.props.auth64,
    })
    this.handlePress()
  }
}



const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const height = 50

const styles = StyleSheet.create({
  headings: {
    padding: 10,
    paddingTop: 20,
    color: '#222',
    borderBottomWidth: 0,
    borderColor: lightGrey,
  },
  listContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: lightGrey,
  },
  listItem: {
    backgroundColor: '#fff',
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noBorder: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  listItemColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemTitle: {
   flex: 1,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'flex-start',
   paddingLeft: 10,
   zIndex: 2,
   height: height,
   backgroundColor: '#fff',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
})





interface ReduxDispatchProps {
  postUserProfile?(payload: { body: iOB1Profile, auth64: string }): Dispatch<ActionType<any>>
  reloadUserProfile?(payload: { auth64: string }): Dispatch<ActionType<any>>
}
interface ReduxProps {
  profile: iOB1Profile
  auth64: string
}
interface ReactProps {
}
interface ReactState {
  profile: iOB1Profile
  editShortDescription: boolean
  headerURI?: string
  avatarURI?: string
  [key: string]: any
}

// from react-native camera-roll libraries
interface iCameraRollImage {
  data?: any
  mime?: any
  width?: number
  height?: number
  localIdentifier?: any
  size?: number
  filename?: string
  path?: string
  sourceURL?: string
  [key: string]: any
}


const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    auth64: state.reduxLogin.auth64,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    postUserProfile: (payload: { body: iOB1Profile, auth64: string }) => dispatch(
      Actions.OB1.INIT_PUT_OB_PROFILE( payload )
    ),
    reloadUserProfile: (payload: { auth64: string }) => dispatch(
      Actions.OB1.INIT_RELOAD_OB_PROFILE( payload )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( withRouter(UserProfile) )
