import {call, put, takeEvery} from 'redux-saga/effects';

import * as actions from '../actions.js';

import api from 'utils/api';

export function * updateFeed({payload: id}) {
	try {
		yield put(actions.fetchPostsStart());

		const result = yield call(api.updateFeed, id);

		if (result.error) {
			throw new Error(result.error);
		}

		yield put(actions.fetchFeedSuccess(result));
	} catch (e) {
		yield put(actions.updateFeedError(e));
	} finally {
		yield put(actions.fetchPostsEnd());
	}
}

export default function * updateFeedSaga() {
	yield takeEvery(actions.updateFeed.toString(), updateFeed);
}
