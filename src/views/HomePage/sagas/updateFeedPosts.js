import {put, takeLatest} from 'redux-saga/effects';

import * as actions from '../actions.js';
import api from 'utils/api.js';

export function * updateFeedPosts({payload: id}) {
	try {
		yield put(actions.fetchPostsStart());
		const result = yield api.updateFeedPosts(id);

		if (result.error) {
			throw new Error(result.error);
		}

		yield put(actions.fetchPostsSuccess(result.posts));
		yield put(actions.updateFeedData(result.feed));
	} catch (e) {
		yield put(actions.fetchPostsError(e));
	} finally {
		yield put(actions.fetchPostsEnd(id));
	}
}

export default function * updateFeedPostsSaga() {
	try {
		yield takeLatest(actions.updateFeedPosts.toString(), updateFeedPosts);
	} catch (e) {
		console.log(e.message);
	}
}
