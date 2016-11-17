import { fromJS } from 'immutable';

import * as constants from './constants.js';

const initialState = fromJS({
    loading: false
});

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LOADING_START:
            return state.set('loading', true);

        case constants.LOADING_END:
            return state.set('loading', false);

        default:
            return state;
    }
}

export default appReducer;
