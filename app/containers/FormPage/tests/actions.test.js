import expect from 'expect';
import * as constants from '../constants.js';
import * as actions from '../actions.js';

describe('App Actions', () => {
    describe('checkFeed', () => {
        it('should return the correct type', () => {
            expect(actions.checkFeed('http://ya.ru/')).toEqual({ type: constants.CHECK_FEED, url: 'http://ya.ru/' });
        });
    });

    describe('checkFeedSuccess', () => {
        it('should return the correct type', () => {
            expect(actions.checkFeedSuccess(1)).toEqual({ type: constants.CHECK_FEED_SUCCESS, data: 1 });
        });
    });

    describe('checkFeedFailure', () => {
        it('should return the correct type', () => {
            expect(actions.checkFeedFailure(1)).toEqual({ type: constants.CHECK_FEED_FAILURE, error: 1 });
        });
    });

    describe('resetFeed', () => {
        it('should return the correct type', () => {
            expect(actions.resetFeed()).toEqual({ type: constants.RESET_FEED });
        });
    });

    describe('saveFeed', () => {
        it('should return the correct type', () => {
            expect(actions.saveFeed(1)).toEqual({ type: constants.SAVE_FEED, feed: 1 });
        });
    });

    describe('saveFeedSuccess', () => {
        it('should return the correct type', () => {
            expect(actions.saveFeedSuccess(1)).toEqual({ type: constants.SAVE_FEED_SUCCESS, data: 1 });
        });
    });

    describe('saveFeedFailure', () => {
        it('should return the correct type', () => {
            expect(actions.saveFeedFailure(1)).toEqual({ type: constants.SAVE_FEED_FAILURE, error: 1 });
        });
    });
});