import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions';

import api from 'utils/api.js';

/**
 * Check feed
 */
export function * checkFeed(action) {
	try {
		const data = yield call(api.checkFeed, action.payload);

		if (data.error) {
			throw new Error(data.error);
		}

		yield put(actions.checkFeedSuccess(data));
	} catch (e) {
		yield put(actions.checkFeedFailure(e));
	}
}

export default function * checkFeedSaga() {
	yield takeEvery(actions.checkFeed.toString(), checkFeed);
}
