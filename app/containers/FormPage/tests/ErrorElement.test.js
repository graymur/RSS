import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import ErrorElement from '../ErrorElement.js';
import styles from '../form.sass';

describe('<ErrorElement />', () => {
    it('should render an <div> tag', () => {
        const renderedComponent = shallow(<ErrorElement error="error" />);
        expect(renderedComponent.type()).toEqual('div');
    });

    it('should have a className attribute', () => {
        const renderedComponent = shallow(<ErrorElement error="error" />);
        console.log(renderedComponent.prop('className'));
        expect(renderedComponent.prop('className')).toEqual(styles.error);
    });

    it('should render error text', () => {
        const renderedComponent = shallow(<ErrorElement error="error" />);
        expect(renderedComponent.text()).toEqual('error');
    });

    it('should call toSting() on error object', () => {
        const renderedComponent = shallow(<ErrorElement error={ new Error('error') } />);
        expect(renderedComponent.text()).toEqual('Error: error');
    });
});
