import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from 'views/HomePage/selectors.js';
import { updateFeed } from 'views/HomePage/actions.js';

import styles from './feed-info.sass';

export class FeedInfo extends React.Component {
    static propTypes = {
        feed: React.PropTypes.object,
        updateFeed: React.PropTypes.func.isRequired
    };

    shouldComponentUpdate(newProps) {
        if (this.props.feed) {
            return this.props.feed && this.props.feed.id !== newProps.feed.id;
        }

        return true;
    }

    render() {
        const { feed, updateFeed } = this.props;

        if (!feed) return null;

        console.log(feed);

        return (
            <div className={styles.feeds}>
                <input value={feed.url} className={styles.url + ' form-control'} readOnly={Boolean(true)} />
                <a href='#' onClick={() => updateFeed(feed.id)} className={styles.item + ' btn btn-default'} role='button'>Update feed</a>
                <a href='#' className={styles.item + ' btn btn-default'} role='button'>Edit feed</a>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    feed: selectors.selectCurrentFeed()
});

export default connect(mapStateToProps, {
    updateFeed
})(FeedInfo);

