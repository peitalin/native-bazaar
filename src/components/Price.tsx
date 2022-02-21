
import * as React from 'react'
import { Text } from 'react-native';

interface ReactProps {
  price?: number
  symbol?: string
  style?: any
}

export default class Price extends React.Component<ReactProps, any> {

  static defaultProps = {
    symbol: '$'
  }

  formatDollars = (price: number): string => {
    // formats numbers into dollars: 9111000 => $9,111,000
    const insertComma = (match, offset, str) => {
      // see if we should insert comma
      if ( offset && (match !== ".") && ((str.length - offset) % 3 === 0) ) {
        return ',' + match
      } else {
        return match
      }
    }
    return this.props.symbol + price.toFixed(2).replace(/./g, insertComma)
  }

  render() {
    return (
      <Text {...this.props}>
        { this.formatDollars(this.props.price) }
      </Text>
    )
  }
}
