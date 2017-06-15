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
	homeState => (homeState && homeState.posts) || []
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

export const selectCurrentPosts = () => createSelector(
	[selectPosts(), selectCurrentFeedId(), selectCurrentGroupId()],
	(posts, currentFeedId, currentGroupId) => {
		if (currentFeedId) {
			return posts.filter(x => x.feed === currentFeedId);
		} else if (currentGroupId) {
			return [];
		}

		return [];
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
