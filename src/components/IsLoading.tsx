
import * as React from 'react'
import { Component } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native'


class IsLoading extends Component<ReactProps, any> {

  static defaultProps = {
    LoadingMessage: 'Loading...',
    isLoading: false,
  }

  render() {
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
            { this.props.LoadingMessage }
          </Text>
          <ActivityIndicator
            color="#222"
            animating={true}
          />
        </View>
      )
    } else {
      return (<View/>)
    }
  }
}

interface ReactProps {
  isLoading?: boolean
  LoadingMessage?: string
}

export default IsLoading
