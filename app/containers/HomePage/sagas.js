/**
 * Gets the repositories of the user from Github
 */

import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from './constants.js';
import * as appConstants from 'containers/App/constants.js';

import api from 'utils/api.js';

function* fetchFeeds(action) {
    try {
        yield put({ type: appConstants.LOADING_START });

        const result = yield call(api.fetchFeeds);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put({ type: constants.LOAD_FEEDS_SUCCESS, data: result });
    } catch (e) {
        yield put({ type: constants.LOAD_FEEDS_FAILURE, error: e });
    } finally {
        yield put({ type: appConstants.LOADING_END });
    }
}

function* fetchFeedsSaga() {
    yield * takeLatest(constants.LOAD_FEEDS, fetchFeeds);
}

export default [fetchFeedsSaga];
