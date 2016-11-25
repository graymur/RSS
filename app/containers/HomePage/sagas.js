import { takeLatest, takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as constants from './constants.js';
import * as appConstants from 'containers/App/constants.js';
import * as actions from './actions.js';

import api from 'utils/api.js';

function* fetchFeeds(action) {
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

function* fetchFeedsSaga() {
    yield * takeLatest(constants.LOAD_FEEDS, fetchFeeds);
}

function* fetchFeed(action) {
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

function* fetchFeedSaga() {
    yield * takeLatest(constants.LOAD_FEED, fetchFeed);
}

function* updateFeed(action) {
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

function* updateFeedSaga() {
    yield * takeEvery(constants.UPDATE_FEED, updateFeed);
}

export default [fetchFeedsSaga, fetchFeedSaga, updateFeedSaga];
