import React from 'react';
import PropTypes from 'prop-types';

import './centered.scss';

export default class Centered extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className='centered'>{this.props.children}</div>
        );
    }
}
