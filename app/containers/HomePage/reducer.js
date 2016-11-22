import { fromJS } from 'immutable';

import * as constants from './constants.js';

const initialState = fromJS({
    feeds: [],
    currentFeed: false,
    posts: {},
    currentPost: {}
});

function homeReducer(state = initialState, action = {}) {
    switch (action.type) {
        case constants.LOAD_FEEDS_SUCCESS:
            //console.log(action.feeds);
            return state.set('feeds', fromJS(action.feeds));

        //case constants.LOADING_END:
        //    return state.set('loading', false);

        default:
            return state;
    }
}

export default homeReducer;
