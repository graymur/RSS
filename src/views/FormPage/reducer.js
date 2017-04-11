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

export const initialState = {
    valid: null,
    loading: false,
    error: false,
    data: {},
    saved: false
};

function formReducer(state = initialState, action = {}) {
    switch (action.type) {
		case constants.CHECK_FEED:
			return { ...state, loading: true, error: false };

        case constants.CHECK_FEED_SUCCESS:
            action.data.realTitle = action.data.title;
			return { ...state, loading: false, error: false, valid: true, data: action.data };

        case constants.CHECK_FEED_FAILURE:
			return { ...state, loading: false, error: action.error, valid: false, data: {} };

        case constants.RESET_FEED:
            return initialState;

        case constants.SAVE_FEED:
			return { ...state, loading: true };

        case constants.SAVE_FEED_SUCCESS:
			return { ...state, loading: false, saved: true };

        case constants.SAVE_FEED_FAILURE:
			return { ...state, loading: false, error: action.error, saved: false };

        default:
            return state;
    }
}

export default formReducer;
