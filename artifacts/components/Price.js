import * as React from 'react';
import { Text } from 'react-native';
export default class Price extends React.Component {
    constructor() {
        super(...arguments);
        this.formatDollars = (price) => {
            // formats numbers into dollars: 9111000 => $9,111,000
            const insertComma = (match, offset, str) => {
                // see if we should insert comma
                if (offset && (match !== ".") && ((str.length - offset) % 3 === 0)) {
                    return ',' + match;
                }
                else {
                    return match;
                }
            };
            return this.props.symbol + price.toFixed(2).replace(/./g, insertComma);
        };
    }
    render() {
        return (React.createElement(Text, Object.assign({}, this.props), this.formatDollars(this.props.price)));
    }
}
Price.defaultProps = {
    symbol: '$'
};
//# sourceMappingURL=Price.js.map