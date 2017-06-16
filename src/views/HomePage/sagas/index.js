import updateFeedPostsSaga from './updateFeedPosts';
import fetchFeedsSaga from './fetchFeeds';
import markReadSaga from './markRead';
import selectFeedSaga from './selectFeed';
import selectGroupSaga from './selectGroup';

export default [
	updateFeedPostsSaga(),
	fetchFeedsSaga(),
	markReadSaga(),
	selectFeedSaga(),
	selectGroupSaga()
];
