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
import { Text, View, Dimensions, StyleSheet, } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
// API requests
import { ob1API } from '../../redux/requests';
const windowWidth = Dimensions.get('window').width;
class LoginDefault extends Component {
    constructor() {
        super(...arguments);
        this.handleUsername = (event) => {
            this.props.updateUsername({ username: event });
        };
        this.handlePassword = (event) => {
            this.props.updatePassword({ password: event });
        };
        this.onLongPressButton = () => __awaiter(this, void 0, void 0, function* () {
            let data = yield ob1API.listings.getObListingsSlug({
                auth64: this.props.auth64,
                peerId: this.props.profile.peerID,
                slug_or_listingHash: 'vintage-dress-digital-options',
            });
        });
        this.onPressButton = () => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.props.getProfile({
                username: this.props.username,
                password: this.props.password,
            });
            this.props.updateProfile({ profile: { name: data } });
        });
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff',
            } },
            React.createElement(View, { style: {
                    flex: 3,
                    width: '80%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#D6D6D6',
                    paddingBottom: 20,
                } },
                React.createElement(View, { style: {
                        marginTop: 40,
                        paddingTop: 10,
                        paddingBottom: 10,
                        width: '100%',
                        alignItems: 'center',
                        backgroundColor: '#f2f2f2',
                        borderWidth: 1,
                        borderColor: '#D5D5D5',
                        borderRadius: 2,
                    } },
                    React.createElement(Text, { style: { fontWeight: '500', fontSize: 16, color: '#3B3E49' } }, "Login: Vintage Fashion")),
                React.createElement(View, { style: {
                        flex: 1,
                        marginTop: 10,
                        alignItems: 'center',
                    } },
                    React.createElement(Button, { raised: true, onPress: this.onPressButton, onLongPress: this.onLongPressButton, buttonStyle: { backgroundColor: '#222', width: windowWidth * 0.8, borderRadius: 2 }, textStyle: { textAlign: 'center' }, title: "Connect" }))),
            React.createElement(View, { style: {
                    flex: 2,
                    marginTop: 20,
                    alignItems: 'center',
                    width: '100%',
                } },
                React.createElement(View, { style: { width: '80%' } },
                    React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, maxLength: 80, autoCapitalize: 'none', autoCorrect: false, value: this.props.username, onChangeText: this.handleUsername, placeholder: 'Username' })),
                React.createElement(View, { style: { width: '80%' } },
                    React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, maxLength: 80, autoCapitalize: 'none', autoCorrect: false, value: this.props.password, onChangeText: this.handlePassword, placeholder: 'Password' })))));
    }
}
const styles = StyleSheet.create({
    formFieldContainer: {
        backgroundColor: '#F2F2F2',
        borderWidth: 1,
        borderColor: "#DDD",
        borderBottomColor: "#DDD",
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    formFieldTextInput: {
        marginLeft: 5,
        width: '100%',
        fontSize: 14,
        textAlign: 'center',
    },
});
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile: (payload) => dispatch(Actions.OB1.INIT_GET_OB_PROFILE(payload)),
        updateProfile: ({ profile }) => dispatch(Actions.OB1.PATCH_OB_PROFILE(profile)),
        updateUsername: ({ username }) => dispatch(Actions.Login.UPDATE_USERNAME(username)),
        updatePassword: ({ password }) => dispatch(Actions.Login.UPDATE_PASSWORD(password)),
    };
};
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile,
        auth64: state.reduxLogin.auth64,
        username: state.reduxLogin.username,
        password: state.reduxLogin.password,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginDefault));
//# sourceMappingURL=LoginDefault.js.map