import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text, View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import StoreFront from '../store/storefront';
class Followers extends Component {
    constructor() {
        super(...arguments);
        this.handleScroll = (event) => {
            let { y } = event.nativeEvent.contentOffset;
            this.props.setScrollY({ scrollY: y });
        };
        this.hasFollowers = () => {
            this.props.followers.length > 0;
        };
    }
    componentWillMount() {
        // get the peers of whoever browsedProfile we're looking at
        this.props.getFollowersProfiles({ peerId: this.props.browsedProfile.peerID });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.browsedProfile.peerID !== prevProps.browsedProfile.peerID) {
            this.props.clearFollowersProfiles();
            // if the browsedProfile changes, i.e. browing followers' stores,
            // then we need to reload the followers
            this.props.getFollowersProfiles({ peerId: this.props.browsedProfile.peerID });
        }
    }
    render() {
        return (React.createElement(View, { style: [styles.shadowBox, styles.container] },
            React.createElement(ScrollView, { ref: (scrollView) => { this._scrollView = scrollView; }, onScroll: this.handleScroll, scrollEventThrottle: 1 },
                React.createElement(View, null, ((this.props.isLoading)
                    ? React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10 } },
                        React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, "Loading Followers..."),
                        React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                    : React.createElement(View, null))),
                (!this.hasFollowers() && !this.props.isLoading &&
                    React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 10 } },
                        React.createElement(Text, null, "No Followers Found."))),
                (this.props.followers &&
                    this.props.followers.map(profile => {
                        return (React.createElement(StoreFront, { key: profile.peerID, profile: profile, auth64: this.props.auth64, isMyStore: false }));
                    })))));
    }
}
Followers.defaultProps = {
    isLoading: true,
};
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 507,
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
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        followers: state.reduxOB1.followers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearFollowersProfiles: () => dispatch(Actions.OB1.CLEAR_FOLLOWERS()),
        getFollowersProfiles: ({ peerId }) => dispatch(Actions.OB1.INIT_GET_FOLLOWERS({ peerId })),
        setScrollY: ({ scrollY }) => dispatch(Actions.OB1.SET_SCROLL_Y(scrollY)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
//# sourceMappingURL=followers.js.map