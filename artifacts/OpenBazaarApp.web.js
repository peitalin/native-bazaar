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
import { StyleSheet, Platform, } from 'react-native';
import { Text, TouchableOpacity, View, Picker, ScrollView, ActivityIndicator, } from 'react-native';
import JSONTree from 'react-json-tree'; // aliased to react-native-json-tree for native
import { connect } from 'react-redux';
const friends = [
    {
        id: 1,
        firstName: 'Jane',
        lastName: 'Brown',
        avatarUrl: 'https://placehold.it/100x100',
    },
    {
        id: 2,
        firstName: 'Kate',
        lastName: 'Silver',
        avatarUrl: 'https://placehold.it/100x100',
    },
    {
        id: 3,
        firstName: 'Kevin',
        lastName: 'Violet',
        avatarUrl: 'https://placehold.it/100x100',
    },
];
class OpenBazaarApp extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            text: '',
            connected: false,
            language: 'go',
            menuOpen: false,
        };
        this.getIPFSData = () => __awaiter(this, void 0, void 0, function* () {
            let url = "https://ipfs.io/ipfs/QmaFMkr7y3qrFEgewwAUDPjFsGTSiZ3ZnxmxZKDnkK65wj";
            alert(`You requested: ${url}`);
            try {
                let res = yield fetch(url, { method: "GET" });
                let data = yield res.json();
                console.info(data);
                this.props.updateProfile({ profile: data });
            }
            catch (error) {
                console.info(error);
            }
        });
        this.handleText = (text) => {
            this.setState({ text: text });
        };
        this.onPressButton = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ connected: true });
            yield this.getIPFSData();
            this.setState({ connected: false });
        });
        this.onLongPressButton = () => {
            console.info("button long-pressed, resetting IPFS data");
            this.props.updateProfile({ profile: { name: "Steem" } });
        };
    }
    render() {
        let status = (this.state.connected && !this.props.profile)
            ? "Fetching Data" : "Done.";
        return (React.createElement(ScrollView, { style: { flex: 1, flexDirection: 'column' } },
            React.createElement(View, { style: { flex: 2, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' } },
                React.createElement(View, { style: { height: 50 } }),
                React.createElement(TouchableOpacity, { onPress: this.onPressButton, onLongPress: this.onLongPressButton },
                    React.createElement(View, { style: styles.button },
                        React.createElement(Text, { style: styles.buttonText }, "Load Data from IPFS"))),
                React.createElement(Text, { style: styles.red }, status),
                (React.createElement(ActivityIndicator, { animating: this.state.connected, color: "#1BD1C1" }))),
            (!(Platform.OS === "web")
                ? React.createElement(Picker, { selectedValue: this.state.language, onValueChange: (itemValue, itemIndex) => this.setState({ language: itemValue }) },
                    React.createElement(Picker.Item, { label: "Java", value: "java" }),
                    React.createElement(Picker.Item, { label: "JavaScript", value: "js" }))
                : React.createElement("select", { id: "", name: "" },
                    React.createElement("option", { value: "Java" }, "Java"),
                    React.createElement("option", { value: "JavaScript" }, "JavaScript"),
                    React.createElement("option", { value: "Go" }, "Go"))),
            React.createElement(View, { style: { flex: 1 } },
                React.createElement(JSONTree, { data: this.props.profile }))));
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5dCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bigblue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    red: {
        color: 'red',
        transform: [
            { translateX: -10 },
            { scale: 2 },
        ]
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(OpenBazaarApp);
//# sourceMappingURL=OpenBazaarApp.web.js.map