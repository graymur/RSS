import { createAction } from 'redux-actions';

export const checkFeed = createAction('FormPage.checkFeed', url => url);
export const checkFeedSuccess = createAction('FormPage.checkFeedSuccess', data => data);
export const checkFeedFailure = createAction('FormPage.checkFeedFailure', error => error);
export const resetFeed = createAction('FormPage.resetFeed', () => {});
export const saveFeed = createAction('FormPage.saveFeed', feed => feed);
export const saveFeedSuccess = createAction('FormPage.saveFeedSuccess', data => data);
export const saveFeedFailure = createAction('FormPage.saveFeedFailure', error => error);
