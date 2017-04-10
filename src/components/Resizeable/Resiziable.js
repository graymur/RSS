import React from 'react';
import PropTypes from 'prop-types';

import styles from './resizeable.scss';

export default class Resizeable extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        width: PropTypes.number,
        onDrag: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
    }

    componentDidMount() {}

    componentWillUnmount() {
        this.stopDrag();
    }

    handleMouseDown(e) {
        this.startDrag();
    }

    handleDrag(e) {
        this.props.onDrag(e.clientX, this.refs.element);
    }

    startDrag() {
        window.addEventListener('mousemove', this.handleDrag);
        window.addEventListener('mouseup', this.stopDrag);
    }

    stopDrag() {
        window.removeEventListener('mousemove', this.handleDrag);
        window.removeEventListener('mouseup', this.stopDrag);
    }

    render() {
        const { width, children, className } = this.props;
        const style = { width: `${width}%` };

        return (
            <div className={className} ref='element' style={style}>
                {children}
                <div className={styles.handler} ref='handler' onMouseDown={this.handleMouseDown} onMouseUp={this.stopDrag} />
            </div>
        );
    }
}
