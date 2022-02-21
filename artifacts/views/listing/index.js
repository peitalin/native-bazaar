var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableHighlight, View, ScrollView, Dimensions, ActivityIndicator, } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import HTMLView from 'react-native-htmlview';
import { APIgatewayURL, ob1API } from '../../redux/requests';
import Price from '../../components/Price';
import ListAvatar from '../../components/ListAvatar';
import JSONTree from 'react-json-tree';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SegmentedControls } from 'react-native-radio-buttons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const carouselWidth = windowWidth * 8 / 8;
const horizontalMargin = 20;
const slideWidth = 280;
const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
class Listing extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            listingDetails: undefined,
            activeSlide: 0,
            itemSize: '',
            quantity: 0,
            carouselHeight: windowWidth,
            selectedOption: '',
            selectedModerator: '',
        };
        this.handleGoBack = () => {
            this.props.history.goBack();
        };
        this.handleBuy = ({ async, include }) => __awaiter(this, void 0, void 0, function* () {
            alert("loading moderators");
            yield this.props.getModerators({
                auth64: this.props.auth64,
                async: async,
                include: include,
            });
        });
        this.getListingDetails = ({ auth64, peerId, slug }) => __awaiter(this, void 0, void 0, function* () {
            let listingDetails = yield ob1API.listings.getObListingsSlug({
                auth64: auth64,
                peerId: peerId,
                slug_or_listingHash: slug,
            });
            this.setState({ listingDetails });
            return listingDetails;
        });
        this.decrement = () => {
            if (this.state.quantity < 1) {
                this.setState({ quantity: 0 });
            }
            else {
                this.setState({ quantity: this.state.quantity - 1 });
            }
        };
        this.increment = () => {
            this.setState({ quantity: this.state.quantity + 1 });
        };
        this.enlargeCarousel = () => {
            if (this.state.carouselHeight === windowWidth) {
                this.setState({ carouselHeight: windowHeight });
            }
            else {
                this.setState({ carouselHeight: windowWidth });
            }
        };
        this._renderItem = ({ item, index }) => {
            let img = item;
            let imgHash = this.state.carouselHeight === windowWidth
                ? img.medium
                : img.large;
            return (React.createElement(View, { style: styles.slide },
                React.createElement(TouchableHighlight, { onPress: this.enlargeCarousel, underlayColor: "#eee" },
                    React.createElement(View, { style: [styles.shadowBox, { flex: 1, justifyContent: 'center', alignItems: 'center' }] },
                        React.createElement(FastImage, { key: img.filename, source: {
                                uri: `${APIgatewayURL}/ob/images/${imgHash}`,
                                method: 'GET',
                            }, style: {
                                borderColor: lightGrey,
                                borderWidth: 1,
                                borderRadius: 0,
                                // width: carouselWidth,
                                width: itemWidth,
                                height: this.state.carouselHeight,
                            } })))));
        };
        this.setSelectedOption = (selectedOption, keyName) => {
            this.setState({ [keyName]: selectedOption });
        };
        this.renderOption = (option, selected, onSelect, index) => {
            const style = selected ? { fontWeight: 'bold' } : {};
            return (React.createElement(TouchableHighlight, { onPress: onSelect, key: index },
                React.createElement(Text, { style: style }, option)));
        };
        this.renderModerators = () => {
            if (this.props.following.filter(f => f.moderator).length > 0) {
                return this.props.following.filter(f => f.moderator).map(profile => {
                    return (React.createElement(TouchableHighlight, { key: profile.peerID, onPress: () => this.setState({ selectedModerator: profile.peerID }) },
                        React.createElement(View, null,
                            React.createElement(ListAvatar, { profile: profile, large: false, chosen: this.state.selectedModerator === profile.peerID }))));
                });
            }
            else {
                return (this.props.moderators.map((modProfile) => {
                    return (React.createElement(TouchableHighlight, { key: modProfile.peerID, onPress: () => this.setState({ selectedModerator: modProfile.peerID }) },
                        React.createElement(View, null,
                            React.createElement(ListAvatar, { profile: modProfile, large: false, chosen: this.state.selectedModerator === modProfile.peerID }))));
                }));
            }
        };
        this.renderContainer = (optionNodes) => {
            return (React.createElement(View, null, optionNodes));
        };
    }
    componentWillMount() {
        if (this.props.auth64 && this.props.match) {
            let listingDetails = this.getListingDetails({
                auth64: this.props.auth64,
                peerId: this.props.match.params.peerID,
                slug: this.props.match.params.slug,
            });
            // this.props.getModerators({ auth64: this.props.auth64 })
        }
    }
    render() {
        if (this.state.listingDetails) {
            let listingDetails = this.state.listingDetails;
            let { listing } = listingDetails;
            return (React.createElement(View, { style: [styles.shadowBox] },
                React.createElement(ScrollView, { style: {
                        backgroundColor: '#fafafa',
                    } },
                    React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(Carousel, { ref: (c) => { this._carousel = c; }, data: listing.item.images, renderItem: this._renderItem, 
                            // sliderWidth={carouselWidth}
                            sliderWidth: sliderWidth, 
                            // itemWidth={carouselWidth*0.8}
                            itemWidth: itemWidth, onSnapToItem: (index) => this.setState({ activeSlide: index }) }),
                        React.createElement(Pagination, { dotsLength: listing.item.images.length, activeDotIndex: this.state.activeSlide, containerStyle: {
                                backgroundColor: 'rgba(0,0,0,0)',
                                height: 5,
                                position: 'absolute',
                                bottom: 5,
                                left: windowWidth / 2 - 50,
                            }, dotStyle: {
                                width: 5,
                                height: 5,
                                borderRadius: 5,
                                marginHorizontal: 8,
                                backgroundColor: 'rgba(25, 25, 25, 0.92)'
                            }, inactiveDotStyle: {}, inactiveDotOpacity: 0.4, inactiveDotScale: 0.6 })),
                    React.createElement(View, { style: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 10,
                            paddingLeft: 20,
                            paddingBottom: 10,
                            paddingRight: 20,
                        } },
                        React.createElement(View, null,
                            React.createElement(Text, { style: { fontSize: 18 } }, listing.item.title)),
                        React.createElement(View, null,
                            React.createElement(HTMLView, { value: listing.item.description, stylesheet: styles })),
                        React.createElement(View, null,
                            React.createElement(Price, { price: listing.item.price / 100, symbol: '$' }))),
                    React.createElement(View, { style: {
                            flex: 1, flexDirection: 'row', justifyContent: 'center',
                            padding: 10,
                            marginBottom: 10,
                            backgroundColor: '#fafafa',
                        } },
                        React.createElement(Button, { raised: true, icon: { name: 'reply', color: '#222' }, onPress: this.handleGoBack, buttonStyle: {
                                borderColor: '#222',
                                borderRadius: 4,
                                borderWidth: 1,
                                padding: 12,
                                height: 40,
                                backgroundColor: '#fafafa',
                                width: 120,
                            }, textStyle: {
                                textAlign: 'center',
                                color: '#222'
                            }, title: "Store" }),
                        React.createElement(Button, { raised: true, onPress: () => this.handleBuy({ async: 'True', include: '' }), buttonStyle: {
                                borderColor: '#fafafa',
                                borderRadius: 4,
                                padding: 12,
                                height: 40,
                                backgroundColor: '#222',
                                width: 120,
                            }, textStyle: { textAlign: 'center' }, title: "Buy" })),
                    React.createElement(View, { style: { padding: 10 } },
                        React.createElement(Text, { style: { fontWeight: '600' } }, "Quantity"),
                        React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'center' } },
                            React.createElement(Button, { raised: true, onPress: this.decrement, buttonStyle: {
                                    height: 30,
                                    backgroundColor: '#EDEFF2',
                                    width: 30,
                                    margin: 0,
                                    padding: 10,
                                }, textStyle: { textAlign: 'center', color: '#222' }, containerViewStyle: { marginLeft: 0, padding: 0 }, title: "-" }),
                            React.createElement(Button, { disabled: true, onPress: this.decrement, buttonStyle: {
                                    backgroundColor: '#F7F7F7',
                                    height: 30,
                                    width: 40,
                                    margin: 0,
                                    padding: 10,
                                    borderRadius: 2,
                                }, textStyle: { textAlign: 'center', fontSize: 12, color: '#222' }, containerViewStyle: { marginLeft: 0, padding: 0 }, title: `${this.state.quantity}` }),
                            React.createElement(Button, { raised: true, onPress: this.increment, buttonStyle: {
                                    height: 30,
                                    backgroundColor: '#EDEFF2',
                                    width: 30,
                                    margin: 0,
                                    padding: 0,
                                }, containerViewStyle: { marginLeft: 0, padding: 0 }, textStyle: { textAlign: 'center', color: '#222' }, title: "+" }))),
                    listing.item.options.map((option, i) => {
                        let keyName = option.name;
                        return (React.createElement(View, { key: i, style: { margin: 10 } },
                            React.createElement(Text, { style: { fontWeight: '600' } }, option.name),
                            React.createElement(SegmentedControls, { tint: "#222", backTint: "#f1f1f1", options: option.variants.map(v => v.name), 
                                // options={ options }
                                onSelection: (selectedOption) => this.setSelectedOption(selectedOption, keyName), selectedOption: this.state[keyName], 
                                // onSelection={(selectedOption) => this.setState({ [option.name]: selectedOption })}
                                // selectedOption={ this.state[option.name] }
                                optionContainerStyle: { flex: 1, borderRadius: 0 }, containerBorderRadius: 0 })));
                    }),
                    ((this.props.isLoading)
                        ? React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 } },
                            React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, ('Finding Moderators...')),
                            React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                        : React.createElement(View, null)),
                    this.renderModerators(),
                    React.createElement(View, { style: { flex: 1 } },
                        React.createElement(JSONTree, { data: this.props.moderators })))));
        }
        else {
            return (React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 } },
                React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, "Loading Listing Pics..."),
                React.createElement(ActivityIndicator, { color: "#222", animating: true })));
        }
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
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
    title: {},
    slide: {
        width: itemWidth,
    },
    // just for inline html rendering
    a: {
        fontWeight: '300',
        color: '#FF3366',
    },
    div: {
        fontWeight: '300',
        color: '#666',
    }
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        browsedListings: state.reduxOB1.browsedListings,
        auth64: state.reduxLogin.auth64,
        moderators: state.reduxOB1.moderators,
        following: state.reduxOB1.following,
        isLoading: state.reduxLogin.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setScrollY: ({ scrollY }) => dispatch(Actions.OB1.SET_SCROLL_Y(scrollY)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
        getModerators: ({ auth64, async, include }) => dispatch(Actions.OB1.INIT_GET_MODERATORS({ auth64, async, include })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Listing);
//# sourceMappingURL=index.js.map