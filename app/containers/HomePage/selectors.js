import { createSelector } from 'reselect';

const selectHome = () => state => state.get('home');

export const selectFeeds = () => createSelector(
    selectHome(),
    homeState => homeState.get('feeds').toJS()
);

export const selectGroups = () => createSelector(
    selectHome(),
    homeState => homeState.get('groups').toJS()
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
    homeState => homeState.get('postsLoading')
);

export const selectPosts = () => createSelector(
    selectCurrentFeed(),
    currentFeed => currentFeed && currentFeed.posts || []
);

export const selectCurrentFeedId = () => createSelector(
    selectHome(),
    homeState => homeState.get('currentFeedId')
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
    homeState => homeState.get('currentPostId')
);

export const selectCurrentPost = () => createSelector(
    [selectCurrentFeed(), selectCurrentPostId()],
    (currentFeed, currentPostId) => {
        if (!currentPostId) return false;
        if (!currentFeed.id) return false;

        const found = currentFeed.posts.filter(post => post.id === currentPostId);
        return found.length ? found[0] : false;
    }
);

export const selectFeed = id => createSelector(
    selectHome(),
    homeState => {
        //const feed = selectFeeds();
    }
);