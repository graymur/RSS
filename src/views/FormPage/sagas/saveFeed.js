import { call, put, takeEvery } from 'redux-saga/effects';

import * as constants from '../constants.js';

import api from 'utils/api.js';

/**
 * Save feed
 * @param action
 */
export function * saveFeed(action) {
	try {
		const data = yield call(api.saveFeed, action.feed);

		if (data.error) {
			throw new Error(data.error);
		}

		yield put({ type: constants.SAVE_FEED_SUCCESS, data });
	} catch (e) {
		yield put({ type: constants.SAVE_FEED_FAILURE, error: e });
	}
}

export default function * saveFeedSaga() {
	yield takeEvery(constants.SAVE_FEED, saveFeed);
}
