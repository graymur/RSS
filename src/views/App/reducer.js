import * as constants from './constants.js';

export const initialState = {
    loading: false
};

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
		case constants.LOADING_START:
			return { ...state, loading: true };

        case constants.LOADING_END:
			return { ...state, loading: false };

        default:
            return state;
    }
}

export default appReducer;
