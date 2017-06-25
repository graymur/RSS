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

    it('should handle the checkGroup action correctly', () => {
        const updatedState = state
            .set('loading', true)
            .set('error', false)
        ;

        expect(formReducer(state, actions.checkGroup('http://google.com/'))).toEqual(updatedState);
    });

    it('should handle the checkGroupSuccess action correctly', () => {
        const response = {
            url: 'http://google.com/',
            title: 'Group title',
            realTitle: 'Group title'
        };

        const updatedState = state
            .set('loading', false)
            .set('error', false)
            .set('valid', true)
            .set('data', response)
        ;

        expect(formReducer(state, actions.checkGroupSuccess(response))).toEqual(updatedState);
    });

    it('should handle the checkGroupFailure action correctly', () => {
        const updatedState = state
            .set('loading', false)
            .set('error', 'error')
            .set('valid', false)
            .set('data', {})
        ;

        expect(formReducer(state, actions.checkGroupFailure('error'))).toEqual(updatedState);
    });

    it('should handle the resetGroup action correctly', () => {
        const updatedState = state.set('loading', true).set('loading', false);
        expect(formReducer(state, actions.resetGroup())).toEqual(updatedState);
    });

    it('should handle the saveGroup action correctly', () => {
        const feed = {
            url: 'http://google.com/',
            title: 'Group title'
        };

        const updatedState = state.set('loading', true);

        expect(formReducer(state, actions.saveGroup(feed))).toEqual(updatedState);
    });

    it('should handle the saveGroupSuccess action correctly', () => {
        const feed = {
            url: 'http://google.com/',
            title: 'Group title'
        };

        const updatedState = state
            .set('loading', false)
            .set('saved', true)
        ;

        expect(formReducer(state, actions.saveGroupSuccess(feed))).toEqual(updatedState);
    });

    it('should handle the saveGroupFailure action correctly', () => {
        const updatedState = state
            .set('loading', false)
            .set('saved', false)
            .set('error', 'error')
        ;

        expect(formReducer(state, actions.saveGroupFailure('error'))).toEqual(updatedState);
    });
});
