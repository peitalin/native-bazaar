
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions } from '../../redux/actions'
import { iOB1Settings } from '../../typings/ob1Types'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'

import { Kaede } from 'react-native-textinput-effects'
import HTMLView from 'react-native-htmlview'
import { ob1API } from '../../redux/requests'
import { OrderedMap } from 'immutable'

import { lightGrey, mediumGrey } from '../../utils/colors'


const miscSettingsLabels = {
  blockedNodes: 'Blocked Nodes',
  paymentDataInQR: 'Payment Data in QR',
  refundPolicy: 'Refund Policy',
  showNotifications: 'Show Notifications',
  showNsfw: 'Show NSFW',
  termsAndConditions: 'Terms and Conditions',
  version: 'Version',
}


class EditPolicies extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  state = {
    miscSettings: {
      blockedNodes: [],
      paymentDataInQR: false,
      refundPolicy: 'Final',
      showNotifications: true,
      showNsfw: false,
      termsAndConditions: 'Terms and Conditions',
      version: 'version',
    },
  }

  componentWillMount() {
    if (this.props.settings) {

      // let newMiscSettings = OrderedMap(this.props.settings)
      //   .filter((value, key) => Object.keys(miscSettingsLabels).includes(key))
      //   .toObject()
      //
      // this.setState({
      //   miscSettings: newMiscSettings,
      // })

    }
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleDeleteAddress = async() => {
  }

  handleSave = async() => {
  }

  _onChangeText = ({ key, text }: { key: string, text: string }) => {
    this.setState({
      miscSettings: {
        ...this.state.miscSettings,
        [key]: text
      }
    })
  }

  render() {
    let { miscSettings } = this.state
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Shipping Address</Text>
        </View>

        <View style={styles.listContainer}>
          {(
            Object.keys(miscSettings).map((key, i) =>
              <View style={styles.listItem} key={key}>
                <View style={styles.listItemTitle}>
                  <Text style={styles.listItemText}>{miscSettingsLabels[key]}</Text>
                </View>
                <Kaede
                  label={this.props.settings[key]}
                  onChangeText={(text) => this._onChangeText({ key, text })}
                  height={50}
                  style={styles.kaedeStyle}
                  containerStyle={styles.kaedeContainerStyle}
                  inputStyle={styles.kaedeInputStyle}
                  labelStyle={styles.kaedeLabelStyle}
                />
              </View>
            )
          )}
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            raised
            icon={{name: 'save'}}
            onPress={this.handleSave}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={'Save Address'}
          />
        </View>
        <View style={{ marginTop: 0, marginBottom: 0 }}>
          <Button
            raised
            icon={{name: 'reply'}}
            onPress={this.handlePress}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={'Cancel'}
          />
        </View>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Button
            raised
            icon={{name: 'delete'}}
            onPress={this.handleDeleteAddress}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={'Delete'}
          />
        </View>

      </ScrollView>
    )
  }
}


const miscField = (props: {
  label?: string,
  onChangeText?(text: string): any
}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.listItemTitle}>
        <Text style={styles.listItemText}>Name</Text>
      </View>
      <Kaede
        label={props.label}
        onChangeText={props.onChangeText}
        height={50}
        style={styles.kaedeStyle}
        containerStyle={styles.kaedeContainerStyle}
        inputStyle={styles.kaedeInputStyle}
        labelStyle={styles.kaedeLabelStyle}
      />
    </View>
  )
}


const kaedeheight = 50
const styles = StyleSheet.create({
  headings: {
    padding: 10,
    paddingTop: 20,
    color: '#222',
    borderBottomWidth: 0,
    borderColor: lightGrey,
  },
  addNewAddress: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: lightGrey,
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
  listItemTitle: {
   flex: 3,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'flex-start',
   paddingLeft: 10,
   zIndex: 2,
   height: kaedeheight,
   backgroundColor: '#fff',
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  kaedeStyle: {
    flex: 5,
    height: kaedeheight,
    margin: -5,
  },
  kaedeContainerStyle: {
    padding: 0,
    margin: 0,
  },
  kaedeInputStyle: {
    color: '#222',
    backgroundColor: '#f1f1f1',
    height: kaedeheight,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
  },
  kaedeLabelStyle: {
    color: '#5682A3',
    fontSize: 14,
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
  },
})

interface ReduxDispatchProps {
}
interface ReduxProps {
  settings?: iOB1Settings
  auth64?: string
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    settings: state.reduxSettings.settings,
    auth64: state.reduxLogin.auth64,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditPolicies ))

