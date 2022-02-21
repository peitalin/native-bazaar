import * as React from 'react';
import { Component } from 'react';
import { Text, View, Dimensions, StyleSheet, } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
const windowWidth = Dimensions.get('window').width;
class LoginEdit extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            name: '',
            IPAddress: '',
            port: '',
            username: '',
            password: '',
        };
        this.handleUsername = (event) => {
            this.setState({ username: event });
        };
        this.handleIPAddress = (event) => {
            this.setState({ IPAddress: event });
        };
        this.handlePort = (event) => {
            this.setState({ port: event });
        };
        this.handleName = (event) => {
            this.setState({ name: event });
        };
        this.handlePassword = (event) => {
            this.setState({ password: event });
        };
        this.isValidAccount = () => {
            return (this.state.password === this.state.password) &&
                (this.state.password.length > 0) &&
                (this.state.IPAddress.includes('.')) &&
                (this.state.username !== '');
        };
    }
    render() {
        return (React.createElement(View, { style: {
                flex: 1, justifyContent: 'center', alignItems: 'center',
                backgroundColor: '#fff',
            } },
            React.createElement(Text, { style: { margin: 10, fontSize: 16, fontWeight: '600' } }, "Custom Login Settings"),
            React.createElement(View, { style: { width: windowWidth * 0.8 } },
                React.createElement(FormInput, { containerStyle: {
                        backgroundColor: '#F2F2F2',
                        borderWidth: 1, borderColor: "#DDD", borderBottomColor: "#DDD",
                        height: 32,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                    }, inputStyle: { marginLeft: 5, fontSize: 14, textAlign: 'center' }, placeholder: 'Name', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handleName, value: this.state.name })),
            React.createElement(View, { style: { flexDirection: 'row', width: '80%' } },
                React.createElement(View, { style: { flex: 2 } },
                    React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handleIPAddress, value: this.state.IPAddress, placeholder: 'IP Address' })),
                React.createElement(View, { style: { flex: 1, marginLeft: -35 } },
                    React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handlePort, value: this.state.port, placeholder: 'Port' }))),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, placeholder: 'Username', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handleUsername, value: this.state.username })),
            React.createElement(View, { style: { width: '80%' } },
                React.createElement(FormInput, { containerStyle: styles.formFieldContainer, inputStyle: styles.formFieldTextInput, placeholder: 'Password', maxLength: 80, autoCapitalize: 'none', autoCorrect: false, onChangeText: this.handlePassword, value: this.state.password }),
                ((this.state.password !== this.state.password) &&
                    React.createElement(FormValidationMessage, null, "Invalid passwords. Check that passwords match."))),
            React.createElement(Button, { onPress: () => alert("Creating an Open Bazaar Account (not implemented)"), buttonStyle: {
                    backgroundColor: '#222',
                    width: Dimensions.get('window').width * 0.7,
                    height: 40,
                    borderRadius: 2,
                    marginTop: 10,
                    paddingTop: 5, paddingBottom: 5
                }, textStyle: { textAlign: 'center' }, title: "Connect" })));
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
    };
};
const mapStateToProps = (state) => {
    return {
        username: state.reduxLogin.username,
        password: state.reduxLogin.password,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginEdit);
//# sourceMappingURL=LoginEdit.js.map