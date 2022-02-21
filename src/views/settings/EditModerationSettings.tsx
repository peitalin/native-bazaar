
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  TextInput,
  Alert,
  View,
  FlatList,
  SectionList,
  ScrollView,
	StyleSheet,
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions } from '../../redux/actions'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'



class EditModeratorSettings extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  state = {
    applyToBeMod: false
  }

  handlePress = () => {
    this.setState({ applyToBeMod: !this.state.applyToBeMod })
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

        <View style={{ backgroundColor: '#EFEFF4' }}>
          <Text style={styles.headings}>Edit Your Moderator Profile</Text>
        </View>

        <View style={{ backgroundColor: '#EFEFF4', padding: 0 }}>
          <List style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}>
            <ListItem
              hideChevron
              containerStyle={styles.listItem}
              titleStyle={styles.listItemTitle}
              title={
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text style={{ fontWeight: '600' }}> Moderators </Text>
                  <Text style={{ flex: 1, margin: 5 }}>
                  Moderators on the OpenBazaar network help resolve disputes between buyers and vendors, and release funds held in escrow. Anyone can become a moderator on the network, but you should do so only if you are serious about offering your services to OpenBazaar users.
                  </Text>
                  <Text style={{ flex: 1, margin: 5 }}>
                    Moderators need to respond quickly to new disputes, communicate with both parties to learn the details of the dispute, and then impartially settle the dispute and distribute the escrowed funds.
                  </Text>
                </View>
              }
            />
          </List>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          {(
            !this.state.applyToBeMod
            ? <Button
                raised
                onPress={this.handlePress}
                onLongPress={() => Alert.alert("Long Pressed")}
                buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
                textStyle={{textAlign: 'center'}}
                title={"Become a Moderator"}
              />
            : <View>
                <Text style={styles.headings}>Profile Information</Text>
                <View style={{ padding: 0, backgroundColor: '#fff' }}>
                  <List containerStyle={styles.listContainer}>
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Description"}
                    />
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Terms of Service"}
                    />
                  </List>
                </View>
                <Text style={styles.headings}>Languages</Text>
                <View style={{ padding: 0, backgroundColor: '#fff' }}>
                  <List containerStyle={styles.listContainer}>
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Primary Language"}
                    />
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Secondary Language"}
                    />
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Third Language"}
                    />
                  </List>
                </View>
                <Text style={styles.headings}>Fees</Text>
                <View style={{ padding: 0, backgroundColor: '#fff' }}>
                  <List containerStyle={styles.listContainer}>
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Flat Fee or Percentage or Flat Fee + Percentage"}
                    />
                    <ListItem
                      hideChevron
                      containerStyle={{ borderBottomWidth: 0 }}
                      titleStyle={styles.listItemTitle}
                      title={"Fee ($)"}
                      rightTitle={"Enter Amount"}
                    />
                  </List>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                  <Button
                    raised
                    onPress={this.handlePress}
                    onLongPress={() => Alert.alert("Long Pressed")}
                    buttonStyle={{backgroundColor: '#BB4959', borderRadius: 4, padding: 16 }}
                    textStyle={{textAlign: 'center'}}
                    title={"Stop Being a Moderator"}
                  />
                </View>
              </View>
          )}

        </View>
      </ScrollView>
    )
  }
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

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
}
interface ReactProps {
}
interface ReactState {
  applyToBeMod: boolean
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditModeratorSettings ))

