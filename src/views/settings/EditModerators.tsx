
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { List, ListItem, Button, Avatar } from 'react-native-elements'
// redux
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
// reac-rtouer
import { withRouter, RouteComponentProps } from 'react-router'
import { Link, Redirect } from 'react-router-native'
// componants and colors
import { lightGrey, mediumGrey } from '../../utils/colors'
import { iOB1Profile, iOB1Settings } from '../../typings/ob1Types'
import { APIgatewayURL, ob1API } from '../../redux/requests'
import ListAvatar from '../../components/ListAvatar'
import IsLoading from '../../components/IsLoading'
import MyModerator from '../../components/MyModerator'




class EditModerators extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  state = {
    selectedModerator: {} as iOB1Profile,
    isLoading: true,
  }

  componentWillMount() {
    this.props.getSettings({ auth64: this.props.auth64 })
    this.props.getMyModerators({ auth64: this.props.auth64 })
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  findModerators = async({ async, include }) => {
    await this.props.getModerators({
      auth64: this.props.auth64,
    })
  }

  renderOption = (option, selected, onSelect, index) => {
    return (
      <TouchableHighlight onPress={onSelect} key={index}>
        <Text style={{ fontWeight: selected ? 'bold' : '500' }}>{option}</Text>
      </TouchableHighlight>
    )
  }

  expandModerator = async(modProfile: iOB1Profile) => {
    let selectedMod: iOB1Profile = await ob1API.profile.getObProfile({
      auth64: this.props.auth64,
      peerId: modProfile.peerID
    })
    this.setState({
      selectedModerator: selectedMod
    })
  }

  handleAddModerator = async() => {
    let newMyMods = [
      ...this.props.myModerators.map(m => m.peerID),
      this.state.selectedModerator.peerID
    ]
    await ob1API.settings.patchObSettings({
      auth64: this.props.auth64,
      body: {
        storeModerators: newMyMods
      }
    })
    this.reloadAndRefetchMyModerators()
  }

  handleRemoveModerator = async(clickedModID: string) => {
    let newMyMods = this.props.myModerators
      .map(m => m.peerID)
      .filter(peerID => peerID !== clickedModID)

    await ob1API.settings.patchObSettings({
      auth64: this.props.auth64,
      body: {
        storeModerators: newMyMods
      }
    })
    this.reloadAndRefetchMyModerators()
  }

  reloadAndRefetchMyModerators = async() => {
    // reload settings first
    setTimeout(() => {
      this.props.getSettings({ auth64: this.props.auth64 })
    }, 0)
    // then make request to getMyModerators profile
    setTimeout(() => {
      this.props.getMyModerators({ auth64: this.props.auth64 })
    }, 0)
    // ideally, should write a new saga to sequence these async API calls
  }


  renderModerators = () => {
    return (
      this.props.moderators.map(( modProfile: iOB1Profile ) => {
        if (this.state.selectedModerator === modProfile.peerID && this.state.isLoading) {
          return (
            <IsLoading isLoading={this.state.isLoading} LoadingMessage={'Loading Moderator Profile'}/>
          )
        }
        if (this.state.selectedModerator.peerID === modProfile.peerID) {
          let moderator = this.state.selectedModerator
          let avatarURI = moderator.avatarHashes
            ?  `${APIgatewayURL}/ob/images/${moderator.avatarHashes.original}` : ''
          return (
            <TouchableHighlight
              key={modProfile.peerID}
              onPress={() => this.expandModerator(modProfile)}
            >
              <View>
                <MyModerator
                  moderator={moderator}
                  avatarURI={avatarURI}
                  isMyModerator={false}
                  handleAddModerator={this.handleAddModerator}
                  handleRemoveModerator={this.handleRemoveModerator}
                />
              </View>
            </TouchableHighlight>
          )
        } else {
          return (
            <TouchableHighlight
              key={modProfile.peerID}
              onPress={() => this.expandModerator(modProfile)}
            >
              <View>
                <ListAvatar
                  profile={modProfile}
                  large={false}
                  chosen={this.state.selectedModerator.peerID === modProfile.peerID}
                />
              </View>
            </TouchableHighlight>
          )
        }
      })
    )
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>My Moderators</Text>
        </View>

        <IsLoading isLoading={this.state.isLoading} LoadingMessage={'Loading Moderator Profile'}/>

        <View style={{ backgroundColor: '#EFEFF4', padding: 0 }}>
          <List style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}>
          {(
            (!!this.props.myModerators.length) &&
            this.props.myModerators.map((moderator, i) => {
              let avatarURI = moderator.avatarHashes
                ?  `${APIgatewayURL}/ob/images/${moderator.avatarHashes.original}` : ''
              return (
                <MyModerator
                  key={i}
                  moderator={moderator}
                  avatarURI={avatarURI}
                  isMyModerator={true}
                  handleAddModerator={this.handleAddModerator}
                  handleRemoveModerator={() => this.handleRemoveModerator(moderator.peerID)}
                />
              )
            })
          )}

          <View style={{ backgroundColor: '#EFEFF4', borderBottomWidth: 1, borderBottomColor: lightGrey}}>
            <Text style={styles.headings}>Pick your Moderators</Text>
          </View>

          <IsLoading isLoading={this.props.isLoading} LoadingMessage={'Loading Moderators'}/>

          {
            this.renderModerators()
          }
          </List>
        </View>

        <View style={{ marginTop: 20, marginBottom: 5 }}>
          <Button
            raised
            icon={{name: 'search'}}
            onPress={this.findModerators}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={"Find Moderators"}
          />
        </View>

        <Link to="/settings" underlayColor='#f0f4f7'>
          <View style={{ marginTop: 5, marginBottom: 20 }}>
            <Button
              raised
              icon={{name: 'reply'}}
              onPress={this.handleGoBack}
              buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
              textStyle={{textAlign: 'center'}}
              title={"Back to Settings"}
            />
          </View>
        </Link>
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: lightGrey,
    backgroundColor: '#fff',
  },
})

interface ReduxDispatchProps {
  getModerators?(payload: { auth64: string, async?: string, include?: string }): Dispatch<ActionType>
  getMyModerators?(payload: { auth64: string, async?: string, include?: string }): Dispatch<ActionType>
  getSettings?(payload?: { auth64: string }): Dispatch<ActionType>
}
interface ReduxProps {
  settings?: iOB1Settings
  auth64?: string
  moderators?: iOB1Profile[]
  myModerators?: iOB1Profile[]
  isLoading: boolean
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    settings: state.reduxSettings.settings,
    moderators: state.reduxOB1.moderators,
    myModerators: state.reduxOB1.myModerators,
    auth64: state.reduxLogin.auth64,
    isLoading: state.reduxLogin.isLoading,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getModerators: ({ auth64, async, include }) => dispatch(
      Actions.OB1.INIT_GET_MODERATORS({ auth64, async, include })
    ),
    getMyModerators: ({ auth64, async, include }) => dispatch(
      Actions.OB1.INIT_GET_MY_MODERATORS({ auth64, async, include })
    ),
    getSettings: (payload?: { auth64: string }) => dispatch(
      Actions.Settings.INIT_GET_SETTINGS(payload)
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditModerators ))

