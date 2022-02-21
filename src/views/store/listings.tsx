
import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
  View,
  ScrollView,
  Picker,
  Dimensions,
} from 'react-native'

import { iListing } from '../../typings/ob1Types'
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import ListingThumbnail from './listingthumbnail'

const windowHeight = Dimensions.get('window').height


class Listings extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {
    viewStyle: 'Card', // Row, Grid
  }

  private _scrollView: any

  static defaultProps = {
    listings: [],
    isLoading: true,
  }

  handleScroll = (event) => {
    let { y } = event.nativeEvent.contentOffset
    this.props.setScrollY({ scrollY: y })
  }

  render() {
    return (
      <View style={[ styles.shadowBox, styles.container ]}>
        <ScrollView
          ref={(scrollView) => { this._scrollView = scrollView }}
          onScroll={this.handleScroll}
          scrollEventThrottle={1} // 1: 1 update per frame, 16: lowest updates
        >
          <View style={{ margin: 10 }}>
            <Text>{(`${this.props.listings.length} listings`)}</Text>
            {(
                (this.props.isLoading)
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
                      Loading Listings...
                    </Text>
                    <ActivityIndicator
                      color="#222"
                      animating={true}
                    />
                  </View>
                : <View/>
            )}
          </View>

          {(
            !!this.props.listings.length &&
            this.props.listings.map(listing => {
              return (
                <ListingThumbnail listing={listing} key={listing.hash}/>
              )
            })
          )}
          {(
            ( this.props.listings.length < 4 ) &&
            <View style={{ height: windowHeight * 1/2 }}>
            {/* Placeholder for parallax when there aren't many items*/}
            </View>
          )}

        </ScrollView>
      </View>
    )
  }
}

const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 507,
    backgroundColor: '#fff',
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
})

interface ReduxDispatchProps {
  setScrollY?(payload: { scrollY: number }): Dispatch<ActionType>
}
interface ReduxProps {
}
interface ReactProps {
  listings: iListing[]
  isLoading: boolean
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    setScrollY: ({ scrollY }) => dispatch(
      Actions.OB1.SET_SCROLL_Y( scrollY )
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( Listings )
