import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, } from 'react-native';
import { View, } from 'react-native';
import { List, ListItem, Avatar } from 'react-native-elements';
import { APIgatewayURL } from '../redux/requests';
class ListAvatar extends Component {
    render() {
        let { profile } = this.props;
        return (React.createElement(View, { style: { padding: 0 } },
            React.createElement(List, { containerStyle: [styles.listContainerTop, {
                        backgroundColor: this.props.chosen ? '#D4AFDF' : '#fff',
                    }] },
                React.createElement(ListItem, { chevronColor: "#222", containerStyle: {
                        borderBottomWidth: 0,
                        height: this.props.large ? 90 : 40,
                    }, titleContainerStyle: {
                        marginLeft: 45,
                        marginTop: this.props.large ? 18 : 0,
                    }, subtitleContainerStyle: { marginLeft: 45, marginTop: -4 }, avatar: React.createElement(Avatar, { rounded: true, large: this.props.large, overlayContainerStyle: { backgroundColor: '#aaa' }, containerStyle: { marginTop: this.props.large ? -2 : -6 }, avatarStyle: { borderWidth: 1, borderColor: lightGrey }, source: { uri: `${APIgatewayURL}/ob/images/${profile.avatarHashes.small}` }, title: profile.name }), title: profile.name, subtitle: profile.handle }))));
    }
}
ListAvatar.defaultProps = {
    large: true
};
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    listContainerTop: {
        marginBottom: 0,
        marginTop: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        borderColor: lightGrey
    },
});
export default ListAvatar;
//# sourceMappingURL=ListAvatar.js.map