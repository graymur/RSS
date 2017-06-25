import expect from 'expect';
import * as constants from '../constants.js';
import * as actions from '../actions.js';

describe('App Actions', () => {
    describe('checkGroup', () => {
        it('should return the correct type', () => {
            expect(actions.checkGroup('http://ya.ru/')).toEqual({ type: constants.CHECK_FEED, url: 'http://ya.ru/' });
        });
    });

    describe('checkGroupSuccess', () => {
        it('should return the correct type', () => {
            expect(actions.checkGroupSuccess(1)).toEqual({ type: constants.CHECK_FEED_SUCCESS, data: 1 });
        });
    });

    describe('checkGroupFailure', () => {
        it('should return the correct type', () => {
            expect(actions.checkGroupFailure(1)).toEqual({ type: constants.CHECK_FEED_FAILURE, error: 1 });
        });
    });

    describe('resetGroup', () => {
        it('should return the correct type', () => {
            expect(actions.resetGroup()).toEqual({ type: constants.RESET_FEED });
        });
    });

    describe('saveGroup', () => {
        it('should return the correct type', () => {
            expect(actions.saveGroup(1)).toEqual({ type: constants.SAVE_FEED, feed: 1 });
        });
    });

    describe('saveGroupSuccess', () => {
        it('should return the correct type', () => {
            expect(actions.saveGroupSuccess(1)).toEqual({ type: constants.SAVE_FEED_SUCCESS, data: 1 });
        });
    });

    describe('saveGroupFailure', () => {
        it('should return the correct type', () => {
            expect(actions.saveGroupFailure(1)).toEqual({ type: constants.SAVE_FEED_FAILURE, error: 1 });
        });
    });
});