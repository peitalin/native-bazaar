import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
import { Tabs, Tab } from 'react-router-navigation';
import Announcements from './announcements';
import Channel from './channel';
class HomePage extends Component {
    render() {
        return (React.createElement(Tabs, { labelStyle: { color: '#222' }, tabBarStyle: [{
                    backgroundColor: '#f6f6f6',
                    borderBottomWidth: 1,
                    borderBottomColor: mediumGrey,
                }], tabBarIndicatorStyle: { backgroundColor: '#222' } },
            React.createElement(Tab, { path: "/", label: "Channel", component: Channel }),
            React.createElement(Tab, { path: "/announcements", label: "Announcements", component: Announcements })));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    heading: {
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
    },
    block: {
        paddingTop: 5,
        paddingBottom: 5,
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
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(Actions.OB1.INIT_GET_OB_PROFILE()),
        updateProfile: ({ profile }) => dispatch(Actions.OB1.PATCH_OB_PROFILE(profile)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
        updateIsLoading: ({ isLoading }) => dispatch(Actions.Login.IS_LOADING(isLoading)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
//# sourceMappingURL=index.js.map