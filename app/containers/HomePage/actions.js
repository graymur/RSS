import * as constants from './constants.js';

export const fetchFeeds = () => ({
    type: constants.LOAD_FEEDS
});

export const fetchFeed = ({ id, group }) => {
    return {
    type: constants.LOAD_FEED,
    id,
    group
}};

export const fetchFeedStart = (id, group) => ({
    type: constants.LOAD_FEED_START,
    id,
    group
});

export const fetchFeedEnd = (id, group) => ({
    type: constants.LOAD_FEED_END,
    id,
    group
});

export const fetchFeedSuccess = (feed) => ({
    type: constants.LOAD_FEED_SUCCESS,
    feed
});

export const fetchFeedError = error => ({
    type: constants.LOAD_FEED_FAILURE,
    error
});

export const updateFeed = error => ({
    type: constants.UPDATE_FEED,
    error
});

export const updateFeedSuccess = (feed) => ({
    type: constants.UPDATE_FEED_SUCCESS,
    feed
});

export const updateFeedError = error => ({
    type: constants.UPDATE_FEED_FAILURE,
    error
});


