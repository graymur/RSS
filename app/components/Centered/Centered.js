import React from 'react';

import styles from './centered.sass';

export class Centered extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node
    };

    render() {
        return (
            <div className={styles.centered}>{this.props.children}</div>
        );
    }
}

export default Centered;
