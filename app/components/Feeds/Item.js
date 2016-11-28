import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader/Loader'
import * as selectors from 'containers/HomePage/selectors.js';
import { fetchFeed } from 'containers/HomePage/actions.js';

import styles from './feeds.sass';

class Item extends React.Component {
    render() {
        const { id, title, count, unread, fetchFeed, loading, currentFeedId } = this.props;

        const className = [styles.feeds__group__item__title];

        if (currentFeedId === id) {
            className.push(styles.current);
        }

        return (
            <div className={styles.feeds__group__item} onClick={() => fetchFeed(id)}>
                <div className={className.join(' ')}>{title} ({count}/{unread})</div>
                { loading ? <Loader size={12}/> : null }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentFeedId: selectors.selectCurrentFeedId()
});

export default connect(mapStateToProps, {
    fetchFeed
})(Item);
