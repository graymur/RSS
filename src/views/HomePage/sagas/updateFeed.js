import {call, put, takeEvery} from 'redux-saga/effects';

import * as actions from '../actions.js';

import api from 'utils/api';

export function * updateFeed({payload: id}) {
	try {
		yield put(actions.fetchFeedStart(id));

		const result = yield call(api.updateFeed, id);

		if (result.error) {
			throw new Error(result.error);
		}

		yield put(actions.fetchFeedSuccess(result));
	} catch (e) {
		console.log('updateFeed ERROR', e);
		yield put(actions.updateFeedError(e));
	} finally {
		yield put(actions.fetchFeedEnd(id));
	}
}

export default function * updateFeedSaga() {
	yield takeEvery(actions.updateFeed.toString(), updateFeed);
}
