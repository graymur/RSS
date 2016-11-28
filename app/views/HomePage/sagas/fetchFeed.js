import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from '../constants.js';
import * as actions from '../actions.js';

import api from 'utils/api.js';

export function* fetchFeed(action) {
    try {
        yield put(actions.fetchFeedStart(action.id));

        const result = yield call(api.fetchFeed, action.id);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put(actions.fetchFeedSuccess(result));
    } catch (e) {
        console.log('fetchFeed ERROR', e);
        yield put(actions.fetchFeedError(e));
    } finally {
        yield put(actions.fetchFeedEnd(action.id));
    }
}

export default function* fetchFeedSaga() {
    yield * takeLatest(constants.LOAD_FEED, fetchFeed);
}