import React from 'react';
import Loader from 'components/Loader/Loader'

import styles from './feeds.sass';

class Item extends React.Component {
    render() {
        const { id, title, group, onFeedClick, loading, currentFeed } = this.props;

        return (
            <div className={styles.feeds__group__item} onClick={() => onFeedClick({ id, group })}>
                { currentFeed.id === id ? <b>{title}</b> : title }
                { loading ? <Loader size={12}/> : null }
            </div>
        );
    }
}

export default Item;
