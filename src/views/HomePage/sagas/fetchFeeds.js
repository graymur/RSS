import { call, put, takeLatest } from 'redux-saga/effects';

import { loadingStart, loadingEnd } from 'views/App/actions';
import * as actions from '../actions.js';

import api from 'utils/api';

export function * fetchFeeds(action) {
    try {
        yield put(loadingStart());

        const result = yield call(api.fetchFeeds);
		console.log(result);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put(actions.fetchFeedsSuccess(result.feeds, result.groups));
    } catch (e) {
        console.log('fetchFeeds ERROR', e);
		yield put(actions.fetchFeedsError(e));
    } finally {
        yield put(loadingEnd());
    }
}

export default function * fetchFeedsSaga() {
    yield takeLatest(actions.fetchFeeds.toString(), fetchFeeds);
}
