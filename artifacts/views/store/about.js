import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'react-native';
class StoreAbout extends Component {
    render() {
        return (React.createElement(View, { style: [styles.aboutContainer] },
            React.createElement(View, { style: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#aaa' } },
                React.createElement(Text, { style: { fontWeight: '600' } }, "About")),
            React.createElement(View, { style: styles.rows },
                React.createElement(Text, { style: { fontWeight: '600' } }, "Email:"),
                React.createElement(Text, { style: { color: '#64A3E5' } }, this.props.profile.contactInfo.email)),
            React.createElement(View, { style: styles.rows },
                React.createElement(Text, { style: { fontWeight: '600' } }, "Phone Number:"),
                React.createElement(Text, { style: { color: '#64A3E5' } }, this.props.profile.contactInfo.phoneNumber)),
            React.createElement(View, { style: styles.rows },
                React.createElement(Text, { style: { fontWeight: '600' } }, "Website:"),
                React.createElement(Text, { style: { color: '#64A3E5' } }, this.props.profile.contactInfo.website)),
            (this.props.profile.contactInfo.social &&
                this.props.profile.contactInfo.social.map(social => {
                    return (React.createElement(View, { key: social.username },
                        React.createElement(Text, null,
                            social.type,
                            ": ",
                            social.username)));
                }))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    aboutContainer: {
        height: 200,
        padding: 40,
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
    rows: {
        flex: 1,
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }
});
export default StoreAbout;
//# sourceMappingURL=about.js.map