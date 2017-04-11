import { createAction } from 'redux-actions'

export const checkFeed = createAction('checkFeed', url => url)
export const checkFeedSuccess = createAction('checkFeedSuccess', data => data)
export const checkFeedFailure = createAction('checkFeedFailure', error => error)
export const resetFeed = createAction('resetFeed', () => {})
export const saveFeed = createAction('saveFeed', feed => feed)
export const saveFeedSuccess = createAction('saveFeedSuccess', data => data)
export const saveFeedFailure = createAction('saveFeedFailure', error => error)
