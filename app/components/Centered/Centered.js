import React from 'react';

import styles from './centered.sass';

export class Centered extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.centered}>{this.props.children}</div>
        );
    }
}

export default Centered;
