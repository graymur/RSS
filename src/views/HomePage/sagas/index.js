import fetchFeedSaga from './fetchFeed';
import fetchFeedsSaga from './fetchFeeds';
import markReadSaga from './markRead';
import selectFeedSaga from './selectFeed';
import updateFeedSaga from './updateFeed';

export default [
	fetchFeedSaga(),
	fetchFeedsSaga(),
	markReadSaga(),
	selectFeedSaga(),
	updateFeedSaga()
];
