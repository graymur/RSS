import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import * as selectors from 'views/HomePage/selectors.js';
import {updateFeedPosts} from 'views/HomePage/actions.js';

import {Link} from 'react-router-dom';

import './feed-info.scss';

export class FeedInfo extends React.PureComponent {
	static propTypes = {
		feed: PropTypes.object,
		updateFeedPosts: PropTypes.func.isRequired
	};

	render() {
		const {feed, updateFeedPosts} = this.props;

		if (!feed) return null;

		return (
			<div className='feed-info'>
				<input value={feed.url} className='url form-control' readOnly={Boolean(true)}/>
				<a href='#' onClick={() => updateFeedPosts(feed.id)} className='item btn btn-default' role='button'>Fetch posts</a>
				<Link to={`/form/${feed.id}`} className='item btn btn-default' role='button'>
					Edit feed
				</Link>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	feed: selectors.selectCurrentFeed()
});

export default connect(mapStateToProps, {updateFeedPosts})(FeedInfo);
