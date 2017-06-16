import React from 'react';
import PropTypes from 'prop-types';
import GeminiScrollbar from 'react-gemini-scrollbar';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import * as selectors from 'views/HomePage/selectors.js';
import {updateFeedPosts, selectPost} from 'views/HomePage/actions.js';

import Centered from 'components/Centered/Centered.js';
import Loader from 'components/Loader/Loader.js';
import UpdatePostsMessage from './UpdatePostsMessage.js';
import Post from './Post.js';

import './feed.scss';

export class Feed extends React.Component {
	static propTypes = {
		loading: PropTypes.bool.isRequired,
		updateFeedPosts: PropTypes.func.isRequired,
		feed: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.bool
		]),
		posts: PropTypes.array.isRequired,
		selectPost: PropTypes.func.isRequired,
		currentPostId: PropTypes.string
	};

	handleUpdateClick = e => {
		this.props.updateFeedPosts(this.props.feed.id);
	}

	render() {
		const {loading, feed, posts, selectPost, currentPostId} = this.props;
		const showUpdateInfo = Boolean(!loading && feed && !posts.length);

		console.log('RENDER Feed');

		return (
			<div className='feed' key={posts.length}>
				{ loading ? <Centered><Loader size={100}/></Centered> : null }
				{ showUpdateInfo ? <UpdatePostsMessage onUpdatePostsClick={this.handleUpdateClick}/> : null }

				<GeminiScrollbar>
					{ posts ? posts.map((post, index) => (
						<Post key={post.id} {...post} onSelect={() => selectPost(post.id)} isCurrent={post.id === currentPostId}/>
					)) : null }
				</GeminiScrollbar>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	feed: selectors.selectCurrentFeed(),
	posts: selectors.selectCurrentPosts(),
	loading: selectors.selectPostsLoading(),
	currentPostId: selectors.selectCurrentPostId()
});

export default connect(mapStateToProps, {
	updateFeedPosts,
	selectPost
})(Feed);
