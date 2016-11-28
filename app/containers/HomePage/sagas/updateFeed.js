import { takeLatest, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from '../constants.js';
import * as appConstants from 'containers/App/constants.js';
import * as actions from '../actions.js';

import api from 'utils/api.js';

export function* updateFeed(action) {
    try {
        yield put(actions.fetchFeedStart(action.id));

        const result = yield call(api.updateFeed, action.id);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put(actions.fetchFeedSuccess(result));
    } catch (e) {
        console.log('updateFeed ERROR', e);
        yield put(actions.updateFeedError(e));
    } finally {
        yield put(actions.fetchFeedEnd(action.id));
    }
}

export default function* updateFeedSaga() {
    yield * takeEvery(constants.UPDATE_FEED, updateFeed);
}
