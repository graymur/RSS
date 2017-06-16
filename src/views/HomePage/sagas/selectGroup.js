import {select, call, put, takeLatest} from 'redux-saga/effects';

import * as actions from '../actions.js';
import * as selectors from '../selectors.js';
import api from 'utils/api.js';

export function * selectGroup({payload: id}) {
	try {
		const posts = yield select(selectors.selectCurrentPosts());

		if (!posts.length) {
			const result = yield call(api.posts, {groupId: id});

			if (result.error) {
				throw new Error(result.error);
			}

			yield put(actions.fetchPostsSuccess(result));
		}
	} catch (e) {
		console.log('selectGroup error', e);
		yield put(actions.fetchPostsError(e));
	}
}

export default function * selectGroupSaga() {
	yield takeLatest(actions.selectGroup.toString(), selectGroup);
}
