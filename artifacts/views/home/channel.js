import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView, Dimensions, ActivityIndicator, } from 'react-native';
import { ListItem, Icon, } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
const windowWidth = Dimensions.get('window').width;
import StoreFront from '../store/storefront';
class Channel extends Component {
    constructor() {
        super(...arguments);
        this.goToStore = ({ peerID }) => {
            this.props.updateRouteName({
                routeName: 'Store',
                routeURL: `/store/${peerID}`,
            });
        };
    }
    componentWillMount() {
        // load up connected peers
        // http://{{url}}:{{port}}/ob/peers
        // use those peerIds and then map them to userProfile requests
        // -> now we have a bunch of stores to browse.
        // setTimeout(() => {
        //   this.props.getObPeerProfiles({ auth64: this.props.auth64 })
        // }, 0)
        if (this.props.peerProfiles.length < 1) {
            // this.props.getObPeerProfiles({ auth64: this.props.auth64 })
            // add 0ms delay before requesting profiles
            // Workaround, OTHERWISE ERROR??
            setTimeout(() => {
                // this.props.getObPeerProfiles({ auth64: this.props.auth64 })
                // SLOW AS FUCK... which congests all following requests
                // redux-saga FORK is not working as expected???!
            }, 0);
        }
    }
    render() {
        return (React.createElement(ScrollView, { style: [styles.container] },
            React.createElement(View, { style: {
                    backgroundColor: '#fff',
                    borderBottomColor: '#f1f1f1',
                    borderBottomWidth: 1,
                    flex: 1,
                    justifyContent: 'flex-end',
                } },
                React.createElement(StoreFront, { profile: this.props.profile, auth64: this.props.auth64, isMyStore: true, storeTitle: 'Manage My Store' })),
            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: 'Collections' }),
            React.createElement(CategoryBelt, null),
            React.createElement(View, { style: {
                    flex: 1,
                    borderBottomColor: '#f1f1f1',
                    borderBottomWidth: 1,
                } },
                ((this.props.isLoading)
                    ? React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 } },
                        React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, (`Loading Peer Stores...`)),
                        React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                    : React.createElement(View, null)),
                (this.props.peerProfiles &&
                    this.props.peerProfiles.map((profile, i) => {
                        return (React.createElement(StoreFront, { key: profile.peerID + i, profile: profile, auth64: this.props.auth64, isMyStore: false }));
                    })))));
    }
}
const CategoryBelt = (props) => {
    return (React.createElement(ScrollView, { horizontal: true, style: {
            flexDirection: 'row', padding: 10,
            borderBottomWidth: 1, borderBottomColor: lightGrey, backgroundColor: '#f6f6f6',
            height: 100,
        } },
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Electronics"),
            React.createElement(Icon, { name: 'memory', color: '#F99575', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Pets"),
            React.createElement(Icon, { name: 'pets', color: '#D93A92', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Computers"),
            React.createElement(Icon, { name: 'mouse', color: '#4A96B2', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Mobiles"),
            React.createElement(Icon, { name: 'phone-iphone', color: '#FFAF01', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Watches"),
            React.createElement(Icon, { name: 'watch', color: '#5A4BA2', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Tools"),
            React.createElement(Icon, { name: 'build', color: '#01B788', reverse: true })),
        React.createElement(View, { style: { flexDirection: 'column' } },
            React.createElement(Text, { style: { textAlign: 'center' } }, "Gear"),
            React.createElement(Icon, { name: 'settings', color: '#F99575', reverse: true })),
        React.createElement(View, { style: { width: 20 } })));
};
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile,
        password: state.reduxLogin.password,
        username: state.reduxLogin.username,
        auth64: state.reduxLogin.auth64,
        peerProfiles: state.reduxOB1.peerProfiles,
        isLoading: state.reduxLogin.isLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (payload) => dispatch(Actions.OB1.INIT_GET_OB_PROFILE(payload)),
        getObPeerProfiles: (payload) => dispatch(Actions.OB1.INIT_GET_OB_PEER_PROFILES(payload)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
        updateIsLoading: ({ isLoading }) => dispatch(Actions.Login.IS_LOADING(isLoading)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Channel));
//# sourceMappingURL=channel.js.map