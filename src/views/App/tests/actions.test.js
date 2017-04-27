import expect from 'expect';
import * as constants from '../constants.js';
import * as actions from '../actions.js';

describe('App Actions', () => {
    describe('loadingStart', () => {
        it('should return the correct type', () => {
            expect(actions.loadingStart()).toEqual({ type: constants.LOADING_START });
        });
    });

    describe('loadingEnd', () => {
        it('should return the correct type', () => {
            expect(actions.loadingEnd()).toEqual({ type: constants.LOADING_END });
        });
    });
});
