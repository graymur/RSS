/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHECK_FEED = 'rss:feed:check';
export const CHECK_FEED_SUCCESS = 'rss:feed:check:success';
export const CHECK_FEED_FAILURE = 'rss:feed:check:failure';
export const RESET_FEED = 'rss:feed:reset';
export const SAVE_FEED = 'rss:feed:save';
export const SAVE_FEED_SUCCESS = 'rss:feed:save:success';
export const SAVE_FEED_FAILURE = 'rss:feed:save:failure';
