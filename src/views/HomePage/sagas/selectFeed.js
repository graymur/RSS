import { put, select, takeLatest } from 'redux-saga/effects';

// import * as constants from '../constants.js';
import * as actions from '../actions.js';
import { selectPosts } from '../selectors.js';
import { fetchFeed } from './fetchFeed.js';

export function * selectFeed({ payload: id }) {
    try {
        const posts = yield select(selectPosts());

        if (!posts || !posts.length) {
            yield * fetchFeed({ payload: id });
        }
    } catch (e) {
        yield put(actions.fetchFeedError(e));
    }
}

export default function * selectFeedSaga() {
    yield takeLatest(actions.selectFeed.toString(), selectFeed);
}
