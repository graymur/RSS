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
    fetchFeeds() {
        if (!this.props.feeds.length) {
            this.props.fetchFeeds();
        }
    }

    componentWillMount() {
        this.fetchFeeds();
    }

    render() {
        const { feedsByGroups, currentFeed, updateFeed, postsLoading, posts } = this.props;

        return (
            <div className={styles.content}>
                <Feeds feeds={feedsByGroups} />
                <Feed loading={postsLoading} currentFeed={currentFeed} onUpdateFeed={updateFeed} posts={posts} />
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