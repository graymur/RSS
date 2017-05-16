import { createAction } from 'redux-actions';

export const loadingStart = createAction('App.loadingStart', () => {});
export const loadingEnd = createAction('App.loadingEnd', () => {});
