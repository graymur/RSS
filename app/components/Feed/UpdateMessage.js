import React from 'react';

import styles from './feed.sass';

class UpdateMessage extends React.Component {
    render() {
        return (
            <div className={styles['empty-message']}>
                <h3 className={styles['empty-message__title']}>This feed is empty.</h3>
                <span className="btn btn-default" onClick={this.props.onClick}>Update feed</span>
            </div>
        );
    }
}

export default UpdateMessage;
