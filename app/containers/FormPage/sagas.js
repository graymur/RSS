import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from './constants.js';

import api from 'utils/api.js';

/**
 * Check feed
 */
export function* checkFeed(action) {
    try {
        const data = yield call(api.checkFeed, action.url);

        if (data.error) {
            throw new Error(data.error);
        }

        yield put({ type: constants.CHECK_FEED_SUCCESS, data });
    } catch (e) {
        yield put({ type: constants.CHECK_FEED_FAILURE, error: e });
    }
}

export function* checkFeedSaga() {
    yield * takeEvery(constants.CHECK_FEED, checkFeed);
}

/**
 * Save feed
 * @param action
 */
export function* saveFeed(action) {
    try {
        const data = yield call(api.saveFeed, action.feed);

        if (data.error) {
            throw new Error(data.error);
        }

        yield put({ type: constants.SAVE_FEED_SUCCESS, data });
    } catch (e) {
        yield put({ type: constants.SAVE_FEED_FAILURE, error: e });
    }
}

export function* saveFeedSaga() {
    yield * takeEvery(constants.SAVE_FEED, saveFeed);
}

export default [checkFeedSaga, saveFeedSaga];
