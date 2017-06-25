import {call, takeLatest} from 'redux-saga/effects';
import * as actions from '../actions';
import api from 'utils/api';

export function * moveFeedToGroup({payload: {feedId, groupId}}) {
	try {
		yield call(api.moveFeedToGroup, {feedId, groupId});
	} catch (e) {
		console.log(e);
	}
}

export default function * moveFeedToGroupSaga() {
	yield takeLatest(actions.moveFeedToGroup.toString(), moveFeedToGroup);
}
