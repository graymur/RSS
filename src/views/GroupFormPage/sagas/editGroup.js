import {put, takeEvery, select} from 'redux-saga/effects';
import find from 'lodash/find';

import * as actions from '../actions';
import {selectGroups} from 'views/HomePage/selectors';
import {fetchFeeds} from 'views/HomePage/sagas/fetchFeeds';

/**
 * Save feed
 * @param action
 */
export function * editGroup({payload}) {
	try {
		let groups = yield select(selectGroups());

		if (!groups || groups.length === 0) {
			yield * fetchFeeds();
			groups = yield select(selectGroups());
		}

		let group = find(groups, {id: payload});

		if (!group) {
			throw new Error('Group not found');
		}

		yield put(actions.clearGroupData());
		yield put(actions.setGroupToEdit(group));
	} catch (e) {
		yield put(actions.saveGroupFailure(e));
	}
}

export default function * editGroupSaga() {
	yield takeEvery(actions.editGroup.toString(), editGroup);
}
