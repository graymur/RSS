import {put, takeEvery, select} from 'redux-saga/effects';
import find from 'lodash/find';

import * as actions from '../actions';
import {selectFeeds} from 'views/HomePage/selectors';
import {fetchFeeds} from 'views/HomePage/sagas/fetchFeeds';

/**
 * Save feed
 * @param action
 */
export function * editFeed({payload}) {
	try {
		let feeds = yield select(selectFeeds());

		if (!feeds || feeds.length === 0) {
			yield * fetchFeeds();
			feeds = yield select(selectFeeds());
		}

		let feed = find(feeds, {id: payload});

		if (!feed) {
			throw new Error('Feed not found');
		}

		feed = {...feed, posts: undefined};

		yield put(actions.clearFeedData());
		yield put(actions.setFeedToEdit(feed));
	} catch (e) {
		yield put(actions.saveFeedFailure(e));
	}
}

export default function * editFeedSaga() {
	yield takeEvery(actions.editFeed.toString(), editFeed);
}
