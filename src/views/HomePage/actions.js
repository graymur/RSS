import { createAction } from 'redux-actions';

export const fetchFeeds = createAction('HomePage.fetchFeeds', () => {});
export const fetchFeedsSuccess = createAction('HomePage.fetchFeedsSuccess', (feeds, groups) => ({ feeds, groups }));
export const fetchFeedsError = createAction('HomePage.fetchFeedsError', error => error);
export const selectFeed = createAction('HomePage.selectFeed', id => id);
export const selectPost = createAction('HomePage.selectPost', id => id);
export const markRead = createAction('HomePage.markRead', (id, feedId) => ({ id, feedId }));
export const markReadError = createAction('HomePage.markReadError', (id, feedId, error) => ({ id, feedId, error }));
export const fetchFeed = createAction('HomePage.fetchFeed', id => id);
export const fetchFeedStart = createAction('HomePage.fetchFeedStart', id => id);
export const fetchFeedEnd = createAction('HomePage.fetchFeedEnd', id => id);
export const fetchFeedSuccess = createAction('HomePage.fetchFeedSuccess', feed => feed);
export const fetchFeedError = createAction('HomePage.fetchFeedError', error => error);
export const updateFeed = createAction('HomePage.updateFeed', id => id);
export const updateFeedData = createAction('HomePage.updateFeedData', feed => feed);
export const updateFeedSuccess = createAction('HomePage.updateFeedSuccess', feed => feed);
export const updateFeedError = createAction('HomePage.updateFeedError', error => error);

// import * as constants from './constants.js';
//
// export const fetchFeeds = () => ({
//     type: constants.LOAD_FEEDS
// });
//
// export const selectFeed = id => ({
//     type: constants.SELECT_FEED,
//     id
// });
//
// export const selectPost = id => ({
//     type: constants.SELECT_POST,
//     id
// });
//
// export const markRead = (id, feedId) => ({
//     type: constants.MARK_READ,
//     id,
//     feedId
// });
//
// export const markReadError = (id, feedId, error) => ({
//     type: constants.MARK_READ_FAILURE,
//     id,
//     feedId,
//     error
// });
//
// export const fetchFeed = id => ({
//     type: constants.LOAD_FEED,
//     id
// });
//
// export const fetchFeedStart = id => ({
//     type: constants.LOAD_FEED_START,
//     id
// });
//
// export const fetchFeedEnd = id => ({
//     type: constants.LOAD_FEED_END,
//     id
// });
//
// export const fetchFeedSuccess = feed => ({
//     type: constants.LOAD_FEED_SUCCESS,
//     feed
// });
//
// export const fetchFeedError = error => ({
//     type: constants.LOAD_FEED_FAILURE,
//     error
// });
//
// export const updateFeed = id => ({
//     type: constants.UPDATE_FEED,
//     id
// });
//
// export const updateFeedSuccess = feed => ({
//     type: constants.UPDATE_FEED_SUCCESS,
//     feed
// });
//
// export const updateFeedError = error => ({
//     type: constants.UPDATE_FEED_FAILURE,
//     error
// });
