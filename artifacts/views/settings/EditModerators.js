import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Alert, View, ScrollView, } from 'react-native';
import { List, ListItem, Button, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { Link } from 'react-router-native';
import { withRouter } from 'react-router';
import { lightGrey, mediumGrey } from '../../utils/colors';
class EditModerators extends Component {
    constructor() {
        super(...arguments);
        this.handlePress = () => {
            this.props.history.goBack();
        };
    }
    render() {
        return (React.createElement(ScrollView, { style: { backgroundColor: '#EFEFF4' } },
            React.createElement(View, { style: { backgroundColor: '#EFEFF4' } },
                React.createElement(Text, { style: styles.headings }, "Pick your Moderators")),
            React.createElement(View, { style: { backgroundColor: '#EFEFF4', padding: 0 } },
                React.createElement(List, { style: { marginTop: 10, borderTopWidth: 1, borderTopColor: lightGrey } }, (this.props.moderators.map((moderator, i) => React.createElement(View, { key: i },
                    React.createElement(ListItem, { hideChevron: true, containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: React.createElement(View, null,
                            React.createElement(View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' } },
                                React.createElement(Avatar, { rounded: true, medium: true, overlayContainerStyle: { backgroundColor: '#aaa' }, containerStyle: { marginTop: 0 }, avatarStyle: { borderWidth: 1, borderColor: lightGrey }, source: { uri: moderator.avatar.source }, title: moderator.name }),
                                React.createElement(Text, { style: { flex: 1 } }, moderator.name),
                                React.createElement(Text, { style: { flex: 2 } }, moderator.handle)),
                            React.createElement(View, { style: { flex: 1, flexDirection: 'row' } },
                                React.createElement(View, { style: { flex: 1, flexDirection: 'column', justifyContent: 'space-between' } },
                                    React.createElement(Text, { style: { flex: 2 } }, "Email:"),
                                    React.createElement(Text, { style: { flex: 2 } }, "Handle:"),
                                    React.createElement(Text, { style: { flex: 1 } }, "Name:")),
                                React.createElement(View, { style: { flex: 3, flexDirection: 'column', justifyContent: 'space-between' } },
                                    React.createElement(Text, { style: { flex: 2 } }, moderator.emailAddress),
                                    React.createElement(Text, { style: { flex: 2 } }, moderator.handle),
                                    React.createElement(Text, { style: { flex: 1 } }, moderator.name)))) })))))),
            React.createElement(Link, { to: "/settings", underlayColor: '#f0f4f7' },
                React.createElement(View, { style: { marginTop: 20, marginBottom: 10 } },
                    React.createElement(Button, { raised: true, icon: { name: 'reply' }, onPress: this.handlePress, onLongPress: () => Alert.alert("Long Pressed"), buttonStyle: { backgroundColor: '#222', borderRadius: 4, padding: 16 }, textStyle: { textAlign: 'center' }, title: "Back to Settings" })))));
    }
}
const styles = StyleSheet.create({
    headings: {
        padding: 10,
        paddingTop: 20,
        color: '#222',
        borderBottomWidth: 0,
        borderColor: lightGrey,
    },
    listContainer: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: lightGrey,
        backgroundColor: '#fff',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 0,
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
        alignItems: 'flex-start',
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
});
const mapStateToProps = (state) => {
    return {
        moderators: state.reduxUser.storeSettings.moderators,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfile: ({ userProfile }) => dispatch(Actions.User.UPDATE_USER_PROFILE(userProfile)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditModerators));
//# sourceMappingURL=EditModerators.js.map