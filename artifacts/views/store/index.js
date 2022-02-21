import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Dimensions, View, ScrollView, } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { Tabs, Tab } from 'react-router-navigation';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { APIgatewayURL } from '../../redux/requests';
import Listings from './listings';
import StoreAbout from './about';
import Following from './following';
import Followers from './followers';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class Store extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            tabBarTop: false,
        };
        this.handleSell = () => {
            this.props.updateRouteName({
                routeName: 'Create Listing',
                routeURL: `/createlisting/${this.props.profile.peerID}`
            });
        };
    }
    componentWillMount() {
        if (this.props.browsedListings.length < 1) {
            this.props.initGetListings({ peerId: this.props.browsedProfile.peerID });
        }
        // TEMPORARY FOR DEV ONLY, SPEED THINGS UP SO
        // I DON"T HAVE TO WAIT FOR LISTINGS REQUEST EVERYTIME"
        // odd.... sometimes takes a long time to make request
        // even on localhost, when it should be near instant
    }
    componentWillUnmount() {
        this.props.setBrowsedListings({ browsedListings: [] });
    }
    componentDidUpdate(prevProps, prevState) {
        let isMyStore = this.props.browsedProfile.peerID === this.props.profile.peerID; // user's profile
        let scrollDistance = isMyStore ? 286 : 216;
        let scrollThreshold = 50;
        /////// ALTERNATIVE SCROLL ANIMATION
        // if (this.props.scrollY > scrollThreshold) {
        //   this._scrollViewParent.scrollTo({ y: scrollDistance, animated: true })
        // }
        // if (this.props.scrollY < -scrollThreshold) {
        //   this._scrollViewParent.scrollTo({ y: 0, animated: true })
        // }
        if (prevProps.scrollY !== this.props.scrollY) {
            if (this.props.scrollY * 2 < scrollDistance) {
                this._scrollViewParent.scrollTo({ y: this.props.scrollY * 2, animated: false });
                // this.setState({ tabBarTop: false })
            }
            else {
                this._scrollViewParent.scrollTo({ y: scrollDistance, animated: false });
                // this.setState({ tabBarTop: true })
            }
        }
        if (this.props.browsedProfile.peerID !== prevProps.browsedProfile.peerID) {
            this.props.setBrowsedListings({ browsedListings: [] });
            // if the browsedProfile changes, i.e. browsing followers' stores,
            // then we need to reload the listings
            this.props.initGetListings({ peerId: this.props.browsedProfile.peerID });
        }
    }
    render() {
        let { browsedProfile, profile, } = this.props;
        // pass in state from <Link to={{ to: '/store/peerID', state={state} }}>
        // see <StoreFront/> component
        let bannerHeight = 140;
        let bannerURI = browsedProfile.headerHashes.original
            ? `${APIgatewayURL}/ob/images/${browsedProfile.headerHashes.original}`
            : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg';
        let isMyStore = browsedProfile.peerID === profile.peerID; // user's profile
        return (React.createElement(ScrollView, { style: [styles.container], ref: (scrollView) => { this._scrollViewParent = scrollView; } },
            React.createElement(View, { style: {
                    flex: 1,
                    backgroundColor: '#f1f1f1',
                    borderBottomColor: lightGrey,
                    borderBottomWidth: 1,
                } },
                React.createElement(View, { style: [styles.shadowBox, styles.storeContainer] },
                    React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'center' } },
                        React.createElement(FastImage, { source: {
                                uri: bannerURI,
                                method: 'GET',
                            }, style: {
                                position: 'absolute',
                                borderRadius: 0,
                                width: '100%',
                                height: bannerHeight,
                                top: 0,
                            } }),
                        React.createElement(View, { style: {
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: bannerHeight,
                                backgroundColor: 'rgba(0,0,0,0)',
                                borderWidth: 1,
                                borderTopWidth: 0,
                                borderColor: mediumGrey,
                            } }, ((browsedProfile.handle.length > 0) &&
                            React.createElement(View, { style: {
                                    backgroundColor: 'rgba(250, 250, 250, 0.8)',
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    borderWidth: 1,
                                    borderColor: '#222',
                                } },
                                React.createElement(Text, { style: { fontSize: 20, fontFamily: 'futura', color: '#222' } },
                                    (`${browsedProfile.handle}'s`),
                                    " Store"))))),
                    React.createElement(View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 } },
                        React.createElement(Avatar, { rounded: true, medium: true, overlayContainerStyle: { backgroundColor: '#aaa' }, containerStyle: { marginTop: 0 }, avatarStyle: { borderWidth: 1, borderColor: lightGrey }, source: { uri: `${APIgatewayURL}/ob/images/${browsedProfile.avatarHashes.original}` }, title: browsedProfile.name }),
                        React.createElement(View, { style: { width: 10 } }),
                        React.createElement(View, { style: { width: 10, flex: 1, flexDirection: 'column' } },
                            React.createElement(Text, null, browsedProfile.name),
                            React.createElement(Text, { style: { color: mediumGrey } }, browsedProfile.handle),
                            React.createElement(Text, { style: { color: mediumGrey } }, browsedProfile.location)))),
                (isMyStore &&
                    React.createElement(View, { style: [styles.shadowBox, {
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: windowWidth,
                                padding: 10,
                                backgroundColor: '#fff',
                                borderTopWidth: 1,
                                borderColor: mediumGrey,
                            }] },
                        React.createElement(Text, null, "What do you want to sell?"),
                        React.createElement(Button, { raised: true, icon: { name: 'send' }, onPress: this.handleSell, onLongPress: () => alert("Long Pressed"), buttonStyle: {
                                backgroundColor: '#222',
                                borderRadius: 4,
                                padding: 16,
                                height: 40,
                                width: 120,
                            }, textStyle: { textAlign: 'center' }, title: "Sell" }))),
                React.createElement(Tabs, { labelStyle: {
                        color: !this.state.tabBarTop ? '#222' : '#f6f6f6',
                    }, tabBarStyle: [{
                            backgroundColor: !this.state.tabBarTop ? '#fafafa' : '#333',
                            // backgroundColor: '#222',
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: mediumGrey,
                        }], tabBarIndicatorStyle: { backgroundColor: !this.state.tabBarTop ? '#222' : '#f6f6f6' }, lazy: true },
                    React.createElement(Tab, { path: "/store", label: 'Store', component: () => {
                            return (React.createElement(Listings, { listings: this.props.browsedListings, isLoading: this.props.isLoading }));
                        } }),
                    React.createElement(Tab, { path: "/about", label: 'About', component: () => {
                            return (React.createElement(StoreAbout, { profile: this.props.browsedProfile, isLoading: this.props.isLoading }));
                        } }),
                    React.createElement(Tab, { path: "/following", label: 'Following', component: () => {
                            return (React.createElement(Following, { auth64: this.props.auth64, isMyStore: isMyStore, browsedProfile: this.props.browsedProfile, isLoading: this.props.isLoading }));
                        } }),
                    React.createElement(Tab, { path: "/followers", label: 'Followers', component: () => {
                            return (React.createElement(Followers, { auth64: this.props.auth64, isMyStore: isMyStore, browsedProfile: this.props.browsedProfile, isLoading: this.props.isLoading }));
                        } })))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1f1f1',
    },
    listItem: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        height: 40,
    },
    listItemTitle: {
        color: '#222',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 0,
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
    storeContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 0,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: mediumGrey,
    }
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        browsedProfile: state.reduxOB1.browsedProfile,
        browsedListings: state.reduxOB1.browsedListings,
        profile: state.reduxOB1.profile,
        auth64: state.reduxLogin.auth64,
        isLoading: state.reduxLogin.isLoading,
        scrollY: state.reduxOB1.scrollY,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setBrowsedListings: ({ browsedListings }) => dispatch(Actions.OB1.SET_BROWSED_LISTINGS(browsedListings)),
        initGetListings: ({ peerId }) => dispatch(Actions.OB1.INIT_GET_LISTINGS({ peerId })),
        updateIsLoading: ({ isLoading }) => dispatch(Actions.Login.IS_LOADING(isLoading)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
//# sourceMappingURL=index.js.map