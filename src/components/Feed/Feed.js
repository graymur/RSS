import React from 'react';
import PropTypes from 'prop-types';
// import GeminiScrollbar from 'react-gemini-scrollbar';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from 'views/HomePage/selectors.js';
import { updateFeed, selectPost } from 'views/HomePage/actions.js';

import Centered from 'components/Centered/Centered.js';
import Loader from 'components/Loader/Loader.js';
import UpdateMessage from './UpdateMessage.js';
import Post from './Post.js';

import './feed.scss';

export class Feed extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        updateFeed: PropTypes.func.isRequired,
        feed: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ]),
        posts: PropTypes.array.isRequired,
        selectPost: PropTypes.func.isRequired,
        currentPostId: PropTypes.string.isRequired
    };

	handleUpdateClick = e => {
		this.props.updateFeed(this.props.feed.id)
	}

    render() {
        const { loading, feed, posts, selectPost, currentPostId } = this.props;
        const showUpdateInfo = Boolean(!loading && feed && !posts.length);

        return (
            <div className='feed'>
                { loading ? <Centered><Loader size={100} /></Centered> : null }
                { showUpdateInfo ? <UpdateMessage onUpdateFeed={this.handleUpdateClick} /> : null }

				{/*<GeminiScrollbar>*/}
                { posts ? posts.map((post, index) => (
                    <Post key={index} {...post} onSelect={() => selectPost(post.id)} isCurrent={post.id === currentPostId} />
                )) : null }
				{/*</GeminiScrollbar>*/}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    feed: selectors.selectCurrentFeed(),
    posts: selectors.selectPosts(),
    loading: selectors.selectPostsLoading(),
    currentPostId: selectors.selectCurrentPostId()
});

export default connect(mapStateToProps, {
    updateFeed,
    selectPost
})(Feed);
