
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'
// redux
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { OrderedMap } from 'immutable'
// react-router
import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'
// utils
import { iOB1ShippingAddress } from '../../typings/ob1Types'
import { selectedItemColor, lightGrey, mediumGrey } from '../../utils/colors'
import { decodeHtmlEntity } from '../../utils/htmlEncoder'



class ShippingAddresses extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  componentWillMount() {
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleEditAddress = () => {
    this.props.history.push('/settings/add-shipping-address')
  }

  render() {
    let chosenAddress = false
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>
        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Shipping Addresses</Text>
        </View>

        <Link
          to={{
            pathname: '/settings/add-shipping-address',
            state: {
              address: {},
              addressIndex: undefined,
              newAddress: true
            }
            // addressIndex: to keep track of which address for updates
          }}
          underlayColor='#f0f4f7'
        >
          <View>
            <List style={{ borderTopWidth: 1, borderTopColor: lightGrey, borderBottomColor: lightGrey }}>
              <ListItem
                chevronColor="#222"
                title="Add New Address"
                containerStyle={styles.listItem}
                titleStyle={styles.addNewAddress}
              />
            </List>
          </View>
        </Link>

        <List style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}>
        {(
          this.props.shippingAddresses.map((address, i) => {
            let addressMap: iOB1ShippingAddress = OrderedMap(address)
              .map((val: string) => decodeHtmlEntity(val))
							.toObject()
            return (
              <Link
                key={i}
                to={{
                  pathname: '/settings/add-shipping-address',
                  state: {
                    address: addressMap,
                    addressIndex: i,
                    newAddress: false
                  } // addressIndex: to keep track of which address for updates
                }}
                underlayColor='#606467'
              >
                <View key={i}>
                  <ListItem
                    chevronColor="#222"
                    title={ `${addressMap.name}` }
                    containerStyle={chosenAddress ? [styles.listItem, styles.selectedItem] : styles.listItem}
                    titleStyle={styles.listItemAddress}
                    subtitle={
                        <View style={ chosenAddress
                          ? [ styles.listItem, styles.noBorder, styles.listItemColumn, styles.selectedItem ]
                          : [ styles.listItem, styles.noBorder, styles.listItemColumn ]
                        }>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>Company:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.company}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>Street:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.addressLineOne}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>Suburb:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.addressLineTwo}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>City:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.city}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>State:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.state}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>Country:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.country}` )}</Text>
                          </View>
                          <View style={styles.addressItems}>
                            <Text style={{ flex: 1, fontWeight: '500' }}>Notes:</Text>
                            <Text style={{ flex: 1 }}>{( `${addressMap.addressNotes}` )}</Text>
                          </View>
                        </View>
                    }
                    rightTitle={"Edit"}
                    rightTitleContainerStyle={{ flex: 0 }}
                  />
                </View>
              </Link>
            )
          })
        )}
        </List>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Button
            raised
            icon={{name: 'reply'}}
            onPress={this.handlePress}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={"Back to Settings"}
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: lightGrey,
    backgroundColor: '#fff',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: selectedItemColor,
  },
  noBorder: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  listItemColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  listItemAddress: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  addNewAddress: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: lightGrey,
  },
  chosenAddress: {
    backgroundColor: mediumGrey,
  },
  addressItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
})


interface ReduxDispatchProps {
  updateShippingAddress?( shippingAddresses: iOB1ShippingAddress[] ): Dispatch<ActionType<any>>
}
interface ReduxProps {
  shippingAddresses?: iOB1ShippingAddress[]
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    shippingAddresses: state.reduxSettings.settings.shippingAddresses,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    updateShippingAddress: ( shippingAddresses: iOB1ShippingAddress[] ) => dispatch(
      Actions.Settings.UPDATE_SHIPPING_ADDRESSES( shippingAddresses )
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( ShippingAddresses ))

