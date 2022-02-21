import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, } from 'react-native';
import { Kaede } from 'react-native-textinput-effects';
// encode(decode) html text into html entity
const decodeHtmlEntity = (str) => {
    if (!str) {
        return '';
    }
    return str.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
    });
};
const encodeHtmlEntity = (str) => {
    if (!str) {
        return '';
    }
    var buf = [];
    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(['&#', str.charCodeAt(i), ';'].join(''));
    }
    return buf.join('');
};
class UserProfileField extends Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.getOnChangeText = (props) => {
            let _field = (props.field === 'phone') ? 'phoneNumber' : props.field;
            let isContactInfo = ['email', 'phone', 'website'].includes(props.field);
            if (isContactInfo) {
                return (text) => props.onChangeText({
                    profile: Object.assign({}, props.profile, { contactInfo: Object.assign({}, this.props.profile.contactInfo, { [_field]: encodeHtmlEntity(text) }) })
                });
            }
            else {
                return (text) => props.onChangeText({
                    profile: Object.assign({}, props.profile, { [_field]: encodeHtmlEntity(text) })
                });
            }
        };
    }
    render() {
        let props = this.props;
        let isContactInfo = ['email', 'phone', 'website'].includes(props.field);
        let FieldName = props.field.slice(0, 1).toUpperCase() + props.field.slice(1);
        // onChange function
        let _field = (props.field === 'phone') ? 'phoneNumber' : props.field;
        let _onChangeText = this.getOnChangeText(this.props);
        // for the left label (old field values)
        let _label = (isContactInfo)
            ? props.oldProfile.contactInfo[_field]
            : props.oldProfile[_field];
        let _rawLabel = decodeHtmlEntity(_label);
        // alert(JSON.stringify({ html: encodeHtmlEntity('@') }))
        // alert(JSON.stringify({ html: decodeHtmlEntity('&#64;') }))
        return (React.createElement(View, { style: styles.listItem },
            React.createElement(View, { style: styles.listItemTitle },
                React.createElement(Text, { style: styles.listItemText }, FieldName)),
            React.createElement(Kaede, { label: _rawLabel, onChangeText: _onChangeText, height: this.props.height, style: styles.kaedeStyle, containerStyle: styles.kaedeContainerStyle, inputStyle: styles.kaedeInputStyle, labelStyle: styles.kaedeLabelStyle })));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const height = 50;
const styles = StyleSheet.create({
    listItem: {
        backgroundColor: '#fff',
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
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
    kaedeStyle: {
        flex: 4,
        height: height,
        margin: -5,
    },
    kaedeContainerStyle: {
        padding: 0,
        margin: 0,
    },
    kaedeInputStyle: {
        color: '#222',
        backgroundColor: '#f1f1f1',
        height: height,
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '400',
    },
    kaedeLabelStyle: {
        color: '#5682A3',
        fontSize: 14,
        backgroundColor: '#fff',
        margin: 0,
        padding: 0,
    },
});
export default UserProfileField;
//# sourceMappingURL=UserProfileField.js.map