import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { Feed } from '../Feed.js';
import styles from '../feed.scss';

describe('<Feed />', () => {
    it('should render an <div> tag', () => {
        const renderedComponent = shallow(<Feed />);
        expect(renderedComponent.type()).toEqual('div');
    });

    it('should have a className attribute', () => {
        const renderedComponent = shallow(<Feed />);
        expect(renderedComponent.prop('className')).toEqual(styles.feed);
    });
});
