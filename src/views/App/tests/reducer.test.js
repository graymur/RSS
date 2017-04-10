import expect from 'expect';
import appReducer, { initialState } from '../reducer';
import * as actions from '../actions';
import { fromJS } from 'immutable';

describe('globalReducer', () => {
    let state;

    beforeEach(() => {
        state = initialState;
    });

    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual(state);
    });

    it('should handle the loadingStart action correctly', () => {
        const updatedState = state.set('loading', true);
        expect(appReducer(state, actions.loadingStart())).toEqual(updatedState);
    });

    it('should handle the loadingEnd action correctly', () => {
        const updatedState = state.set('loading', false);
        expect(appReducer(state, actions.loadingEnd())).toEqual(updatedState);
    });
});
