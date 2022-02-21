

import * as React from 'react'
import { Component } from 'react'
import { StyleSheet } from 'react-native';
import {
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Dimensions,
  Animated,
  ActivityIndicator,
  Button as NativeButton,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Button, CheckBox } from 'react-native-elements'
// Redux
import { connect, Dispatch } from 'react-redux'
import { ReduxState, ReduxStateOB1, reduxReducerOB1, reduxReducerUser } from '../../redux/reducer'
import { Actions, ActionType } from '../../redux/actions'
// router
import { withRouter, RouteComponentProps } from 'react-router'
// component libraries
import HTMLView from 'react-native-htmlview'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import JSONTree from 'react-native-json-tree'
import { Set } from 'immutable'
// Typescript Typings
import { iOB1Profile, iListing, iListingDetails } from '../../typings/ob1Types'
import { APIgatewayURL, ob1API } from '../../redux/requests'
// components
import Price from '../../components/Price'
import ListAvatar from '../../components/ListAvatar'
import MyModerator from '../../components/MyModerator'
import { lightGrey, mediumGrey, linkUnderlayColor, selectedItemColor } from '../../utils/colors'



const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const carouselWidth = windowWidth * 8/8

const horizontalMargin = 20
const slideWidth = 280
const sliderWidth = Dimensions.get('window').width
const itemWidth = slideWidth + horizontalMargin * 2

interface imgType {
  filename?: string
  original?: string
  large?: string
  medium?: string
  small?: string
  tiny?: string
}




class Listing extends Component<ReduxProps & ReduxDispatchProps & ReactProps & RouteComponentProps<any>, any> {

  state = {
    listingDetails: undefined,
    activeSlide: 0,
    itemSize: '',
    quantity: 0,
    carouselHeight: windowWidth,
    selectedOption: '',
    selectedModerator: '',
  }

  private _carousel: any

  componentWillMount() {
    if (this.props.auth64 && this.props.match) {
      let listingDetails = this.getListingDetails({
        auth64: this.props.auth64,
        peerId: this.props.match.params.peerID,
        slug: this.props.match.params.slug,
      })
    }
  }

  handleGoBack = () => {
    this.props.history.goBack()
  }

  handleBuy = async({ async, include }) => {
    alert(JSON.stringify({ myModerators: this.props.myModerators }))
  }

  getListingDetails = async({ auth64, peerId, slug }: { auth64: string, peerId: string, slug: string }) => {
    let listingDetails: iListingDetails = await ob1API.listings.getObListingsSlug({
      auth64: auth64,
      peerId: peerId,
      slug_or_listingHash: slug,
    })
    this.setState({ listingDetails })
    return listingDetails
  }

  decrement = () => {
    if (this.state.quantity < 1) {
      this.setState({ quantity: 0 })
    } else {
      this.setState({ quantity: this.state.quantity - 1 })
    }
  }

  increment = () => {
    this.setState({ quantity: this.state.quantity + 1 })
  }

  enlargeCarousel = () => {
    if (this.state.carouselHeight === windowWidth) {
      this.setState({ carouselHeight: windowHeight })
    } else {
      this.setState({ carouselHeight: windowWidth })
    }
  }

  _renderItem = ({ item, index }) => {
    let img: imgType = item
    let imgHash = this.state.carouselHeight === windowWidth
      ? img.medium
      : img.large
    return (
      <View style={styles.slide}>
        <TouchableHighlight onPress={this.enlargeCarousel} underlayColor="#eee">
          <View style={[ styles.shadowBox, { flex: 1, justifyContent: 'center', alignItems: 'center' } ]}>
            <FastImage
              key={img.filename}
              source={{
                uri: `${APIgatewayURL}/ob/images/${imgHash}`,
                method: 'GET',
              }}
              style={{
                borderColor: lightGrey,
                borderWidth: 1,
                borderRadius: 0,
                // width: carouselWidth,
                width: itemWidth,
                height: this.state.carouselHeight,
              }}
            />
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  setSelectedOption = (selectedOption, keyName) => {
    this.setState({ [keyName]: selectedOption })
  }

  renderOption = (option, selected, onSelect, index) => {
    return (
      <TouchableHighlight onPress={onSelect} key={index}>
        <Text style={{ fontWeight: selected ? 'bold' : '500' }}>{option}</Text>
      </TouchableHighlight>
    )
  }

  toggleAddModerator = (moderator: iOB1Profile) => {
    if (this.state.selectedModerator === moderator.peerID) {
      this.setState({ selectedModerator: undefined })
    } else {
      this.setState({ selectedModerator: moderator.peerID })
    }
    setTimeout(() => {
      alert(JSON.stringify({ selectedMod: this.state.selectedModerator }))
    }, 0)
  }

  // renderModerators = () => {
  //   let myModerators = Set(this.props.myModerators)
  //   return myModerators.map(moderator => {
  //     let avatarURI = moderator.avatarHashes
  //       ? `${APIgatewayURL}/ob/images/${moderator.avatarHashes.original}`
  //       : ''
  //     return (
  //       <TouchableHighlight key={moderator.peerID} onPress={() => this.toggleAddModerator(moderator)}>
  //         <View key={moderator.peerID} style={styles.myModeratorsContainer}>
  //           <MyModerator
  //             moderator={moderator}
  //             avatarURI={avatarURI}
  //             isListingScreen={true}
  //             isMyModerator={true}
  //           />
  //         </View>
  //       </TouchableHighlight>
  //     )
  //   })
  // }


  render() {
    // alert(JSON.stringify(this.props.myModerators))
    if (this.state.listingDetails) {
      let listingDetails: iListingDetails = this.state.listingDetails
      let { listing } = listingDetails
      return (
        <View style={[ styles.shadowBox ]}>
          <ScrollView style={{
            backgroundColor: '#fafafa',
          }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Carousel
                ref={(c) => { this._carousel = c }}
                data={listing.item.images}
                renderItem={this._renderItem}
                // sliderWidth={carouselWidth}
                sliderWidth={sliderWidth}
                // itemWidth={carouselWidth*0.8}
                itemWidth={itemWidth}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <Pagination
                dotsLength={listing.item.images.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{
                  backgroundColor: 'rgba(0,0,0,0)',
                  height: 5,
                  position: 'absolute',
                  bottom: 5,
                  left: windowWidth/2 - 50,
                }}
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(25, 25, 25, 0.92)'
                }}
                inactiveDotStyle={{
                  // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>

            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              paddingTop: 25,
              borderWidth: 1,
              borderColor: lightGrey,
              backgroundColor: '#fff',
              marginTop: 5,
            }}>
              <View>
                <Text style={{ fontSize: 18 }}>{ listing.item.title }</Text>
              </View>
              <View>
                <HTMLView
                  value={listing.item.description}
                  stylesheet={styles}
                />
              </View>
              <View>
                <Price price={listing.item.price/100} symbol={'$'}/>
              </View>
              <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'center',
                padding: 10,
                marginBottom: 5,
                marginTop: 5,
                backgroundColor: '#fafafa',
              }}>
                <Button
                  raised
                  icon={{ name: 'reply', color: '#222' }}
                  onPress={this.handleGoBack}
                  buttonStyle={{
                    borderColor: '#222',
                    borderRadius: 0,
                    borderWidth: 1,
                    padding: 12,
                    height: 38,
                    backgroundColor: '#fff',
                    width: 140,
                  }}
                  textStyle={{
                    textAlign: 'center',
                    color: '#222'
                  }}
                  title={"Store"}
                />
                <Button
                  raised
                  onPress={() => this.handleBuy({ async: 'True', include: '' })}
                  buttonStyle={{
                    borderColor: '#fafafa',
                    borderRadius: 0,
                    padding: 12,
                    height: 38,
                    backgroundColor: '#222',
                    width: 140,
                  }}
                  textStyle={{textAlign: 'center'}}
                  title={"Buy"}
                />
              </View>
            </View>


            <View style={{ padding: 10 }}>
              <View style={styles.quantityContainer}>
                <FastImage source={{
                    uri: `${APIgatewayURL}/ob/images/${listing.item.images[0].small}`,
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
                <View style={{ margin: 10 }}>
                  <Text style={{ marginBottom: 10, fontWeight: '600' }}>Quantity</Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button
                      onPress={this.decrement}
                      buttonStyle={{
                        height: 30,
                        backgroundColor: '#EDEFF2',
                        borderWidth: 1,
                        borderColor: lightGrey,
                        width: 30,
                        margin: 0,
                        padding: 10,
                      }}
                      textStyle={{textAlign: 'center', color: '#222'}}
                      containerViewStyle={{ marginLeft: 0, padding: 0 }}
                      title={"-"}
                    />
                    <Button
                      disabled
                      onPress={this.decrement}
                      buttonStyle={{
                        backgroundColor: '#F7F7F7',
                        borderWidth: 1,
                        borderColor: lightGrey,
                        height: 30,
                        width: 40,
                        margin: 0,
                        marginLeft: -15,
                        padding: 10,
                        borderRadius: 0,
                      }}
                      textStyle={{ textAlign: 'center', fontSize: 12, color: '#222' }}
                      containerViewStyle={{ marginLeft: 0, padding: 0 }}
                      title={`${this.state.quantity}`}
                    />
                    <Button
                      onPress={this.increment}
                      buttonStyle={{
                        height: 30,
                        backgroundColor: '#EDEFF2',
                        borderWidth: 1,
                        borderColor: lightGrey,
                        width: 30,
                        marginLeft: -15,
                        margin: 0,
                        padding: 0,
                      }}
                      containerViewStyle={{ marginLeft: 0, padding: 0 }}
                      textStyle={{ textAlign: 'center', color: '#222' }}
                      title={"+"}
                    />
                  </View>
                </View>
              </View>

            </View>

            {/* <SegmentedControls */}
            {/*   tint={'#f80046'} */}
            {/*   selectedTint={'white'} */}
            {/*   backTint={'#1e2126'} */}
            {/*   options={ options } */}
            {/*   allowFontScaling={ false } // default: true */}
            {/*   onSelection={ this.setSelectedOption } */}
            {/*   selectedOption={ this.state.selectedOption } */}
            {/*   optionStyle={{ fontFamily: 'AvenirNext-Medium' }} */}
            {/*   optionContainerStyle={{ flex: 1, borderRadius: 5,}} */}
            {/* /> */}

            {
              listing.item.options.map(( option, i ) => {
                let keyName = option.name
                return (
                  <View key={i} style={{ margin: 10 }}>
                    <Text style={{ fontWeight: '600' }}>{ option.name }</Text>
                    <SegmentedControls
                      tint={"#222"}
                      backTint={"#f1f1f1"}
                      options={ option.variants.map(v => v.name) }
                      // options={ options }
                      onSelection={(selectedOption) => this.setSelectedOption(selectedOption, keyName) }
                      selectedOption={ this.state[keyName] }
                      // onSelection={(selectedOption) => this.setState({ [option.name]: selectedOption })}
                      // selectedOption={ this.state[option.name] }
                      optionContainerStyle={{ flex: 1, borderRadius: 0 }}
                      tabsContainerStyle={{ borderWidth: 1, borderColor: lightGrey }}
                      containerBorderRadius={0}
                    />
                  </View>
                )
              })
            }

            {(
                (this.props.isLoading)
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
                      {( 'Finding Moderators...' )}
                    </Text>
                    <ActivityIndicator
                      color="#222"
                      animating={true}
                    />
                  </View>
                : <View/>
            )}

            <View style={{ margin: 10 }}>
              <Text style={{ fontWeight: '600' }}>Moderator</Text>
              {/* { */}
              {/*   this.renderModerators() */}
              {/* } */}
            </View>

          </ScrollView>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Text style={{ height: 20, fontSize: 12, color: '#222' }}>
            Loading Listing Pics...
          </Text>
          <ActivityIndicator
            color="#222"
            animating={true}
          />
        </View>
      )
    }
  }
}


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
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
  },
  myModeratorsContainer: {
    borderTopWidth: 1,
    borderTopColor: lightGrey,
  },
  title: {
  },
  slide: {
    width: itemWidth,
  },
  // just for inline html rendering
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
  div: {
    fontWeight: '300',
    color: '#666', // make links coloured pink
  }
})



interface ReduxDispatchProps {
  setScrollY?(payload: { scrollY: number }): Dispatch<ActionType>
  updateRouteName?(payload: { routeName: string, routeURL: string }): Dispatch<ActionType>
}
interface ReduxProps {
  auth64?: string
  isLoading: boolean
}
interface ReactProps {
  listing: iListing
  listingDetails: iListingDetails
  browsedListings: iListing[]
  moderators?: iOB1Profile[]
  myModerators?: iOB1Profile[]
  following: iOB1Profile[]
  peerId: string
}

//////////////// REDUX /////////////////////
const mapStateToProps = ( state: ReduxState ) => {
  return {
    browsedListings: state.reduxOB1.browsedListings,
    auth64: state.reduxLogin.auth64,
    moderators: state.reduxOB1.moderators,
    myModerators: state.reduxOB1.myModerators,
    following: state.reduxOB1.following,
    isLoading: state.reduxLogin.isLoading,
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    setScrollY: ({ scrollY }) => dispatch(
      Actions.OB1.SET_SCROLL_Y( scrollY )
    ),
    updateRouteName: ({ routeName, routeURL }) => dispatch(
      Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })
    ),
  }
}
export default connect<ReduxProps, ReduxDispatchProps, ReactProps>(
  mapStateToProps,
  mapDispatchToProps,
)( Listing )
