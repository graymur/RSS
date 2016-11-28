import React from 'react';

import styles from './loader.sass';

export class Loader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        size: React.PropTypes.number
    };

    render() {
        let size = this.props.size || 50;
        let borderWidth = Math.max(2, Math.ceil(size * 0.2));

        const style = {
            width: `${size}px`,
            height: `${size}px`,
            border: `${borderWidth}px solid #f3f3f3`,
            borderTop: `${borderWidth}px solid #3498db`
        };

        return (
            <div className={styles.loader} style={style} />
        );
    }
}

export default Loader;
