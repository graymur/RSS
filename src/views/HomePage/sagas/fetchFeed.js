import { call, put, takeLatest } from 'redux-saga/effects';

// import * as constants from '../constants.js';
import * as actions from '../actions.js';

import api from 'utils/api.js';

export function * fetchFeed({ payload: id }) {
    try {
        yield put(actions.fetchFeedStart(id));

        const result = yield call(api.fetchFeed, id);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put(actions.fetchFeedSuccess(result));
    } catch (e) {
        console.log('fetchFeed ERROR', e);
        yield put(actions.fetchFeedError(e));
    } finally {
        yield put(actions.fetchFeedEnd(id));
    }
}

export default function * fetchFeedSaga() {
    yield takeLatest(actions.fetchFeed.toString(), fetchFeed);
}
