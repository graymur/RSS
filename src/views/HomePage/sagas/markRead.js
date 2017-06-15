import {call, put, fork, take} from 'redux-saga/effects';
import * as actions from '../actions';
import api from 'utils/api';

export function * markRead(id, feedId) {
	try {
		const result = yield call(api.markRead, id, feedId);

		if (result.error) {
			throw new Error(result.error);
		}
	} catch (e) {
		yield put(actions.markReadError(id, feedId, e));
	}
}

export default function * markReadSaga() {
	while (true) {
		const action = yield take(actions.markRead.toString());
		yield fork(markRead, action.payload.id, action.payload.feedId);
	}
}
