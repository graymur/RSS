import * as constants from './constants.js';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';

const initialState = {
    groups: [],
    feeds: [],
    posts: [],
    currentFeed: {},
    currentFeedId: '',
    currentPostId: '',
    postsLoading: false
};

function homeReducer(state = initialState, action = {}) {
    let feedIndex, /*postIndex, */feeds;

    switch (action.type) {
		case constants.LOAD_FEEDS_SUCCESS:
			return { ...state, feeds: action.feeds, groups: action.groups };

        case constants.LOAD_FEED:
			return { ...state, currentPost: false };

		case constants.SELECT_FEED:
			const activeFeed = find(state.feeds, { id: action.id });
			return { ...state, currentFeedId: activeFeed.id, posts: activeFeed.posts };

		case constants.LOAD_FEED_START:
			feedIndex = findIndex(state.feeds, { id: action.id });
			feeds = state.feeds.slice();
			feeds[feedIndex].loading = true;

			return { ...state, feeds, postsLoading: true };

        case constants.LOAD_FEED_END:
			return state;

        case constants.LOAD_FEED_SUCCESS:
			feedIndex = findIndex(state.feeds, { id: action.feed.id });
			feeds = state.feeds.slice();
			feeds[feedIndex] = action.feed;

			return { ...state, feeds, postsLoading: false, currentFeedId: action.feed.id, posts: action.feed.posts };

		case constants.SELECT_POST:
			return { ...state, currentPostId: action.id };

        case constants.MARK_READ:
			return state;
            // feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
            // postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);
			//
            // return state
            //     .setIn(['feeds', feedIndex, 'unread'], state.get('feeds').get(feedIndex).get('unread') - 1)
            //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], true)
            //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], false)
            // ;

        case constants.MARK_READ_FAILURE:
			return state;
            // feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
            // postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);
			//
            // return state
            //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], false)
            //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], true)
            // ;

        default:
            return state;
    }
}

export default homeReducer;
