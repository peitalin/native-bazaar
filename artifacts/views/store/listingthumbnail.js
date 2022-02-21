import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableHighlight, View, Dimensions, } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { APIgatewayURL } from '../../redux/requests';
import Price from '../../components/Price';
import StarRating from 'react-native-star-rating';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// clickable listings thumbnail
class ListingThumbnail extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            rating: 0
        };
        this.handleExamineListing = () => {
            this.props.updateRouteName({
                routeName: 'Listing',
                routeURL: `/listing/${this.props.browsedProfile.peerID}/${this.props.listing.slug}`
                // remember, in index.ios.tsx, the route params are /listing/:peerID/:slug
            });
        };
        this.onStarRatingPress = (rating) => {
            this.setState({
                rating: rating
            });
        };
        this.formatPhysicalGoods = (goods) => {
            return goods.replace('_', ' ').toLowerCase();
        };
    }
    componentWillMount() {
        this.setState({ rating: this.props.listing.averageRating });
    }
    render() {
        let { listing } = this.props;
        return (React.createElement(View, { style: [styles.shadowBox, {
                    backgroundColor: white
                }] },
            React.createElement(TouchableHighlight, { onPress: this.handleExamineListing, underlayColor: linkUnderlayColor },
                React.createElement(View, { style: [{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            padding: 5,
                        }] },
                    React.createElement(View, { style: [{ flex: 2, margin: 5 }] }, (listing.thumbnail &&
                        React.createElement(FastImage, { source: {
                                uri: `${APIgatewayURL}/ob/images/${listing.thumbnail.small}`,
                                method: 'GET',
                            }, style: {
                                borderRadius: 0,
                                borderWidth: 1,
                                borderColor: lightGrey,
                                width: 120,
                                height: 120,
                            } }))),
                    React.createElement(View, { style: { flex: 4, flexDirection: 'column', justifyContent: 'space-between', margin: 4 } },
                        React.createElement(Text, { style: { fontWeight: '600', fontSize: 16, margin: 4 } }, listing.title),
                        React.createElement(View, { style: { margin: 4 } },
                            React.createElement(Price, { price: listing.price.amount / 100, symbol: listing.price.currencyCode + ' $' }),
                            React.createElement(Text, { style: {
                                    fontWeight: '600',
                                    fontSize: 12,
                                    color: mediumGrey,
                                } }, this.formatPhysicalGoods(listing.contractType))),
                        React.createElement(View, { style: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' } },
                            React.createElement(StarRating, { disabled: false, maxStars: 5, emptyStar: 'ios-star-outline', fullStar: 'ios-star', halfStar: 'ios-star-half', iconSet: 'Ionicons', starSize: 18, rating: this.state.rating, selectedStar: (rating) => this.onStarRatingPress(rating) }),
                            React.createElement(Text, { style: { fontWeight: '400', fontSize: 12 } }, (`${listing.ratingCount} ratings`))))))));
    }
}
ListingThumbnail.defaultProps = {
    listing: {}
};
const white = '#fff';
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
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        browsedProfile: state.reduxOB1.browsedProfile
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListingThumbnail);
//# sourceMappingURL=listingthumbnail.js.map