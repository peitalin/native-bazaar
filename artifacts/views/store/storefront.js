import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableHighlight, View, Dimensions, } from 'react-native';
import { ListItem, } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import { withRouter } from 'react-router';
import FastImage from 'react-native-fast-image';
import { APIgatewayURL } from '../../redux/requests';
const windowWidth = Dimensions.get('window').width;
class StoreFront extends Component {
    constructor() {
        super(...arguments);
        this.goToStore = ({ profile }) => {
            this.props.initVisitStore({ browsedProfile: profile });
            // scrollToTop onPress, for follower menu
            if (this.props.scrollToTopOnPress) {
                // this.props.setScrollY({ scrollY: -121 })
                // -121 scrollY triggers scrollToTop on parent ScrollView
            }
        };
    }
    render() {
        let { profile, auth64, isMyStore, storeTitle } = this.props;
        let bannerURI = profile.headerHashes.small
            ? `${APIgatewayURL}/ob/images/${profile.headerHashes.small}`
            : 'https://s3-ap-southeast-2.amazonaws.com/ob1-peita/gray_backdrop.jpg';
        return (React.createElement(TouchableHighlight, { onPress: () => this.goToStore({ profile }), underlayColor: '#eee' },
            React.createElement(View, null,
                React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: storeTitle || `Browse: ${profile.name}` }),
                React.createElement(FastImage, { source: {
                        uri: bannerURI,
                        headers: { Authorization: this.props.auth64 },
                    }, style: { width: Dimensions.get('window').width, height: 140 } }))));
    }
}
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        initVisitStore: ({ browsedProfile }) => dispatch(Actions.OB1.INIT_VISIT_STORE(browsedProfile)),
        setScrollY: ({ scrollY }) => dispatch(Actions.OB1.SET_SCROLL_Y(scrollY)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoreFront));
//# sourceMappingURL=storefront.js.map