/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

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

export const saveFeedSuccess = () => ({
    type: constants.SAVE_FEED_SUCCESS
});

export const saveFeedFailure = () => ({
    type: constants.SAVE_FEED_FAILURE
});