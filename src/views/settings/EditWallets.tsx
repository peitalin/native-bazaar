
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  TextInput,
  Alert,
  View,
  SectionList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions } from '../../redux/actions'
import { iOB1Profile, iOB1Settings } from '../../typings/ob1Types'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'



class EditWallets extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  handlePress = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Bitcoin Address</Text>
        </View>

        <View style={{ backgroundColor: '#EFEFF4', padding: 0 }}>
          <List style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}>
          {(
            this.props.profile &&
            [ this.props.profile.bitcoinPubkey ].map(( pubKey: string, i: number) =>
            <View key={i}>
              <ListItem
                hideChevron
                containerStyle={styles.listItem}
                titleStyle={styles.listItemTitle}
                title={
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 4 }}>{ pubKey }</Text>
                    <Text style={{ flex: 1 }}></Text>
                  </View>
                }
              />
            </View>
            )
          )}
          </List>
        </View>

        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <Text style={styles.headings}>Resync Wallet</Text>
          <View style={{ padding: 20, backgroundColor: '#fff' }}>
            <Text>This button will trigger the internal Bitcoin Wallet to resynchronise. It is generally advised that you only do this if you suspect that there is a problem with the wallet.</Text>
          </View>
          <Button
            raised
            onPress={this.handlePress}
            onLongPress={() => Alert.alert("Long Pressed")}
            buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
            textStyle={{textAlign: 'center'}}
            title={"Resync Wallet"}
          />
        </View>

        <Link to="/settings" underlayColor='#f0f4f7'>
          <View style={{ marginTop: 5 }}>
            <Button
              raised
              icon={{name: 'reply'}}
              onPress={this.handlePress}
              onLongPress={() => Alert.alert("Long Pressed")}
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

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'

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
    padding: 0,
    borderBottomColor: lightGrey,
    borderBottomWidth: 1 ,
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
    alignItems: 'flex-start',
  },
  listItemTitle: {
   color: mediumGrey,
   fontSize: 14,
  },
  addNewAddress: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: lightGrey,
  },
  chosenAddress: {
    backgroundColor: '#90E0F3',
  },
})

interface ReduxDispatchProps {
}
interface ReduxProps {
  profile?: iOB1Profile
  auth64?: string
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    profile: state.reduxOB1.profile,
    auth64: state.reduxLogin.auth64,
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
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditWallets ))

