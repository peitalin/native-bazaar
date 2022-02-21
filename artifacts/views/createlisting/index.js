import * as React from 'react';
import { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, ScrollView, Dimensions, } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
class CreateListing extends Component {
    render() {
        return (React.createElement(View, { style: [styles.shadowBox, {
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#88f',
                    padding: 10,
                }] },
            React.createElement(ScrollView, null,
                React.createElement(View, null,
                    React.createElement(Text, null, "Create a listing")),
                React.createElement(Text, { style: styles.headings }, "Item"),
                React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                    React.createElement(List, { containerStyle: styles.listContainer },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Shipping Address" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Policies" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Moderators" })))),
                React.createElement(Text, { style: styles.headings }, "Category"),
                React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                    React.createElement(List, { containerStyle: styles.listContainer },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Shipping Address" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Policies" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Moderators" })))),
                React.createElement(Text, { style: styles.headings }, "Policies"),
                React.createElement(View, { style: { padding: 0, backgroundColor: '#fff' } },
                    React.createElement(List, { containerStyle: styles.listContainer },
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Shipping Address" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: styles.listItem, titleStyle: styles.listItemTitle, title: "Policies" })),
                        React.createElement(View, null,
                            React.createElement(ListItem, { chevronColor: "#222", containerStyle: { borderBottomWidth: 0 }, titleStyle: styles.listItemTitle, title: "Moderators" })))))));
    }
}
const post = {
    "slug": "native-bazaar-test-post-slug",
    "metadata": {
        "contractType": "PHYSICAL_GOOD",
        "format": "FIXED_PRICE",
        "expiry": "2037-12-31T05:00:00.000Z",
        "pricingCurrency": "USD"
    },
    "item": {
        "title": "Test Listing",
        "description": "This is a listing example.",
        "processingTime": "3 days",
        "price": 200,
        "tags": [
            "vintage dress"
        ],
        "images": [{
                "filename": "front",
                "tiny": "QmbjyAxYee4y3443kAMLcmRVwggZsRDKiyXnXus1qdJJWz",
                "small": "QmVsoT9iabv6GZhxhvtjSpQMJA6QyMivGTs6MmHJr6TBm9",
                "medium": "QmTJfeeapZwFM8EoZAuf16JsSJyxZtKaAR6hmWiMf4CTcF",
                "large": "QmfTKL3Z67mWKTKf9XKSCj1ptmDRaZLr5yjPS4JrVDgo5h",
                "original": "QmNexx7SaJCVCjyGGG3j2k7fenn3iVhtWdm9RvKvT7GTLq"
            }, {
                "filename": "cream",
                "tiny": "QmU1cBgjyHpuzDYbEd4iDVuPzxgKM3CqhRhDJqkHWCKBXq",
                "small": "QmP3BVFuga7N4XEX8iU2MFYC7pc6mfTRQRrpZbKiVy2Csr",
                "medium": "QmQaSzaoHzp8raZLtPEFyCjTnwfXvDGKdXFM83STDVWG43",
                "large": "QmNsFdsX2LNALG2WBxw6E6FTPZWgJcRAcLHnKdWczrCNf9",
                "original": "QmTEUnCjuQPj1ggj5UL5vJujkgBiNYY4jkteugnogiCJny"
            }, {
                "filename": "black",
                "tiny": "QmdA3Nmc8VnwSvt98Deo2RQztEiCsAkNLhron73bnBzARe",
                "small": "QmcADxUo89ZsEAWiYsuUk7hrgjWDMKXL1CtoA9sTNrQFFP",
                "medium": "QmZydpAJoLsJWbP5vmh59W6bW1kuiCV34yD62hq28AtP7b",
                "large": "QmXixGseetihe6vZiWcTw9N1pieok1YtRoxwvyd5d7jz6s",
                "original": "QmZsZ78FJwt281gfeUvGzDnsBW7WNjPWW3aJWDKskhpCRr"
            }, {
                "filename": "other_red",
                "tiny": "QmbRFtxNWqACak1vvMJrrxUjzWjTJbMqi3vdUK5ZYvibgt",
                "small": "QmRdYph9YrfpdzMsaDnuySj6U4AY9dZhmjd8Cv2e6SscUG",
                "medium": "QmcD4pkp7SwCmN95pFnED2hz1LfsoYTPpynxeZbxCMoYPL",
                "large": "QmbSQZNAL3pZspUYWm6WNBD1oEQ6i9EnWPEsnk1DfdKnAv",
                "original": "QmZpgjK4jXmdqPg8Jt9YHGVmiuowVve3sbN2AZx7GXioDF"
            }],
        "categories": [
            "👚 Apparel & Accessories"
        ],
        "condition": "New",
        "options": [{
                "name": "Color",
                "description": "Color of the dress.",
                "variants": [{
                        "name": "Red",
                        "image": {
                            "filename": "front",
                            "tiny": "QmbjyAxYee4y3443kAMLcmRVwggZsRDKiyXnXus1qdJJWz",
                            "small": "QmVsoT9iabv6GZhxhvtjSpQMJA6QyMivGTs6MmHJr6TBm9",
                            "medium": "QmTJfeeapZwFM8EoZAuf16JsSJyxZtKaAR6hmWiMf4CTcF",
                            "large": "QmfTKL3Z67mWKTKf9XKSCj1ptmDRaZLr5yjPS4JrVDgo5h",
                            "original": "QmNexx7SaJCVCjyGGG3j2k7fenn3iVhtWdm9RvKvT7GTLq"
                        }
                    },
                    {
                        "name": "Cream",
                        "image": {
                            "filename": "cream",
                            "tiny": "QmU1cBgjyHpuzDYbEd4iDVuPzxgKM3CqhRhDJqkHWCKBXq",
                            "small": "QmP3BVFuga7N4XEX8iU2MFYC7pc6mfTRQRrpZbKiVy2Csr",
                            "medium": "QmQaSzaoHzp8raZLtPEFyCjTnwfXvDGKdXFM83STDVWG43",
                            "large": "QmNsFdsX2LNALG2WBxw6E6FTPZWgJcRAcLHnKdWczrCNf9",
                            "original": "QmTEUnCjuQPj1ggj5UL5vJujkgBiNYY4jkteugnogiCJny"
                        }
                    },
                    {
                        "name": "Black",
                        "image": {
                            "filename": "black",
                            "tiny": "QmdA3Nmc8VnwSvt98Deo2RQztEiCsAkNLhron73bnBzARe",
                            "small": "QmcADxUo89ZsEAWiYsuUk7hrgjWDMKXL1CtoA9sTNrQFFP",
                            "medium": "QmZydpAJoLsJWbP5vmh59W6bW1kuiCV34yD62hq28AtP7b",
                            "large": "QmXixGseetihe6vZiWcTw9N1pieok1YtRoxwvyd5d7jz6s",
                            "original": "QmZsZ78FJwt281gfeUvGzDnsBW7WNjPWW3aJWDKskhpCRr"
                        }
                    }
                ]
            },
            {
                "name": "Sizes",
                "description": "Size of the dress.",
                "variants": [{
                        "name": "Small"
                    },
                    {
                        "name": "Medium"
                    },
                    {
                        "name": "Large"
                    },
                    {
                        "name": "Extra Large"
                    }
                ]
            }
        ],
        "skus": [{
                "variantCombo": [0, 0],
                "productID": "dress-red-small",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [0, 1],
                "productID": "dress-red-medium",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [0, 2],
                "productID": "dress-red-large",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [1, 0],
                "productID": "dress-cream-small",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [1, 1],
                "productID": "dress-cream-medium",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [1, 2],
                "productID": "dress-cream-large",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [2, 0],
                "productID": "dress-black-small",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [2, 1],
                "productID": "dress-black-medium",
                "surcharge": 0,
                "quantity": 1000
            }, {
                "variantCombo": [2, 2],
                "productID": "dress-black-large",
                "surcharge": 0,
                "quantity": 1000
            }],
        "nsfw": false
    },
    "shippingOptions": [{
            "name": "Worldwide",
            "type": "FIXED_PRICE",
            "regions": [
                "ALL"
            ],
            "services": [{
                    "name": "Standard",
                    "price": 0,
                    "estimatedDelivery": "3 days"
                },
                {
                    "name": "Express",
                    "price": 1,
                    "estimatedDelivery": "3 days"
                }
            ]
        }],
    "taxes": [],
    "coupons": [],
    "moderators": [],
    "termsAndConditions": "Terms and conditions.",
    "refundPolicy": "Refund policy."
};
const lightGrey = '#d6d6d6';
const mediumGrey = '#939393';
const linkUnderlayColor = '#fafafa';
const styles = StyleSheet.create({
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
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: lightGrey
    },
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
    listItem: {
        borderBottomColor: lightGrey,
        borderBottomWidth: 1,
    },
    listItemTitle: {
        color: mediumGrey,
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
});
//////////////// REDUX /////////////////////
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateListing));
//# sourceMappingURL=index.js.map