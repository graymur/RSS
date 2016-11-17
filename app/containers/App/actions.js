import * as constants from './constants.js';

export const loadingStart = () => ({
    type: constants.LOADING_START
});

export const loadingEnd = () => ({
    type: constants.LOADING_END
});