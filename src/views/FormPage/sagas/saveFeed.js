import {call, put, takeEvery} from 'redux-saga/effects';

// import * as constants from '../constants.js';
import * as actions from '../actions';
import {updateFeedData} from 'views/HomePage/actions';

import api from 'utils/api.js';

/**
 * Save feed
 * @param action
 */
export function * saveFeed(action) {
	try {
		const data = yield call(api.saveFeed, action.payload);

		if (data.error) {
			throw new Error(data.error);
		}

		yield put(actions.setFeedToEdit(data.feed));
		yield put(updateFeedData(data.feed));
		yield put(actions.saveFeedSuccess(data));
	} catch (e) {
		yield put(actions.saveFeedFailure(e));
	}
}

export default function * saveFeedSaga() {
	yield takeEvery(actions.saveFeed.toString(), saveFeed);
}
