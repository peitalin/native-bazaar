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
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
class Signup extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            username: 'peita-',
            email: 'peita@',
            password: 'password',
            passwordConfirm: 'password'
        };
        this.handleUsername = (event) => {
            this.setState({ username: event });
        };
        this.handleEmail = (event) => {
            this.setState({ email: event });
        };
        this.handlePassword = (event) => {
            this.setState({ password: event });
        };
        this.handlePasswordConfirm = (event) => {
            this.setState({ passwordConfirm: event });
        };
        this.isValidAccount = () => {
            return (this.state.password === this.state.passwordConfirm) &&
                (this.state.password.length > 0) &&
                (this.state.email.includes('@') && this.state.email.includes('.')) &&
                (this.state.username !== '');
        };
        this.registerAccount = () => __awaiter(this, void 0, void 0, function* () {
            let { username, email, password, passwordConfirm } = this.state;
            if (this.isValidAccount()) {
                // register account first
                let regRes = yield this.props.registerOb1Account({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.passwordConfirm,
                });
            }
            else {
                alert("Can't have empty details.");
            }
        });
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff',
            } },
            React.createElement(Text, { style: { margin: 10, fontSize: 16, fontWeight: '600' } }, "Signup to OB1"),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, maxLength: 80, placeholder: 'Username', autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handleUsername, value: this.state.username })),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, placeholder: 'Email', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handleEmail, value: this.state.email }),
                (((this.state.email.length > 6) &&
                    (!this.state.email.includes('@') || !this.state.email.includes('.'))) &&
                    React.createElement(FormValidationMessage, null, "Invalid email."))),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, placeholder: 'Password', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handlePassword, value: this.state.password })),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, placeholder: 'Password Confirm', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handlePasswordConfirm, value: this.state.passwordConfirm }),
                ((this.state.passwordConfirm.length > 4 && this.state.password !== this.state.passwordConfirm) &&
                    React.createElement(FormValidationMessage, null, "Invalid passwords. Check that passwords match."))),
            React.createElement(Button, { onPress: this.registerAccount, buttonStyle: {
                    backgroundColor: '#222',
                    width: Dimensions.get('window').width * 0.7,
                    height: 40,
                    borderRadius: 2,
                    marginTop: 10,
                    paddingTop: 5, paddingBottom: 5
                }, textStyle: { textAlign: 'center' }, title: this.isValidAccount() ? "Register" : "Enter Details" })));
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
        updateUsername: ({ username }) => dispatch(Actions.Login.UPDATE_USERNAME(username)),
        updatePassword: ({ password }) => dispatch(Actions.Login.UPDATE_PASSWORD(password)),
        registerOb1Account: ({ username, email, password, password_confirmation }) => dispatch(Actions.OB1.INIT_REGISTER_OB_PROFILE({ username, email, password, password_confirmation })),
    };
};
const mapStateToProps = (state) => {
    return {
        username: state.reduxLogin.username,
        password: state.reduxLogin.password,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
//# sourceMappingURL=Signup.js.map