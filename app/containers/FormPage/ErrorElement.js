import React from 'react';

import styles from './form.sass';

export class ErrorElement extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.error}>{this.props.error.toString()}</div>
        );
    }
}

ErrorElement.propTypes = {
    error: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.string
    ])
};

export default ErrorElement;
