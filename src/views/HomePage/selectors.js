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
			group.feeds = feeds.filter(feed => {
				return String(feed.group) === String(group.id);
			});

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

		currentPosts = currentPosts.sort((a, b) => a.date < b.date);
		return currentPosts;
	}
);

export const selectCurrentPost = () => createSelector(
	[selectCurrentPosts(), selectCurrentPostId()],
	(posts, currentPostId) => {
		if (!currentPostId) return false;

		const found = (posts || []).filter(post => post.id === currentPostId);
		return found.length ? found[0] : false;
	}
);

export const selectCurrentGroupId = id => createSelector(
	selectHome(),
	homeState => homeState.currentGroupId
);
