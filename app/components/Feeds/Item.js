import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader/Loader'
import * as selectors from 'containers/HomePage/selectors.js';
import { fetchFeed } from 'containers/HomePage/actions.js';

import styles from './feeds.sass';

class Item extends React.Component {
    render() {
        const { id, title, group, fetchFeed, loading, posts, currentFeed } = this.props;

        return (
            <div className={styles.feeds__group__item} onClick={() => fetchFeed(id)}>
                { currentFeed.id === id ? <b>{title}</b> : title }
                { loading ? <Loader size={12}/> : null }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentFeed: selectors.selectCurrentFeed()
});

export default connect(mapStateToProps, {
    fetchFeed
})(Item);
