import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from 'containers/HomePage/selectors.js';
import { updateFeed, selectPost } from 'containers/HomePage/actions.js';
//import { FormattedMessage } from 'react-intl';

import Centered from 'components/Centered/Centered.js';
import Loader from 'components/Loader/Loader.js';
import UpdateMessage from './UpdateMessage.js';
import Post from './Post.js';

import styles from './feed.sass';

export class Feed extends React.Component {
    render() {
        const { loading, updateFeed, feed, selectPost, currentPostId } = this.props;
        const posts = feed.posts;

        const showUpdateInfo = Boolean(!loading && feed.id && !posts.length);

        return (
            <div className={styles.feed}>
                { loading ? <Centered><Loader size={100} /></Centered> : null }
                { showUpdateInfo ?  <UpdateMessage onUpdateFeed={() => updateFeed(feed.id)} /> : null }
                { posts ? posts.map((post, index) => (
                    <Post key={index} {...post} onSelect={() => selectPost(post.id)} isCurrent={post.id === currentPostId} />
                )) : null }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    feed: selectors.selectCurrentFeed(),
    loading: selectors.selectPostsLoading(),
    currentPostId: selectors.selectCurrentPostId()
});

export default connect(mapStateToProps, {
    updateFeed,
    selectPost
})(Feed);

