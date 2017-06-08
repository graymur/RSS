import checkFeedSaga from './checkFeed';
import saveFeedSaga from './saveFeed';
import editFeedSaga from './editFeed';

export default [
	checkFeedSaga(),
	saveFeedSaga(),
	editFeedSaga()
];
