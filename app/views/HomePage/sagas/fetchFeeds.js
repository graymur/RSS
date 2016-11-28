import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from '../constants.js';
import * as appConstants from 'views/App/constants.js';
//import * as actions from '../actions.js';

import api from 'utils/api.js';

export function* fetchFeeds(action) {
    try {
        yield put({ type: appConstants.LOADING_START });

        const result = yield call(api.fetchFeeds);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put({ type: constants.LOAD_FEEDS_SUCCESS, ...result });
    } catch (e) {
        console.log('fetchFeeds ERROR', e);
        yield put({ type: constants.LOAD_FEEDS_FAILURE, error: e });
    } finally {
        yield put({ type: appConstants.LOADING_END });
    }
}

export default function* fetchFeedsSaga() {
    yield * takeLatest(constants.LOAD_FEEDS, fetchFeeds);
}
