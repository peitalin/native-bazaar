import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ActivityIndicator, View, ScrollView, Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from '../../redux/actions';
import ListingThumbnail from './listingthumbnail';
const windowHeight = Dimensions.get('window').height;
class Listings extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            viewStyle: 'Card',
        };
        this.handleScroll = (event) => {
            let { y } = event.nativeEvent.contentOffset;
            this.props.setScrollY({ scrollY: y });
        };
    }
    render() {
        return (React.createElement(View, { style: [styles.shadowBox, styles.container] },
            React.createElement(ScrollView, { ref: (scrollView) => { this._scrollView = scrollView; }, onScroll: this.handleScroll, scrollEventThrottle: 1 },
                React.createElement(View, { style: { margin: 10 } },
                    React.createElement(Text, null, (`${this.props.listings.length} listings`)),
                    ((this.props.isLoading)
                        ? React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 } },
                            React.createElement(Text, { style: { height: 20, fontSize: 12, color: '#222' } }, "Loading Listings..."),
                            React.createElement(ActivityIndicator, { color: "#222", animating: true }))
                        : React.createElement(View, null))),
                (!!this.props.listings.length &&
                    this.props.listings.map(listing => {
                        return (React.createElement(ListingThumbnail, { listing: listing, key: listing.hash }));
                    })),
                ((this.props.listings.length < 4) &&
                    React.createElement(View, { style: { height: windowHeight * 1 / 2 } })))));
    }
}
Listings.defaultProps = {
    listings: [],
    isLoading: true,
};
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 507,
        backgroundColor: '#fff',
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
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        setScrollY: ({ scrollY }) => dispatch(Actions.OB1.SET_SCROLL_Y(scrollY)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Listings);
//# sourceMappingURL=listings.js.map