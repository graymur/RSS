/**
 * Gets the repositories of the user from Github
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from './constants.js';

import api from 'utils/api.js';

import request from 'utils/request';

function* checkFeed(action) {
    try {
        const result = yield call(api.checkFeed, action.url);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put({ type: constants.CHECK_FEED_SUCCESS, data: result });
    } catch (e) {
        yield put({ type: constants.CHECK_FEED_FAILURE, error: e });
    }
}

function* checkFeedSaga() {
    yield* takeEvery(constants.CHECK_FEED, checkFeed);
}

function* saveFeed(action) {
    try {
        const result = yield call(api.saveFeed, action.feed);

        if (result.error) {
            throw new Error(result.error);
        }

        yield put({ type: constants.SAVE_FEED_SUCCESS, data: result });
    } catch (e) {
        yield put({ type: constants.SAVE_FEED_FAILURE, error: e });
    }
}

function* saveFeedSaga() {
    yield* takeEvery(constants.SAVE_FEED, saveFeed);
}

export default [checkFeedSaga, saveFeedSaga];
