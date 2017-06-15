import {call, put, takeLatest} from 'redux-saga/effects';

import * as actions from '../actions.js';
import api from 'utils/api.js';

export function * selectGroup({payload: id}) {
	try {
		const posts = yield call(api.posts, {groupId: id});
		yield put(actions.setCurrentPosts(posts));
	} catch (e) {
		yield put(actions.fetchFeedError(e));
	}
}

export default function * selectGroupSaga() {
	yield takeLatest(actions.selectGroup.toString(), selectGroup);
}
