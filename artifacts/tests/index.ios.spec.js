import 'react-native';
import React from 'react';
import OB1 from '../index.ios';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
it('renders correctly', () => {
    const tree = renderer.create(React.createElement(OB1, null));
    expect(tree).toBeDefined();
});
//# sourceMappingURL=index.ios.spec.js.map