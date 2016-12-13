import updateFeedSaga from './sagas/updateFeed.js';
import fetchFeedSaga from './sagas/fetchFeed.js';
import fetchFeedsSaga from './sagas/fetchFeeds.js';
import markReadSaga from './sagas/markRead.js';
import selectFeedSaga from './sagas/selectFeed.js';

export default [selectFeedSaga, fetchFeedsSaga, fetchFeedSaga, updateFeedSaga, markReadSaga];
