
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  SectionList,
  ScrollView,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Profile, iOB1Settings, iOB1ShippingAddress } from '../../typings/ob1Types'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'
import { lightGrey, mediumGrey } from '../../utils/colors'

import { Kaede } from 'react-native-textinput-effects'
import HTMLView from 'react-native-htmlview'
import { ob1API } from '../../redux/requests'


const addressLabels = {
  name: 'Name',
  company: 'Company',
  addressLineOne: 'Address (line 1)',
  addressLineTwo: 'Address (line 2)',
  city: 'City',
  state: 'State',
  country: 'Country',
  postalCode: 'Postal Code',
  addressNotes: 'Address Notes'
}

class AddShippingAddress extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  state = {
    address: {
      name: '',
      company: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      addressNotes: '',
    } as iOB1ShippingAddress,
    oldAddress: {} as iOB1ShippingAddress,
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleSave = async() => {
    let routerState: {
      address: iOB1ShippingAddress,
      addressIndex: number,
      newAddress: boolean
    } = this.props.history.location.state

    if (routerState.newAddress) {
      var body = {
        shippingAddresses: [
          ...this.props.shippingAddresses,
          this.state.address,
        ]
      }
    } else {
      let { addressIndex } = routerState
      var body = {
        shippingAddresses: [
          ...this.props.shippingAddresses.slice(0, addressIndex),
          this.state.address,
          ...this.props.shippingAddresses.slice(addressIndex + 1),
        ]
      }
    }
    this.updateSettings(body)
  }

  handleDeleteAddress = async() => {
    let routerState: {
      address: iOB1ShippingAddress,
      addressIndex: number,
      newAddress: boolean
    } = this.props.history.location.state
    let { addressIndex } = routerState
    let body = {
      shippingAddresses: [
        ...this.props.shippingAddresses.slice(0, addressIndex),
        // this.state.address, remove this address
        ...this.props.shippingAddresses.slice(addressIndex + 1),
      ]
    }
    this.updateSettings(body)
  }

  updateSettings = async(body: { shippingAddresses: iOB1ShippingAddress[] }) => {
    // important: use PATCH rather than PUT
    // otherwise you need to provide entire settings state
    await ob1API.settings.patchObSettings({
      auth64: this.props.auth64,
      body: body
    })
    this.props.getSettings({ auth64: this.props.auth64 })
    this.props.history.goBack()
  }

  componentWillMount() {
    // we need to display oldAddress + have a new address
    // that users can edit
    if (this.props.history) {
      if (this.props.history.location) {
        if (this.props.history.location.state) {
          let { address } = this.props.history.location.state
          if (Object.keys(address).length > 0) {
            this.setState({
              address: address,
              oldAddress: address
            })
          }
        }
      }
    }
  }

  _onChangeText = ({ key, text }: { key: string, text: string }) => {
    this.setState({
      address: {
        ...this.state.address,
        [key]: text
      }
    })
  }

  render() {
    let { address, oldAddress } = this.state
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Shipping Address</Text>
        </View>

        <View style={styles.listContainer}>
          {(
            Object.keys(address).map((key, i) =>
              <View style={styles.listItem} key={key}>
                <View style={styles.listItemTitle}>
                  <Text style={styles.listItemText}>{addressLabels[key]}</Text>
                </View>
                <Kaede
                  label={oldAddress[key]}
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


const addressField = (props: {
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


interface ReactProps {
  field: string
  profile?: iOB1Profile
  oldProfile?: iOB1Profile
  height?: number
  onChangeText(profile: { profile: iOB1Profile }): any
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
   flex: 2,
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
  getSettings?(payload?: { auth64: string }): Dispatch<ActionType>
}
interface ReduxProps {
  shippingAddresses?: iOB1ShippingAddress[]
  country?: string
  auth64?: string
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    shippingAddresses: state.reduxSettings.settings.shippingAddresses,
    country: state.reduxSettings.settings.country,
    auth64: state.reduxLogin.auth64,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    getSettings: (payload?: { auth64: string }) => dispatch(
      Actions.Settings.INIT_GET_SETTINGS(payload)
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( AddShippingAddress ))

