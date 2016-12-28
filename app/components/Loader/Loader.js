import React from 'react';

import styles from './loader.sass';

export default class Loader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        size: React.PropTypes.number,
        className: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.arrayOf(React.PropTypes.string)
        ])
    };

    defaultProps = {
        className: []
    };

    constructor(props) {
        super(props);

        let { className } = this.props;

        if (!Array.isArray(className)) {
            className = [className];
        }

        className.push(styles.loader);

        this.className = className;
    }

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
            <span className={this.className.join(' ')} style={style} />
        );
    }
}
