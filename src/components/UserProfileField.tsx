

import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Text,
  TextInput,
  View,
} from 'react-native'
import { Kaede } from 'react-native-textinput-effects'
import HTMLView from 'react-native-htmlview'
import { iOB1Profile, iOB1SetProfileBody } from '../typings/ob1Types'
import { encodeHtmlEntity, decodeHtmlEntity } from '../utils/htmlEncoder'
import { selectedItemColor, lightGrey, mediumGrey } from '../utils/colors'




class UserProfileField extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  getOnChangeText = (props: ReduxProps & ReduxDispatchProps & ReactProps) => {
    let _field = (props.field === 'phone') ? 'phoneNumber' : props.field
    let isContactInfo = ['email', 'phone', 'website'].includes(props.field)
    // convert HTML strings
    // return function that updates profile
    // note that contactInfo is nested 1 layer deeper than other fields
    if (isContactInfo) {
      return (text) => props.onChangeText({
          profile: {
            ...props.profile,
            contactInfo: {
              ...props.profile.contactInfo,
              [_field]: text
            }
          }
        })
    } else {
      return (text) => props.onChangeText({
          profile: {
            ...props.profile,
            [_field]: text
          }
        })
    }
  }

  render() {
    let props = this.props
    let isContactInfo = ['email', 'phone', 'website'].includes(props.field)
    let FieldName = props.field.slice(0,1).toUpperCase() + props.field.slice(1)
    // onChange function
    let _field = (props.field === 'phone') ? 'phoneNumber' : props.field
    let _onChangeText = this.getOnChangeText(props)
    // for the left label (old field values)
    let _label = (isContactInfo)
      ? props.oldProfile.contactInfo[_field]
      : props.oldProfile[_field]

    let _rawLabel = decodeHtmlEntity(_label)

    return (
      <View style={styles.listItem}>
        <View style={styles.listItemTitle}>
          <Text style={styles.listItemText}>{FieldName}</Text>
        </View>
        <Kaede
          label={_rawLabel}
          onChangeText={_onChangeText}
          height={this.props.height}
          style={styles.kaedeStyle}
          containerStyle={styles.kaedeContainerStyle}
          inputStyle={styles.kaedeInputStyle}
          labelStyle={styles.kaedeLabelStyle}
        />
      </View>
    )
  }
}

interface ReduxDispatchProps {
}
interface ReduxProps {
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
   flex: 1,
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
    flex: 4,
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

export default UserProfileField
