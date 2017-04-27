import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Feeds from '../Feeds.js';
import styles from '../feeds.scss';

describe('<Feeds />', () => {
    it('should render an <div> tag', () => {
        const renderedComponent = shallow(<Feeds feeds={[]} />);
        expect(renderedComponent.type()).toEqual('div');
    });

    it('should have a className attribute', () => {
        const renderedComponent = shallow(<Feeds feeds={[]} />);
        expect(renderedComponent.prop('className')).toEqual(styles.feeds);
    });
});
