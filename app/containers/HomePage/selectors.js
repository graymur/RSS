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
    selectHome(),
    homeState => homeState.get('posts').toJS()
);

export const selectCurrentFeed = () => createSelector(
    selectHome(),
    homeState => homeState.get('currentFeed').toJS()
);

export const selectFeed = id => createSelector(
    selectHome(),
    homeState => {
        //const feed = selectFeeds();
    }
);