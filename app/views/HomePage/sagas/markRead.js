//import { take } from 'redux-saga';
import { call, put, fork, take } from 'redux-saga/effects';

import * as constants from '../constants.js';
import * as actions from '../actions.js';

import api from 'utils/api.js';

export function* markRead(id, feedId) {
    try {
        const result = yield call(api.markRead, id, feedId);

        if (result.error) {
            throw new Error(result.error);
        }
    } catch (e) {
        yield put(actions.markReadError(id, feedId, e));
    }
}

export default function* markReadSaga() {
    while (true) {
        const { id, feedId } = yield take(constants.MARK_READ);
        yield fork(markRead, id, feedId);
    }
}
