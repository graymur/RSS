import expect from 'expect';
import { call, put } from 'redux-saga/effects';

import { checkFeed, saveFeed } from '../sagas.js';
import * as actions from '../actions.js';
import api from 'utils/api.js';

describe('checkFeed saga', () => {
    let checkFeedGenerator;

    beforeEach(() => {
        const url = 'http://google.com/';
        checkFeedGenerator = checkFeed(actions.checkFeed(url));

        expect(checkFeedGenerator.next().value).toEqual(call(api.checkFeed, url));
    });

    it('should dispatch the checkFeedSuccess action if it requests the data successfully', () => {
        const response = { valid: 1 };
        expect(checkFeedGenerator.next(response).value).toEqual(put(actions.checkFeedSuccess(response)));
    });

    it('should call the checkFeedFailure action if the response errors', () => {
        const response = { error: 1 };
        expect(checkFeedGenerator.throw(response).value).toEqual(put(actions.checkFeedFailure(response)));
    });
});

describe('saveFeed saga', () => {
    let saveFeedGenerator;

    const feed = {
        url: 'http://google.com/',
        title: 'Feed title',
        realTitle: 'Feed real title'
    };

    beforeEach(() => {
        saveFeedGenerator = saveFeed(actions.saveFeed(feed));
        expect(saveFeedGenerator.next().value).toEqual(call(api.saveFeed, feed));
    });

    it('should dispatch the saveFeedSuccess action if it requests the data successfully', () => {
        const response = { success: true };
        expect(saveFeedGenerator.next(response).value).toEqual(put(actions.saveFeedSuccess(response)));
    });

    it('should call the saveFeedFailure action if the response errors', () => {
        const response = { error: 1 };
        expect(saveFeedGenerator.throw(response).value).toEqual(put(actions.saveFeedFailure(response)));
    });
});
