
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
  Dimensions,
  Animated,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Rating } from 'react-native-elements'

import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
import { withRouter, RouteComponentProps } from 'react-router'
import { iListing, iOB1Profile } from '../../typings/ob1Types'
import { APIgatewayURL } from '../../redux/requests'

import Price from '../../components/Price'
import StarRating from 'react-native-star-rating'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


// clickable listings thumbnail
class ListingThumbnail extends Component<ReduxProps & ReduxDispatchProps & ReactProps, any> {

  state = {
    rating: 0
   }

  static defaultProps = {
    listing: {}
  }

  componentWillMount() {
    this.setState({ rating: this.props.listing.averageRating })
  }

  handleExamineListing = () => {
    this.props.updateRouteName({
      routeName: 'Listing',
      routeURL: `/listing/${this.props.browsedProfile.peerID}/${this.props.listing.slug}`
      // remember, in index.ios.tsx, the route params are /listing/:peerID/:slug
    })
  }

  onStarRatingPress = (rating) => {
    this.setState({
      rating: rating
    })
  }

  formatPhysicalGoods = (goods: string) => {
    return goods.replace('_', ' ').toLowerCase()
  }

  render() {
    let { listing } = this.props
    return (
      <View style={[ styles.shadowBox, {
        backgroundColor: white
      }]}>
        <TouchableHighlight
          onPress={this.handleExamineListing}
          underlayColor={linkUnderlayColor}
        >
          <View style={[{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            padding: 5,
          }]}>
            <View style={[{ flex: 2, margin: 5 }]}>
              {(
                listing.thumbnail &&
                  <FastImage source={{
                      uri: `${APIgatewayURL}/ob/images/${listing.thumbnail.small}`,
                      method: 'GET',
                    }}
                    style={{
                      borderRadius: 0,
                      borderWidth: 1,
                      borderColor: lightGrey,
                      width: 120,
                      height: 120,
                    }}
                  />
              )}
            </View>


            <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'space-between', margin: 4 }}>
              <Text style={{ fontWeight: '600', fontSize: 16, margin: 4 }}>{listing.title}</Text>
              <View style={{ margin: 4 }}>
                <Price
                  price={listing.price.amount/100}
                  symbol={listing.price.currencyCode + ' $'}
                />
                <Text style={{
                  fontWeight: '600',
                  fontSize: 12,
                  color: mediumGrey,
                }}>
                  {this.formatPhysicalGoods(listing.contractType)}
                </Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet={'Ionicons'}
                  starSize={18}
                  rating={this.state.rating}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <Text style={{ fontWeight: '400', fontSize: 12 }}>{( `${listing.ratingCount} ratings` )}</Text>
              </View>

            </View>

          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const white = '#fff'
const lightGrey = '#d6d6d6'
const mediumGrey = '#939393'
const linkUnderlayColor = '#fafafa'

const styles = StyleSheet.create({
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
  updateRouteName?(route: { routeName: string, routeURL: string }): Dispatch<ActionType>
}
interface ReduxProps {
  browsedProfile: iOB1Profile
}
interface ReactProps {
  listing: iListing
}


//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    browsedProfile: state.reduxOB1.browsedProfile
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( ListingThumbnail )

