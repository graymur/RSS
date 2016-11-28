import updateFeedSaga from './sagas/updateFeed.js';
import fetchFeedSaga from './sagas/fetchFeed.js';
import fetchFeedsSaga from './sagas/fetchFeeds.js';

export default [fetchFeedsSaga, fetchFeedSaga, updateFeedSaga];
