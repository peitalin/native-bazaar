
import * as React from 'react'
import { Component } from 'react'

import { AppRegistry, StyleSheet, Platform } from 'react-native';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { List, ListItem, Avatar, Button, Icon } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { iOB1Settings } from '../../typings/ob1Types'

import { Link } from 'react-router-native'
import Flag from 'react-native-flags'
import { lightGrey, mediumGrey, linkUnderlayColor } from '../../utils/colors'




class SettingsCurrency extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  render() {
    return (
      <Link to="/settings/edit-currency" underlayColor={linkUnderlayColor}>
        <View>
          <ListItem
            chevronColor="#222"
            containerStyle={styles.listItem}
            titleStyle={styles.listItemTitle}
            title={"Currency"}
            component={() =>
              <View style={styles.insideContainer}>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={styles.listItemTitle}>Currency</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginRight: 10}}>
                    <Text style={styles.listItemTitle}>
                      {(
                        `${this.props.settings.localCurrency}`
                      )}
                    </Text>
                    <Icon name="keyboard-arrow-right" color="#222" iconStyle={{ fontSize: 28 }}/>
                  </View>
                </View>
              </View>
            }
          />
        </View>
      </Link>
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
    flexDirection: 'row', alignItems: 'center',
    borderBottomColor: lightGrey,
    borderBottomWidth: 1,
    marginTop: 10,
    paddingBottom: 10,
    paddingRight: 0,
    marginRight: 0,
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
)( SettingsCurrency )
