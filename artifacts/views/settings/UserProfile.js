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
import { StyleSheet } from 'react-native';
import { Alert, Text, TextInput, TouchableHighlight, View, ScrollView, } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import FastImage from 'react-native-fast-image';
import { APIgatewayURL } from '../../redux/requests';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import UserProfileField from '../../components/UserProfileField';
class UserProfile extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            editShortDescription: false,
            profile: {},
        };
        this.handleClickShortDescription = () => {
            this.setState({ editShortDescription: !this.state.editShortDescription });
        };
        this.onChangeText = ({ profile }) => {
            this.setState({ profile: profile });
        };
        this.handlePress = () => {
            this.props.history.goBack();
        };
        this.handleSave = () => __awaiter(this, void 0, void 0, function* () {
            if (this.state.profile.handle.length > 7) {
                alert('cannot have handle longer than 8 characters');
            }
            yield this.props.postUserProfile({
                body: this.state.profile,
                auth64: this.props.auth64,
            });
            this.handlePress();
        });
    }
    componentWillMount() {
        if (this.props.profile) {
            this.setState({
                profile: this.props.profile
            });
        }
    }
    render() {
        let profile = this.props.profile;
        let bannerHeight = 140;
        let bannerURI = profile.headerHashes
            ? `${APIgatewayURL}/ob/images/${profile.headerHashes.original}`
            : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg';
        let avatarURI = profile.avatarHashes
            ? `${APIgatewayURL}/ob/images/${this.props.profile.avatarHashes.original}`
            : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg';
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: {
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#dbc',
                    borderBottomColor: lightGrey,
                    borderBottomWidth: 1,
                    height: 140,
                } },
                React.createElement(FastImage, { source: {
                        uri: bannerURI,
                        method: 'GET',
                    }, style: {
                        position: 'absolute',
                        borderRadius: 0,
                        width: '100%',
                        height: bannerHeight,
                        top: 0,
                    } })),
            React.createElement(View, { style: styles.listContainer },
                React.createElement(View, { style: [styles.listItem, styles.noBorder, {
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                        }] },
                    React.createElement(Text, null, "Avatar"),
                    React.createElement(Avatar, { rounded: true, medium: true, overlayContainerStyle: { backgroundColor: '#aaa' }, containerStyle: { marginTop: -2 }, avatarStyle: { borderWidth: 1, borderColor: lightGrey }, source: { uri: avatarURI }, title: this.props.profile.name }))),
            React.createElement(View, { style: { backgroundColor: '#EFEFF4', flex: 1, flexDirection: 'row' } },
                React.createElement(Text, { style: styles.headings }, "Profile Information"),
                React.createElement(Text, { style: [styles.headings, { color: mediumGrey }] }, "(Tap to Edit)")),
            React.createElement(View, { style: styles.listContainer },
                React.createElement(UserProfileField, { height: 50, field: 'name', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(UserProfileField, { height: 50, field: 'handle', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(UserProfileField, { height: 50, field: 'location', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(TouchableHighlight, { onPress: this.handleClickShortDescription },
                    React.createElement(View, { style: [styles.listItem, styles.listItemColumn] },
                        React.createElement(View, { style: [styles.listItemTitle, {
                                    flex: 1,
                                }] },
                            React.createElement(Text, { style: styles.listItemText }, "Short Description")),
                        React.createElement(Text, { style: { flex: 1, height: height } }, this.props.profile.shortDescription))),
                (this.state.editShortDescription &&
                    React.createElement(View, { style: { height: height * 2, padding: 10 } },
                        React.createElement(TextInput, { autoFocus: true, style: { flex: 1, height: height, backgroundColor: '#fafafa', padding: 10 }, value: this.state.profile.shortDescription, onChangeText: (text) => this.setState({
                                profile: Object.assign({}, this.state.profile, { shortDescription: text })
                            }), placeholder: "Short Description" }))),
                React.createElement(UserProfileField, { height: 50, field: 'email', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(UserProfileField, { height: 50, field: 'phone', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(UserProfileField, { height: 50, field: 'website', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText }),
                React.createElement(UserProfileField, { height: 50, field: 'about', profile: this.state.profile, oldProfile: this.props.profile, onChangeText: this.onChangeText })),
            React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } },
                React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Back without Saving" })),
            React.createElement(Link, { to: "/setings", underlayColor: '#f0f4f7' },
                React.createElement(View, { style: { marginBottom: 20 } },
                    React.createElement(Button, { raised: true, icon: { name: 'save' }, onPress: this.handleSave, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Save Settings" })))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const height = 50;
const styles = StyleSheet.create({
    headings: {
        padding: 10,
        paddingTop: 20,
        color: '#222',
        borderBottomWidth: 0,
        borderColor: lightGrey,
    },
    listContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: lightGrey,
    },
    listItem: {
        backgroundColor: '#fff',
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noBorder: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    listItemColumn: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemTitle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        zIndex: 2,
        height: height,
        backgroundColor: '#fff',
    },
    listItemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#222',
    },
});
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile,
        auth64: state.reduxLogin.auth64,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        postUserProfile: (payload) => dispatch(Actions.OB1.INIT_PUT_OB_PROFILE(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
//# sourceMappingURL=UserProfile.js.map