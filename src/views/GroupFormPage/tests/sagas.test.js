import expect from 'expect';
import { call, put } from 'redux-saga/effects';

import { checkGroup, saveGroup } from '../sagas.js';
import * as actions from '../actions.js';
import api from 'utils/api.js';

describe('checkGroup saga', () => {
    let checkGroupGenerator;

    beforeEach(() => {
        const url = 'http://google.com/';
        checkGroupGenerator = checkGroup(actions.checkGroup(url));

        expect(checkGroupGenerator.next().value).toEqual(call(api.checkGroup, url));
    });

    it('should dispatch the checkGroupSuccess action if it requests the data successfully', () => {
        const response = { valid: 1 };
        expect(checkGroupGenerator.next(response).value).toEqual(put(actions.checkGroupSuccess(response)));
    });

    it('should call the checkGroupFailure action if the response errors', () => {
        const response = { error: 1 };
        expect(checkGroupGenerator.throw(response).value).toEqual(put(actions.checkGroupFailure(response)));
    });
});

describe('saveGroup saga', () => {
    let saveGroupGenerator;

    const feed = {
        url: 'http://google.com/',
        title: 'Group title',
        realTitle: 'Group real title'
    };

    beforeEach(() => {
        saveGroupGenerator = saveGroup(actions.saveGroup(feed));
        expect(saveGroupGenerator.next().value).toEqual(call(api.saveGroup, feed));
    });

    it('should dispatch the saveGroupSuccess action if it requests the data successfully', () => {
        const response = { success: true };
        expect(saveGroupGenerator.next(response).value).toEqual(put(actions.saveGroupSuccess(response)));
    });

    it('should call the saveGroupFailure action if the response errors', () => {
        const response = { error: 1 };
        expect(saveGroupGenerator.throw(response).value).toEqual(put(actions.saveGroupFailure(response)));
    });
});
