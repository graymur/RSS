import * as constants from './constants.js';

export const checkFeed = url => ({
    type: constants.CHECK_FEED,
    url
});

export const checkFeedSuccess = data => ({
    type: constants.CHECK_FEED_SUCCESS,
    data
});

export const checkFeedFailure = error => ({
    type: constants.CHECK_FEED_FAILURE,
    error
});

export const resetFeed = () => ({
    type: constants.RESET_FEED
});

export const saveFeed = feed => ({
    type: constants.SAVE_FEED,
    feed
});

export const saveFeedSuccess = data => ({
    type: constants.SAVE_FEED_SUCCESS,
    data
});

export const saveFeedFailure = error => ({
    type: constants.SAVE_FEED_FAILURE,
    error
});
