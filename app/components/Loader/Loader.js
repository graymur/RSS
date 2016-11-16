import React from 'react';

import styles from './loader.sass';

export class Loader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.loader} style={{ width: (this.props.size || 50) + 'px', height: (this.props.size || 50) + 'px'}}></div>
        );
    }
}

export default Loader;
