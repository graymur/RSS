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
	[actions.markRead]: (state, {payload: {feedId, id}}) => {
		const feeds = [...state.feeds];
		const feedIndex = findIndex(feeds, {id: feedId});
		feeds[feedIndex].unread -= 1;

		const posts = [...state.posts];
		const postIndex = findIndex(posts, {id: id});
		posts[postIndex].read = true;

		return {...state, feeds, posts};
	},
	[actions.markReadError]: (state, {payload: {feedId, id}}) => {
		const feeds = [...state.feeds];
		const feedIndex = findIndex(feeds, {id: feedId});
		feeds[feedIndex].unread += 1;

		const posts = [...state.posts];
		const postIndex = findIndex(posts, {id: id});
		posts[postIndex].read = false;

		return {...state, feeds, posts};
	},
	[actions.updateFeedData]: (state, {payload}) => {
		const feeds = [...state.feeds];
		let feedIndex = findIndex(feeds, {id: payload.id});

		if (feedIndex < 0) {
			feeds.push(payload);
		} else {
			feeds[feedIndex] = payload;
		}

		return {...state, feeds};
	},
	[actions.selectGroup]: (state, {payload}) => ({...state, currentGroupId: payload, currentFeedId: undefined, currentPostId: undefined}),
	[actions.updateGroupData]: (state, {payload}) => {
		const groups = [...state.groups];
		let groupIndex = findIndex(groups, {id: payload.id});

		if (groupIndex < 0) {
			groups.push(payload);
		} else {
			groups[groupIndex] = payload;
		}

		return {...state, groups};
	},
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

		if (postsToAdd.length) {
			newState.posts = newState.posts.concat(postsToAdd).sort((a, b) => a.date < b.date);
		}

		return newState;
	},
	[actions.fetchPostsError]: (state, action) => ({...state, postsLoading: false}),
	[actions.selectPost]: (state, action) => ({...state, currentPostId: action.payload})
}, initialState);
