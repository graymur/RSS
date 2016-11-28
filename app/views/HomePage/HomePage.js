import React from 'react';
//import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Feeds from 'components/Feeds/Feeds.js';
import Feed from 'components/Feed/Feed.js';
import Post from 'components/Post/Post.js';

import * as selectors from './selectors.js';

import { fetchFeeds, updateFeed } from './actions.js';

import styles from './home.sass';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        feedsByGroups: React.PropTypes.array.isRequired,
        feeds: React.PropTypes.array.isRequired,
        fetchFeeds: React.PropTypes.func.isRequired
    };

    componentWillMount() {
        this.fetchFeeds();
    }

    fetchFeeds() {
        if (!this.props.feeds.length) {
            this.props.fetchFeeds();
        }
    }

    render() {
        const { feedsByGroups } = this.props;

        return (
            <div className={styles.content}>
                <Feeds feeds={feedsByGroups} />
                <Feed />
                <Post />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    feeds: selectors.selectFeeds(),
    feedsByGroups: selectors.selectFeedsByGroups(),
    postsLoading: selectors.selectPostsLoading(),
    posts: selectors.selectPosts(),
    currentFeed: selectors.selectCurrentFeed()
});

export default connect(mapStateToProps, {
    fetchFeeds,
    updateFeed
})(HomePage);