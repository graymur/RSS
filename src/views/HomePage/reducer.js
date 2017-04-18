import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
    groups: [],
    feeds: [],
    posts: [],
    currentFeed: {},
    currentFeedId: '',
    currentPostId: '',
    postsLoading: false
};

export default handleActions({
	[actions.fetchFeedsSuccess]: (state, action) => {
		return { ...state, feeds: action.payload.feeds, groups: action.payload.groups };
	},
	[actions.fetchFeed]: (state, action) => {
		return { ...state, currentPost: false };
	},
	[actions.selectFeed]: (state, action) => {
		const activeFeed = find(state.feeds, { id: action.payload });
		return { ...state, currentFeedId: activeFeed.id, posts: activeFeed.posts };
	},
	[actions.fetchFeedStart]: (state, action) => {
		const feedIndex = findIndex(state.feeds, { id: action.payload });
		const feeds = state.feeds.slice();
		feeds[feedIndex].loading = true;

		return { ...state, feeds, postsLoading: true };
	},
	[actions.fetchFeedEnd]: (state, action) => {
		return state;
	},
	[actions.fetchFeedSuccess]: (state, action) => {
		const feedIndex = findIndex(state.feeds, { id: action.payload.id });
		const feeds = state.feeds.slice();
		feeds[feedIndex] = action.payload;

		return { ...state, feeds, postsLoading: false, currentFeedId: action.payload.id, posts: action.payload.posts };
	},
	[actions.selectPost]: (state, action) => {
		return { ...state, currentPostId: action.payload };
	},
	[actions.markRead]: (state, { payload: { feedId, id } }) => {
		const feeds = state.feeds.slice()
		const feedIndex = findIndex(feeds, { id: feedId });

		feeds[feedIndex].posts = [...feeds[feedIndex].posts];

		const postIndex = findIndex(feeds[feedIndex].posts, { id });

		feeds[feedIndex].posts[postIndex].read = true;

		console.log(feeds[feedIndex].unread)

		feeds[feedIndex].unread -= 1;

		console.log(feeds[feedIndex].unread)

		// console.dir(feeds[feedIndex].posts[postIndex]);

		// const feeds = state.feeds.slice();
		// const feed = find(feeds, { id: feedId });
		// const posts = feed.posts.slice();
		// const post = find(posts, { id });

		return { ...state, feeds: feeds };
	},
	[actions.markReadError]: (state, action) => {
		return state;
	}
}, initialState);

// function homeReducer(state = initialState, action = {}) {
//     let feedIndex, /*postIndex, */feeds;
//
//     switch (action.type) {
// 		case constants.LOAD_FEEDS_SUCCESS:
// 			return { ...state, feeds: action.feeds, groups: action.groups };
//
//         case constants.LOAD_FEED:
// 			return { ...state, currentPost: false };
//
// 		case constants.SELECT_FEED:
// 			const activeFeed = find(state.feeds, { id: action.id });
// 			return { ...state, currentFeedId: activeFeed.id, posts: activeFeed.posts };
//
// 		case constants.LOAD_FEED_START:
// 			feedIndex = findIndex(state.feeds, { id: action.id });
// 			feeds = state.feeds.slice();
// 			feeds[feedIndex].loading = true;
//
// 			return { ...state, feeds, postsLoading: true };
//
//         case constants.LOAD_FEED_END:
// 			return state;
//
//         case constants.LOAD_FEED_SUCCESS:
// 			feedIndex = findIndex(state.feeds, { id: action.feed.id });
// 			feeds = state.feeds.slice();
// 			feeds[feedIndex] = action.feed;
//
// 			return { ...state, feeds, postsLoading: false, currentFeedId: action.feed.id, posts: action.feed.posts };
//
// 		case constants.SELECT_POST:
// 			return { ...state, currentPostId: action.id };
//
//         case constants.MARK_READ:
// 			return state;
//             // feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
//             // postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);
// 			//
//             // return state
//             //     .setIn(['feeds', feedIndex, 'unread'], state.get('feeds').get(feedIndex).get('unread') - 1)
//             //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], true)
//             //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], false)
//             // ;
//
//         case constants.MARK_READ_FAILURE:
// 			return state;
//             // feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
//             // postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);
// 			//
//             // return state
//             //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], false)
//             //     .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], true)
//             // ;
//
//         default:
//             return state;
//     }
// }
//
// export default homeReducer;
