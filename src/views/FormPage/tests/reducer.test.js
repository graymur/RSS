import expect from 'expect';
import formReducer, { initialState } from '../reducer';
import * as actions from '../actions';
import { fromJS } from 'immutable';

describe('formReducer', () => {
    let state;

    beforeEach(() => {
        state = initialState;
    });

    it('should return the initial state', () => {
        expect(formReducer(undefined, {})).toEqual(state);
    });

    it('should handle the checkFeed action correctly', () => {
        const updatedState = state
            .set('loading', true)
            .set('error', false)
        ;

        expect(formReducer(state, actions.checkFeed('http://google.com/'))).toEqual(updatedState);
    });

    it('should handle the checkFeedSuccess action correctly', () => {
        const response = {
            url: 'http://google.com/',
            title: 'Feed title',
            realTitle: 'Feed title'
        };

        const updatedState = state
            .set('loading', false)
            .set('error', false)
            .set('valid', true)
            .set('data', response)
        ;

        expect(formReducer(state, actions.checkFeedSuccess(response))).toEqual(updatedState);
    });

    it('should handle the checkFeedFailure action correctly', () => {
        const updatedState = state
            .set('loading', false)
            .set('error', 'error')
            .set('valid', false)
            .set('data', {})
        ;

        expect(formReducer(state, actions.checkFeedFailure('error'))).toEqual(updatedState);
    });

    it('should handle the resetFeed action correctly', () => {
        const updatedState = state.set('loading', true).set('loading', false);
        expect(formReducer(state, actions.resetFeed())).toEqual(updatedState);
    });

    it('should handle the saveFeed action correctly', () => {
        const feed = {
            url: 'http://google.com/',
            title: 'Feed title'
        };

        const updatedState = state.set('loading', true);

        expect(formReducer(state, actions.saveFeed(feed))).toEqual(updatedState);
    });

    it('should handle the saveFeedSuccess action correctly', () => {
        const feed = {
            url: 'http://google.com/',
            title: 'Feed title'
        };

        const updatedState = state
            .set('loading', false)
            .set('saved', true)
        ;

        expect(formReducer(state, actions.saveFeedSuccess(feed))).toEqual(updatedState);
    });

    it('should handle the saveFeedFailure action correctly', () => {
        const updatedState = state
            .set('loading', false)
            .set('saved', false)
            .set('error', 'error')
        ;

        expect(formReducer(state, actions.saveFeedFailure('error'))).toEqual(updatedState);
    });
});
