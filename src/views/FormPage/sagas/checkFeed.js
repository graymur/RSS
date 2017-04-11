import { call, put, takeEvery } from 'redux-saga/effects';

import * as constants from '../constants.js';

import api from 'utils/api.js';

/**
 * Check feed
 */
export function * checkFeed(action) {
	console.log('yes');
	try {
		const data = yield call(api.checkFeed, action.url);

		if (data.error) {
			throw new Error(data.error);
		}

		yield put({ type: constants.CHECK_FEED_SUCCESS, data });
	} catch (e) {
		yield put({ type: constants.CHECK_FEED_FAILURE, error: e });
	}
}

export default function * checkFeedSaga() {
	yield takeEvery(constants.CHECK_FEED, checkFeed);
}
