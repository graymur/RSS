import { createAction } from 'redux-actions';

export const fetchFeeds = createAction('HomePage.fetchFeeds', () => {});
export const fetchFeedsSuccess = createAction('HomePage.fetchFeedsSuccess', (feeds, groups) => ({ feeds, groups }));
export const fetchFeedsError = createAction('HomePage.fetchFeedsError', error => error);

export const selectGroup = createAction('HomePage.selectGroup', id => id);
export const updateGroupData = createAction('HomePage.updateGroupData', group => group);

export const selectFeed = createAction('HomePage.selectFeed', id => id);
export const updateFeedData = createAction('HomePage.updateFeedData', feed => feed);
export const updateFeedError = createAction('HomePage.updateFeedError', error => error);
export const updateFeedPosts = createAction('HomePage.updateFeedPosts', id => id);

export const fetchPostsStart = createAction('HomePage.fetchPostsStart', () => {});
export const fetchPostsSuccess = createAction('HomePage.fetchPostsSuccess', posts => posts);
export const fetchPostsError = createAction('HomePage.fetchPostsError', error => error);
export const fetchPostsEnd = createAction('HomePage.fetchPostsEnd', () => {});

export const selectPost = createAction('HomePage.selectPost', id => id);
export const markRead = createAction('HomePage.markRead', (id, feedId) => ({ id, feedId }));
export const markReadError = createAction('HomePage.markReadError', (id, feedId, error) => ({ id, feedId, error }));

export const feedDragStart = createAction('HomePage.feedDragStart', id => id);
export const feedDragEnd = createAction('HomePage.feedDragEnd', id => id);
export const setGroupsIdsToBeDroppedOn = createAction('HomePage.setGroupsIdsToBeDroppedOn', ids => ids);
export const moveFeedToGroup = createAction('HomePage.moveFeedToGroup', (feedId, groupId) => ({ feedId, groupId }));
