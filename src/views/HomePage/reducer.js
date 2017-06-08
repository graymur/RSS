import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import {handleActions} from 'redux-actions';
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
		return {...state, feeds: action.payload.feeds, groups: action.payload.groups};
	},
	[actions.fetchFeed]: (state, action) => {
		return {...state, currentPost: false};
	},
	[actions.selectFeed]: (state, action) => {
		const curentFeed = find(state.feeds, {id: action.payload});
		return {...state, currentFeedId: curentFeed.id, posts: curentFeed.posts};
	},
	[actions.fetchFeedStart]: (state, action) => {
		const feedIndex = findIndex(state.feeds, {id: action.payload});
		const feeds = [...state.feeds];
		feeds[feedIndex].loading = true;

		return {...state, feeds, postsLoading: true};
	},
	[actions.fetchFeedEnd]: (state, action) => {
		return state;
	},
	[actions.fetchFeedSuccess]: (state, action) => {
		const feedIndex = findIndex(state.feeds, {id: action.payload.id});
		const feeds = [...state.feeds];
		feeds[feedIndex] = action.payload;

		return {...state, feeds, postsLoading: false, currentFeedId: action.payload.id, posts: action.payload.posts};
	},
	[actions.selectPost]: (state, action) => {
		return {...state, currentPostId: action.payload};
	},
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
	}
}, initialState);
