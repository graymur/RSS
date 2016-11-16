import React from 'react';

import styles from './form.sass';

export class ErrorElement extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.error}>{this.props.error.toString()}</div>
        );
    }
}

export default ErrorElement;
