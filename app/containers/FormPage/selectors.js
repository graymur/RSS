/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

export const selectForm = () => state => state.get('form');

export const selectError = () => createSelector(
    selectForm(),
    formState => formState.get('error')
);

export const selectLoading = () => createSelector(
    selectForm(),
    formState => formState.get('loading')
);

export const selectSaved = () => createSelector(
    selectForm(),
    formState => formState.get('saved')
);

export const selectData = () => createSelector(
    selectForm(),
    formState => formState.get('data')
);

export const selectValid = () => createSelector(
    selectForm(),
    formState => formState.get('valid')
);