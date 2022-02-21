
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native'

import {
  Button,
  SearchBar,
  ListItem,
  Icon,
} from 'react-native-elements'


import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'

import { iOB1Profile } from '../../typings/ob1Types'
import { withRouter, RouteComponentProps } from 'react-router'
import { Tabs, Tab } from 'react-router-navigation'

import Announcements from './announcements'
import Channel from './channel'



class HomePage extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  render() {
    return (
      <Tabs
        labelStyle={{ color: '#222' }}
        tabBarStyle={[{
          backgroundColor: '#f6f6f6',
          borderBottomWidth: 1,
          borderBottomColor: mediumGrey,
        }]}
        tabBarIndicatorStyle={{ backgroundColor: '#222' }}
      >
        <Tab path="/" label="Channel" component={Channel} />
        <Tab path="/announcements" label="Announcements" component={Announcements} />
      </Tabs>
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
  heading: {
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  },
  block: {
    paddingTop: 5,
    paddingBottom: 5,
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
  getProfile?(): Dispatch<ActionType>
  updateProfile?({ profile }): Dispatch<ActionType>
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
  updateIsLoading?({ isLoading }): Dispatch<ActionType>
}
interface ReduxProps {
  profile?: iOB1Profile
}
interface ReactProps {
}
interface ReactState {
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
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
    updateIsLoading: ({ isLoading }) => dispatch(
      Actions.Login.IS_LOADING( isLoading )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( HomePage ))
