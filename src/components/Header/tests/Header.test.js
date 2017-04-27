import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../Header.js';
import styles from '../header.scss';

describe('<Header />', () => {
    it('should render an <div> tag', () => {
        const renderedComponent = shallow(<Header />);
        expect(renderedComponent.type()).toEqual('div');
    });

    it('should have a className attribute', () => {
        const renderedComponent = shallow(<Header />);
        expect(renderedComponent.prop('className')).toEqual(styles.header);
    });
});
