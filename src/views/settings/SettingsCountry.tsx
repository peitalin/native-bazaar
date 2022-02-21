
import * as React from 'react'
import { Component } from 'react'

import { StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  Alert,
  View,
  SectionList,
  ScrollView,
} from 'react-native'
import { List, ListItem, Avatar, Button, Icon } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Settings } from '../../typings/ob1Types'

import { Link } from 'react-router-native'
import Flag from 'react-native-flags'
import { countryList } from '../../utils/Countries'
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from '../../utils/colors'



class SettingsCountry extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  matchName = (a, b) => {
    return a.name.toLowerCase() === b.replace('_',' ').toLowerCase()
  }

  render() {

    let country: {
      name: string
      cca2: string
      countryCode: string
    } = countryList.find(o => this.matchName(o, this.props.settings.country))
    let cca2 = country.cca2 || 'US'

    return (
      <View>
        <ListItem
          chevronColor="#222"
          containerStyle={styles.listItem}
          titleStyle={styles.listItemTitle}
          title={"Country"}
          component={() =>
            <Link to="/settings/edit-country" underlayColor={linkUnderlayColor}>
              <View style={styles.insideContainer}>
                <View style={{ flex: 5, marginLeft: 20 }}>
                  <Text style={styles.listItemTitle}>Country</Text>
                </View>
                <View style={{ flex: 1, marginRight: 20 }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Flag code={country.cca2} size={24} />
                    <Text style={styles.listItemTitle}>
                      {( ` ${country.cca2}` )}
                    </Text>
                    <Icon name="keyboard-arrow-right" color="#222" iconStyle={{ fontSize: 28 }}/>
                  </View>
                </View>
              </View>
            </Link>
          }
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  listItem: {
   borderBottomColor: lightGrey,
   borderBottomWidth: 1 ,
  },
  listItemTitle: {
   color: mediumGrey,
   fontSize: 14,
  },
  insideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
  },
})


interface ReduxDispatchProps {
}
interface ReduxProps {
  settings: iOB1Settings
}
interface ReactProps {
}

const mapStateToProps = ( state: ReduxState ) => {
  return {
    settings: state.reduxSettings.settings,
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( SettingsCountry )
