import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Resizeable from '../Resiziable.js';
import styles from '../resizeable.scss';

describe('<Resizeable />', () => {
    it('should render an <div> tag with correct class and width', () => {
        const renderedComponent = shallow(<Resizeable className='test' width={25} onDrag={() => {}} />);
        expect(renderedComponent.prop('className')).toEqual('test');
        expect(renderedComponent.prop('style').width).toEqual('25%');
    });
});
