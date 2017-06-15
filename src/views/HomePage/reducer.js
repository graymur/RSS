// import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {handleActions} from 'redux-actions';
import * as actions from './actions';

const initialState = {
	groups: [],
	feeds: [],
	posts: [],
	postsById: {},
	currentGroupId: undefined,
	currentFeedId: undefined,
	currentPostId: undefined,
	postsLoading: false
};

export default handleActions({
	[actions.fetchFeedsSuccess]: (state, action) => ({...state, feeds: action.payload.feeds, groups: action.payload.groups}),

	[actions.selectFeed]: (state, {payload}) => ({...state, currentFeedId: payload, currentGroupId: undefined}),
	// [actions.fetchFeed]: (state, action) => {
	// 	return {...state, currentPost: false};
	// },
	// [actions.fetchFeedStart]: (state, action) => {
	// 	const feedIndex = findIndex(state.feeds, {id: action.payload});
	// 	const feeds = [...state.feeds];
	// 	feeds[feedIndex].loading = true;
	//
	// 	return {...state, feeds, postsLoading: true};
	// },
	// [actions.fetchFeedEnd]: (state, action) => {
	// 	return state;
	// },
	// [actions.fetchFeedSuccess]: (state, action) => {
	// 	const feedIndex = findIndex(state.feeds, {id: action.payload.id});
	// 	const feeds = [...state.feeds];
	// 	feeds[feedIndex] = action.payload;
	//
	// 	return {...state, feeds, postsLoading: false, currentFeedId: action.payload.id, currentGroupId: ''};
	// },
	[actions.markRead]: (state, {payload: {feedId, id}}) => {
		const feeds = [...state.feeds];
		const feedIndex = findIndex(feeds, {id: feedId});
		feeds[feedIndex].posts = [...feeds[feedIndex].posts];
		const postIndex = findIndex(feeds[feedIndex].posts, {id});
		feeds[feedIndex].posts[postIndex].read = true;
		feeds[feedIndex].unread -= 1;

		return {...state, feeds: feeds, posts: feeds[feedIndex].posts};
	},
	[actions.markReadError]: (state, {payload: {feedId, id}}) => {
		const feeds = [...state.feeds];
		const feedIndex = findIndex(feeds, {id: feedId});
		feeds[feedIndex].posts = [...feeds[feedIndex].posts];
		const postIndex = findIndex(feeds[feedIndex].posts, {id});
		feeds[feedIndex].posts[postIndex].read = false;
		feeds[feedIndex].unread += 1;

		return {...state, feeds: feeds, posts: feeds[feedIndex].posts};
	},
	[actions.updateFeedData]: (state, {payload}) => {
		const feeds = [...state.feeds];
		let feedIndex = findIndex(feeds, {id: payload.id});

		if (feedIndex < 0) {
			feeds.push(payload);
		} else {
			payload.posts = feeds[feedIndex].posts;
			feeds[feedIndex] = payload;
		}

		return {...state, feeds: feeds};
	},
	[actions.selectGroup]: (state, {payload}) => ({...state, currentGroupId: payload, currentFeedId: undefined, currentPostId: undefined}),

	[actions.fetchPostsStart]: (state, action) => ({...state, postsLoading: true}),
	[actions.fetchPostsEnd]: (state, action) => ({...state, postsLoading: false}),
	[actions.fetchPostsSuccess]: (state, {payload}) => {
		const newState = {...state};

		const postsToAdd = payload.reduce((carry, post) => {
			if (!newState.postsById[post.id]) {
				carry.push(post);
				newState.postsById[post.id] = 1;
			}

			return carry;
		}, []);

		newState.posts = newState.posts.concat(postsToAdd);

		return newState;
	},
	[actions.fetchPostsError]: (state, action) => ({...state, postsLoading: false}),
	[actions.selectPost]: (state, action) => ({...state, currentPostId: action.payload})
}, initialState);
