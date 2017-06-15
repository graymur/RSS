import {put, select, takeLatest} from 'redux-saga/effects';

import * as actions from '../actions.js';
import {selectCurrentPosts} from '../selectors.js';
import api from 'utils/api';

export function * selectFeed({payload: id}) {
	try {
		let posts = yield select(selectCurrentPosts());

		if (!posts || !posts.length) {
			yield put(actions.fetchPostsStart());
			posts = yield api.posts({feedId: id});
			yield put(actions.fetchPostsSuccess(posts));
		}
	} catch (e) {
		yield put(actions.fetchPostsError(e));
	} finally {
		yield put(actions.fetchPostsEnd());
	}
}

export default function * selectFeedSaga() {
	yield takeLatest(actions.selectFeed.toString(), selectFeed);
}
