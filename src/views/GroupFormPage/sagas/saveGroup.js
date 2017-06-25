import {call, put, takeEvery} from 'redux-saga/effects';

// import * as constants from '../constants.js';
import * as actions from '../actions';
import {updateGroupData} from 'views/HomePage/actions';

import api from 'utils/api.js';

/**
 * Save feed
 * @param action
 */
export function * saveGroup(action) {
	try {
		const data = yield call(api.saveGroup, action.payload);

		if (data.error) {
			throw new Error(data.error);
		}

		yield put(actions.setGroupToEdit(data.group));
		yield put(updateGroupData(data.group));
		yield put(actions.saveGroupSuccess(data.group));
	} catch (e) {
		yield put(actions.saveGroupFailure(e));
	}
}

export default function * saveGroupSaga() {
	yield takeEvery(actions.saveGroup.toString(), saveGroup);
}
