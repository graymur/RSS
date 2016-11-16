/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import * as constants from './constants.js';

import { fromJS } from 'immutable';

const initialState = fromJS({
    valid: null,
    loading: false,
    error: false,
    data: {},
    saved: false
});

function formReducer(state = initialState, action = {}) {
    switch (action.type) {
        case constants.CHECK_FEED:
            return state
                .set('loading', true)
                .set('error', false)
            ;

        case constants.CHECK_FEED_SUCCESS:
            action.data.realTitle = action.data.title;

            return state
                .set('loading', false)
                .set('error', false)
                .set('valid', true)
                .set('data', action.data)
            ;

        case constants.CHECK_FEED_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error)
                .set('valid', false)
                .set('data', {})
            ;

        case constants.RESET_FEED:
            return initialState;

        case constants.SAVE_FEED:
            return state.set('loading', true);

        case constants.SAVE_FEED_SUCCESS:
            return state
                .set('loading', false)
                .set('saved', true)
            ;

        case constants.SAVE_FEED_FAILURE:
            return state
                .set('loading', false)
                .set('saved', false)
                .set('error', action.error)
            ;

        default:
            return state;
    }
}

export default formReducer;
