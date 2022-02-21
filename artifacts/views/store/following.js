import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Text, View, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import StoreFront from '../store/storefront';
class Following extends Component {
    constructor() {
        super(...arguments);
        this.handleScroll = (event) => {
            let { y } = event.nativeEvent.contentOffset;
            this.props.setScrollY({ scrollY: y });
        };
        this.handleScrollToTop = () => {
            alert('going to the top');
            this.props.setScrollY({ scrollY: -121 });
            // -121 scrollY triggers scrollToTop on parent ScrollView
        };
    }
    componentWillMount() {
        // get the peers of whoever browsedProfile we're looking at
        this.props.getFollowingProfiles({ peerId: this.props.browsedProfile.peerID });
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.browsedProfile.peerID !== prevProps.browsedProfile.peerID) {
            this.props.clearFollowingProfiles();
            // if the browsedProfile changes, i.e. browing followers' stores,
            // then we need to reload the followers
            this.props.getFollowingProfiles({ peerId: this.props.browsedProfile.peerID });
        }
    }
    render() {
        return (React.createElement(View, { style: [styles.shadowBox, styles.container] },
            React.createElement(ScrollView, { ref: (scrollView) => { this._scrollView = scrollView; }, onScroll: this.handleScroll, scrollEventThrottle: 1 },
                React.createElement(View, null, ((this.props.isLoading)
                    ? React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10 } },
                        React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, "Loading Followed Users..."),
                        React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                    : React.createElement(View, null))),
                (this.props.following &&
                    this.props.following.map((profile, i) => {
                        return (React.createElement(StoreFront, { key: i, scrollToTopOnPress: true, profile: profile, auth64: this.props.auth64, isMyStore: false }));
                    })),
                ((this.props.following.length < 4) &&
                    React.createElement(View, { style: { height: 120 } })))));
    }
}
Following.defaultProps = {
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
        following: state.reduxOB1.following
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        clearFollowingProfiles: () => dispatch(Actions.OB1.CLEAR_FOLLOWING()),
        getFollowingProfiles: ({ peerId }) => dispatch(Actions.OB1.INIT_GET_FOLLOWING(peerId)),
        setScrollY: ({ scrollY }) => dispatch(Actions.OB1.SET_SCROLL_Y(scrollY)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Following);
//# sourceMappingURL=following.js.map