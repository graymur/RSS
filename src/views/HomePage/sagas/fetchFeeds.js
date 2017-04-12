import { call, put, takeLatest } from 'redux-saga/effects';

import * as constants from '../constants';
import * as appAction from 'views/App/actions';

import api from 'utils/api';

export function * fetchFeeds(action) {
    try {
        yield put(appAction.loadingStart());

        const result = yield call(api.fetchFeeds);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put({ type: constants.LOAD_FEEDS_SUCCESS, ...result });
    } catch (e) {
        console.log('fetchFeeds ERROR', e);
        yield put({ type: constants.LOAD_FEEDS_FAILURE, error: e });
    } finally {
        yield put(appAction.loadingEnd());
    }
}

export default function * fetchFeedsSaga() {
    yield takeLatest(constants.LOAD_FEEDS, fetchFeeds);
}
