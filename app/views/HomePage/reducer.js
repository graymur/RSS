import { fromJS } from 'immutable';

import * as constants from './constants.js';

const initialState = fromJS({
    groups: [],
    feeds: [],
    posts: [],
    currentFeed: {},
    currentFeedId: '',
    currentPostId: '',
    postsLoading: false
});

function homeReducer(state = initialState, action = {}) {
    let feedIndex, postIndex;

    switch (action.type) {
        case constants.LOAD_FEEDS_SUCCESS:
            return state
                .set('feeds', fromJS(action.feeds))
                .set('groups', fromJS(action.groups))
            ;

        case constants.LOAD_FEED:
            return state.set('currentPost', false);

        case constants.LOAD_FEED_START:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.id);
            return state.setIn(['feeds', feedIndex, 'loading'], true).set('postsLoading', true);

        case constants.LOAD_FEED_END:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.id);
            return state.setIn(['feeds', feedIndex, 'loading'], false).set('postsLoading', false);

        case constants.SELECT_FEED:
            const activeFeed = state.get('feeds').find(feed => feed.get('id') === action.id);

            return state
                .set('currentFeedId', activeFeed.get('id'))
                .set('posts', activeFeed.get('posts'))
            ;

        case constants.LOAD_FEED_SUCCESS:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feed.id);

            return state
                .setIn(['feeds', feedIndex], fromJS(action.feed))
                .set('currentFeedId', action.feed.id)
                .set('posts', fromJS(action.feed.posts))
            ;

        case constants.SELECT_POST:
            return state.set('currentPostId', action.id);

        case constants.MARK_READ:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
            postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);

            return state
                .setIn(['feeds', feedIndex, 'unread'], state.get('feeds').get(feedIndex).get('unread') - 1)
                .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], true)
                .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], false)
            ;

        case constants.MARK_READ_FAILURE:
            feedIndex = state.get('feeds').findIndex(feed => feed.get('id') === action.feedId);
            postIndex = state.get('feeds').get(feedIndex).get('posts').findIndex(post => post.get('id') === action.id);

            return state
                .setIn(['feeds', feedIndex, 'posts', postIndex, 'read'], false)
                .setIn(['feeds', feedIndex, 'posts', postIndex, 'readFailure'], true)
            ;

        default:
            return state;
    }
}

export default homeReducer;
