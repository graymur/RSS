import { takeLatest } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import * as constants from '../constants.js';
import * as actions from '../actions.js';
import { selectPosts } from '../selectors.js';
import { fetchFeed } from './fetchFeed.js';

export function* selectFeed(action) {
    try {
        const posts = yield select(selectPosts());

        if (!posts || !posts.length) {
            yield * fetchFeed({ id: action.id });
        }
    } catch (e) {
        yield put(actions.fetchFeedError(e));
    }
}

export default function* selectFeedSaga() {
    yield * takeLatest(constants.SELECT_FEED, selectFeed);
}