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
		const response = yield call(api.saveFeed, action.payload);

		if (response.error) {
			throw new Error(response.error);
		}

		yield put(actions.setFeedToEdit(response.feed));
		yield put(updateFeedData(response.feed));
		yield put(actions.saveFeedSuccess(response));
	} catch (e) {
		yield put(actions.saveFeedFailure(e));
	}
}

export default function * saveFeedSaga() {
	yield takeEvery(actions.saveFeed.toString(), saveFeed);
}
