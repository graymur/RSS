import React from 'react';
import PropTypes from 'prop-types';

import styles from './form.scss';

export class ErrorElement extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.error}>{this.props.error.toString()}</div>
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
