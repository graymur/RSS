import * as constants from './constants.js';

export const fetchFeeds = () => ({
    type: constants.LOAD_FEEDS
});

export const selectFeed = id => {
    return {
        type: constants.SELECT_FEED,
        id
    };
};

export const selectPost = id => ({
    type: constants.SELECT_POST,
    id
});

export const markRead = (id, feedId) => ({
    type: constants.MARK_READ,
    id,
    feedId
});

export const markReadError = (id, feedId, error) => ({
    type: constants.MARK_READ_FAILURE,
    id,
    feedId,
    error
});

export const fetchFeed = id => ({
    type: constants.LOAD_FEED,
    id
});

export const fetchFeedStart = id => ({
    type: constants.LOAD_FEED_START,
    id
});

export const fetchFeedEnd = id => ({
    type: constants.LOAD_FEED_END,
    id
});

export const fetchFeedSuccess = feed => ({
    type: constants.LOAD_FEED_SUCCESS,
    feed
});

export const fetchFeedError = error => ({
    type: constants.LOAD_FEED_FAILURE,
    error
});

export const updateFeed = id => ({
    type: constants.UPDATE_FEED,
    id
});

export const updateFeedSuccess = feed => ({
    type: constants.UPDATE_FEED_SUCCESS,
    feed
});

export const updateFeedError = error => ({
    type: constants.UPDATE_FEED_FAILURE,
    error
});
