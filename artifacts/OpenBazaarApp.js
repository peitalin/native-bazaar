import * as React from 'react';
import { Component } from 'react';
import { StyleSheet, ScrollView, } from 'react-native';
import { connect } from 'react-redux';
import Login from './views/Login';
class OpenBazaarApp extends Component {
    render() {
        return (React.createElement(ScrollView, { style: { flex: 1, flexDirection: 'column' } },
            React.createElement(Login, null)));
    }
}
const styles = StyleSheet.create({});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {
        profile: state.reduxOB1.profile
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenBazaarApp);
//# sourceMappingURL=OpenBazaarApp.js.map