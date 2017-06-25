import {take, select, put, call} from 'redux-saga/effects';

import * as actions from '../actions';
import * as selectors from '../selectors';

export function * dragFeed(id) {
	try {
		const feeds = yield select(selectors.selectFeeds());
		const groups = yield select(selectors.selectGroups());
		const feed = feeds.find(feed => feed.id === id);
		const availableGroupsId = groups.filter(group => group.id !== feed.group).map(group => group.id);
		yield put(actions.setGroupsIdsToBeDroppedOn(availableGroupsId));
	} catch (e) {
		console.log(e);
	}
}

export default function * dragFeedSaga() {
	while (true) {
		let action = yield take(actions.feedDragStart.toString());
		yield call(dragFeed, action.payload);
	}
}
