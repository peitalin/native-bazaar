
import * as React from 'react'
import { Component } from 'react'
import { AppRegistry, StyleSheet, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native';
import {
  Text,
  TextInput,
  Alert,
  View,
  ScrollView,
  Image,
  PixelRatio,
} from 'react-native';
import { List, ListItem, Button, Avatar } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Settings } from '../../typings/ob1Types'

import { Link, Redirect } from 'react-router-native'
import { withRouter, RouteComponentProps } from 'react-router'

import Flag from 'react-native-flags'
import { countryList } from '../../utils/Countries'

import { APIgatewayURL, ob1API } from '../../redux/requests'
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from '../../utils/colors'


const defaultCountries = [
  'AU', 'US', 'CA', 'GB', 'BR', 'CN', 'FR',
  'HK', 'IT', 'JP', 'RU', 'ES', 'SE', 'UA', 'AE',
]
interface iCountry {
  name?: string
  cca2?: string
}


class EditCountry extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, ReactState> {

  state = {
    loadMoreCountries: false,
  }

  handlePress = () => {
    this.props.history.goBack()
  }

  handleSelectCountry = async( country: string ) => {
    let res = await ob1API.settings.patchObSettings({
      auth64: this.props.auth64,
      body: {
        country: country
      } // patchObSettings: I only need to send changes in user settings
    })
    if (res) {
      this.props.updateSettings({
        ...this.props.settings,
        country: country
      })
    }
    this.props.history.goBack()
  }

  handleLoadMoreCountries = () => {
    this.setState({ loadMoreCountries: !this.state.loadMoreCountries })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <ScrollView style={{ backgroundColor: '#EFEFF4' }}>

          <View style={{ backgroundColor: '#EFEFF4' }}>
            <Text style={styles.headings}>Pick your Country</Text>
          </View>

          <View style={{ backgroundColor: '#EFEFF4', padding: 0 }}>
            <ScrollView
              style={styles.listContainer}
              contentContainerStyle={{ borderWidth: 0 }}
            >
            {(
              countryList
              .filter(country => defaultCountries.includes(country.cca2))
              .map((country: iCountry, i: number) => {
                let selectedCountry = this.props.settings.country.toLowerCase() === country.name.toLowerCase()
                return (
                  <View key={i}>
                    <TouchableHighlight onPress={() => this.handleSelectCountry(country.name)} underlayColor="#bbb">
                      <View style={styles.listItem}>
                        <ListItem
                          hideChevron
                          containerStyle={selectedCountry ? [styles.listItem, styles.selectedItem] : styles.listItem}
                          titleStyle={styles.listItemTitle}
                          title={
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                              <View style={{ flex: 1 }}>
                                <Flag code={country.cca2} size={24} />
                              </View>
                              <Text style={{ flex: 6 }}>
                                { country.name }
                              </Text>
                              {(
                                (selectedCountry)
                                ? <Text style={{ flex: 2 }}>{( "(Selected)" )}</Text>
                                : <Text style={{ flex: 2 }}>{( "" )}</Text>
                              )}
                            </View>
                          }
                        />
                      </View>
                    </TouchableHighlight>
                </View>
                )
              })
            )}
            </ScrollView>

            <View style={{ marginTop: 10, marginBottom: 10, backgroundColor: 'rgba(0, 0, 0, 0)' }}>
              <Button
                icon={{ name: (this.state.loadMoreCountries) ? "keyboard-arrow-up" : "keyboard-arrow-down" }}
                onPress={this.handleLoadMoreCountries}
                onLongPress={() => Alert.alert("Long Pressed")}
                buttonStyle={{backgroundColor: '#222', borderRadius: 4, padding: 16 }}
                textStyle={{textAlign: 'center'}}
                title={(this.state.loadMoreCountries) ? "Close List" : "Load More Countries"}
              />
            </View>

            <ScrollView
              style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey }}
              contentContainerStyle={{ marginTop: 0 }}
            >
            {(
              this.state.loadMoreCountries &&
              countryList.map((country, i) =>
              <View key={i}>
                <View style={styles.listItem}>
                  <ListItem
                    hideChevron
                    containerStyle={styles.listItem}
                    titleStyle={styles.listItemTitle}
                    title={
                      <TouchableHighlight onPress={() => this.handleSelectCountry(country.name)}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View style={{ flex: 1 }}>
                            <Flag code={country.cca2} size={24} />
                          </View>
                          <Text style={{ flex: 7 }}>{ country.name }</Text>
                        </View>
                      </TouchableHighlight>
                    }
                  />
                </View>
              </View>
              )
            )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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
    padding: 0,
    borderColor: lightGrey,
    backgroundColor: '#fff',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 0,
    borderBottomColor: lightGrey,
    borderBottomWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: selectedItemColor,
  },
  listItemTitle: {
   color: mediumGrey,
   fontSize: 14,
  },
})


interface ReduxDispatchProps {
  updateSettings?(settings: iOB1Settings): Dispatch<ActionType>
}
interface ReduxProps {
  settings?: iOB1Settings
  auth64?: string
}
interface ReactProps {
}
interface ReactState {
  loadMoreCountries: boolean
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    settings: state.reduxSettings.settings,
    auth64: state.reduxLogin.auth64,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateSettings: ( settings: iOB1Settings ) => dispatch(
      Actions.Settings.UPDATE_SETTINGS( settings )
    ),
  }
}

export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter( EditCountry ))

