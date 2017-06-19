import {createSelector} from 'reselect';

const selectHome = () => state => state.home;

export const selectFeeds = () => createSelector(
	selectHome(),
	homeState => homeState.feeds
);

export const selectGroups = () => createSelector(
	selectHome(),
	homeState => homeState.groups
);

export const selectFeedsByGroups = () => createSelector(
	[selectGroups(), selectFeeds()],
	(groups, feeds) => {
		return groups.map(group => {
			group.feeds = feeds.filter(feed => feed.group === group.id);
			return group;
		});
	}
);

export const selectPostsLoading = () => createSelector(
	selectHome(),
	homeState => homeState.postsLoading
);

export const selectPosts = () => createSelector(
	selectHome(),
	homeState => homeState.posts
);

export const selectCurrentFeedId = () => createSelector(
	selectHome(),
	homeState => homeState.currentFeedId
);

export const selectCurrentFeed = () => createSelector(
	[selectFeeds(), selectCurrentFeedId()],
	(feeds, currentFeedId) => {
		const found = feeds.filter(feed => feed.id === currentFeedId);
		return found ? found[0] : false;
	}
);

export const selectCurrentPostId = () => createSelector(
	selectHome(),
	homeState => homeState.currentPostId
);

/**
 * TODO: add custom memoization
 */
export const selectCurrentPosts = () => createSelector(
	[selectPosts(), selectCurrentFeedId(), selectCurrentGroupId(), selectFeeds()],
	(posts, currentFeedId, currentGroupId, feeds) => {
		let currentPosts = [];
		if (currentFeedId) {
			currentPosts = posts.filter(x => x.feed === currentFeedId);
		} else if (currentGroupId) {
			const feedsIds = feeds.filter(feed => feed.group === currentGroupId).map(feed => feed.id);
			currentPosts = posts.filter(post => feedsIds.includes(post.feed));
		}

		return currentPosts;
	}
);

export const selectCurrentPost = () => createSelector(
	[selectCurrentPosts(), selectCurrentPostId()],
	(posts, currentPostId) => {
		if (!currentPostId) return false;
		return posts.find(post => post.id === currentPostId);
	}
);

export const selectCurrentGroupId = id => createSelector(
	selectHome(),
	homeState => homeState.currentGroupId
);

export const selectCurrentGroup = id => createSelector(
	[selectGroups(), selectCurrentGroupId()],
	(groups, currentGroupId) => groups.find(group => group.id === currentGroupId)
);
