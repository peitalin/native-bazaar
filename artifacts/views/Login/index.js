import * as React from 'react';
import { Component } from 'react';
import { Text, View, ActivityIndicator, Dimensions, StyleSheet, } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
import LoginDefault from './LoginDefault';
import LoginEdit from './LoginEdit';
import Signup from './Signup';
import Swiper from 'react-native-swiper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class Login extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            swiperPage: 'login',
            swiperPageLookup: {
                0: 'login',
                1: 'login-edit',
                2: 'signup',
            },
        };
        this.handleUsername = (event) => {
            this.props.updateUsername({ username: event });
        };
        this.handlePassword = (event) => {
            this.props.updatePassword({ password: event });
        };
        this.handleLogin = ({ routeName, routeURL }) => {
            if (this.state.swiperPage === 'login-edit') {
                this.swiper.scrollBy(-1);
            }
            if (this.state.swiperPage === 'signup') {
                this.swiper.scrollBy(1);
            }
            this.setState({ swiperPage: 'login' });
        };
        this.handleLoginEdit = ({ routeName, routeURL }) => {
            if (this.state.swiperPage === 'login') {
                this.swiper.scrollBy(1);
            }
            if (this.state.swiperPage === 'signup') {
                this.swiper.scrollBy(-1);
            }
            this.setState({ swiperPage: 'login-edit' });
        };
        this.handleSignup = ({ routeName, routeURL }) => {
            if (this.state.swiperPage === 'login') {
                this.swiper.scrollBy(-1);
            }
            if (this.state.swiperPage === 'login-edit') {
                this.swiper.scrollBy(1);
            }
            this.setState({ swiperPage: 'signup' });
        };
        this.onMomentumScrollEnd = (e, state, context) => {
            this.setState({
                swiperPage: this.state.swiperPageLookup[state.index]
            });
        };
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1, flexDirection: 'column', justifyContent: 'space-around',
                backgroundColor: '#f6f6f6',
            } },
            React.createElement(View, { style: [styles.shadowBox, {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200,
                        paddingTop: 40,
                        zIndex: 5,
                    }] },
                React.createElement(Text, { style: { fontSize: 64, fontWeight: '800', fontFamily: 'Futura-Medium' } }, "OB1"),
                (this.props.isLoading
                    ? React.createElement(View, null,
                        React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#999' } }, (`Loading... ${this.props.APIgatewayURL}`)),
                        React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                    : React.createElement(View, { style: { height: 40 } }))),
            React.createElement(View, { style: [styles.shadowBox, {
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderColor: '#d5d5d5',
                        backgroundColor: '#fff',
                        marginTop: -5,
                    }] },
                React.createElement(Swiper, { width: windowWidth, height: windowHeight * 0.4, showsPagination: false, ref: (component) => { this.swiper = component; }, onMomentumScrollEnd: this.onMomentumScrollEnd },
                    React.createElement(LoginDefault, null),
                    React.createElement(LoginEdit, null),
                    React.createElement(Signup, null))),
            React.createElement(View, { style: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 20, paddingBottom: 0 } },
                ((this.state.swiperPage !== 'login') &&
                    React.createElement(Button, { onPress: this.handleLogin, containerViewStyle: {
                            borderRadius: 50,
                            overflow: 'hidden',
                        }, buttonStyle: { backgroundColor: '#fff', width: 150,
                            borderRadius: 50, borderColor: '#222', borderWidth: 2,
                            paddingTop: 5, paddingBottom: 5,
                        }, textStyle: { textAlign: 'center', color: '#222', fontSize: 14 }, title: "Login", underlayColor: '#666' })),
                ((this.state.swiperPage !== 'login-edit') &&
                    React.createElement(Button, { onPress: this.handleLoginEdit, containerViewStyle: {
                            borderRadius: 50,
                            overflow: 'hidden',
                        }, buttonStyle: {
                            backgroundColor: '#fff', width: 150,
                            borderRadius: 50, borderColor: '#222', borderWidth: 2,
                            paddingTop: 5, paddingBottom: 5,
                        }, textStyle: { textAlign: 'center', color: '#222', fontSize: 14 }, title: "Edit Login", underlayColor: '#666' })),
                ((this.state.swiperPage !== 'signup') &&
                    React.createElement(Button, { onPress: this.handleSignup, containerViewStyle: {
                            borderRadius: 50,
                            overflow: 'hidden',
                        }, buttonStyle: { backgroundColor: '#fff', width: 150,
                            borderRadius: 50, borderColor: '#222', borderWidth: 2,
                            paddingTop: 5, paddingBottom: 5,
                        }, textStyle: { textAlign: 'center', color: '#222', fontSize: 14 }, title: "Signup to OB1", underlayColor: '#666' }))),
            React.createElement(Text, { style: { color: '#aaa', fontSize: 14, paddingTop: 10, paddingBottom: 10, textAlign: 'center' } }, "Clear saved logins?")));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5dCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: '#BB4959',
        marginTop: 20,
        transform: [
            { scale: 2 },
        ]
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },
    shadowBox: {
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
    }
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile,
        username: state.reduxLogin.username,
        password: state.reduxLogin.password,
        routeName: state.reduxRouter.routeName,
        routeURL: state.reduxRouter.routeURL,
        isLoading: state.reduxLogin.isLoading,
        APIgatewayURL: state.reduxLogin.APIgatewayURL,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: () => dispatch(Actions.OB1.INIT_GET_OB_PROFILE()),
        updateProfile: ({ profile }) => dispatch(Actions.OB1.PATCH_OB_PROFILE(profile)),
        updateRouteName: ({ routeName, routeURL }) => dispatch(Actions.Router.UPDATE_ROUTE_NAME({ routeName, routeURL })),
        updateUsername: ({ username }) => dispatch(Actions.Login.UPDATE_USERNAME(username)),
        updatePassword: ({ password }) => dispatch(Actions.Login.UPDATE_PASSWORD(password)),
        updateIsLoading: ({ isLoading }) => dispatch(Actions.Login.IS_LOADING(isLoading)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
//# sourceMappingURL=index.js.map