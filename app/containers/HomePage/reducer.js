import { fromJS } from 'immutable';

import * as constants from './constants.js';

const initialState = fromJS({
    groups: [],
    feeds: [],
    posts: [],
    currentFeed: {},
    currentPostId: false,
    postsLoading: false
});

function homeReducer(state = initialState, action = {}) {
    let groupIndex, feedIndex;

    switch (action.type) {
        case constants.LOAD_FEEDS_SUCCESS:
            return state
                .set('feeds', fromJS(action.feeds))
                .set('groups', fromJS(action.groups))
            ;

        case constants.LOAD_FEED:
            return state.set('currentPost', false);
            //const feed = state.get('feeds').find(feed => feed.get('id') === action.id).toJS();
            //feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.id);

        case constants.LOAD_FEED_START:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.id);
            return state.setIn(['feeds', feedIndex, 'loading'], true).set('postsLoading', true);

        case constants.LOAD_FEED_END:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.id);
            return state.setIn(['feeds', feedIndex, 'loading'], false).set('postsLoading', false);

        case constants.LOAD_FEED_SUCCESS:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feed.id);

            return state
                .setIn(['feeds', feedIndex], fromJS(action.feed))
                .set('currentFeed', fromJS(action.feed))
                .set('posts', fromJS(action.feed.posts))
            ;

        case constants.SELECT_POST:
            return state.set('currentPostId', action.id);

        default:
            return state;
    }
}

export default homeReducer;
