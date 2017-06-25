import React from 'react';
import PropTypes from 'prop-types';

export class ErrorElement extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className='error'>{this.props.error.toString()}</div>
        );
    }
}

ErrorElement.propTypes = {
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

export default ErrorElement;
