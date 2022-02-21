
import * as React from 'react'
import { Component } from 'react'

import { StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native'
import { iOB1Profile } from '../../typings/ob1Types'



class StoreAbout extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  render() {
    return (
      <View style={[ styles.aboutContainer ]}>
        <View style={{ marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#aaa' }}>
          <Text style={{ fontWeight: '600' }}>About</Text>
        </View>
        <View style={styles.rows}>
          <Text style={{ fontWeight: '600' }}>Email:</Text>
          <Text style={{ color: '#64A3E5' }}>{ this.props.profile.contactInfo.email }</Text>
        </View>
        <View style={styles.rows}>
          <Text style={{ fontWeight: '600' }}>Phone Number:</Text>
          <Text style={{ color: '#64A3E5' }}>{ this.props.profile.contactInfo.phoneNumber }</Text>
        </View>
        <View style={styles.rows}>
          <Text style={{ fontWeight: '600' }}>Website:</Text>
          <Text style={{ color: '#64A3E5' }}>{ this.props.profile.contactInfo.website }</Text>
        </View>
        {(
          this.props.profile.contactInfo.social &&
            this.props.profile.contactInfo.social.map(social => {
            return (
              <View key={social.username}>
                <Text>{social.type}: { social.username }</Text>
              </View>
            )
          })
        )}
      </View>
    )
  }
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  aboutContainer: {
    height: 200,
    padding: 40,
    backgroundColor: '#f1f1f1',
  },
  shadowBox: {
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
  },
  rows: {
    flex: 1,
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  }
})

interface ReduxDispatchProps {
}
interface ReduxProps {
}
interface ReactProps {
  profile?: iOB1Profile
  isLoading?: boolean
}


export default StoreAbout

