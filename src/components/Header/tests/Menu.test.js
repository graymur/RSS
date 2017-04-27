import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Menu from '../Menu.js';
import styles from '../header.scss';

describe('<Menu />', () => {
    it('should render an <nav> tag', () => {
        const renderedComponent = shallow(<Menu />);
        expect(renderedComponent.type()).toEqual('nav');
    });

    it('should have a className attribute', () => {
        const renderedComponent = shallow(<Menu />);
        expect(renderedComponent.prop('className')).toEqual(styles.menu);
    });

    it('should have two child elements', () => {
        const renderedComponent = shallow(<Menu />);
        expect(renderedComponent.find('.' + styles.menu__item).length).toEqual(2);
    });
});
