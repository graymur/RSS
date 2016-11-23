import { fromJS } from 'immutable';

import * as constants from './constants.js';

const initialState = fromJS({
    feeds: [],
    currentFeed: {},
    posts: [],
    currentPost: {},
    postsLoading: false
});

function homeReducer(state = initialState, action = {}) {
    let groupIndex, feedIndex;

    switch (action.type) {
        case constants.LOAD_FEEDS_SUCCESS:
            return state.set('feeds', fromJS(action.feeds));

        case constants.LOAD_FEED:
            groupIndex = state.get('feeds').findIndex(group => group.get('id') === action.group);
            feedIndex = state.get('feeds').get(groupIndex).get('feeds').findIndex(feed => feed.get('id') === action.id);

            const feed = state.get('feeds').get(groupIndex).get('feeds').get(feedIndex).toJS();

            return state.set('currentFeed', fromJS(feed));

        case constants.LOAD_FEED_START:
            groupIndex = state.get('feeds').findIndex(group => group.get('id') === action.group);
            feedIndex = state.get('feeds').get(groupIndex).get('feeds').findIndex(feed => feed.get('id') === action.id);

            return state.setIn(['feeds', groupIndex, 'feeds', feedIndex, 'loading'], true).set('postsLoading', true);

        case constants.LOAD_FEED_END:
            groupIndex = state.get('feeds').findIndex(group => group.get('id') === action.group);
            feedIndex = state.get('feeds').get(groupIndex).get('feeds').findIndex(feed => feed.get('id') === action.id);

            return state.setIn(['feeds', groupIndex, 'feeds', feedIndex, 'loading'], false).set('postsLoading', false);

        case constants.LOAD_FEED_SUCCESS:
            return state.set('posts', fromJS(action.feed.posts));

        default:
            return state;
    }
}

export default homeReducer;
