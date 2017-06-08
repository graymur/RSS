import { createSelector } from 'reselect';

export const selectForm = () => state => state.form;

export const selectError = () => createSelector(
    selectForm(),
    formState => formState.error
);

export const selectLoading = () => createSelector(
    selectForm(),
    formState => formState.loading
);

export const selectSaved = () => createSelector(
    selectForm(),
    formState => formState.saved
);

export const selectSaving = () => createSelector(
    selectForm(),
    formState => formState.saving
);

export const selectData = () => createSelector(
    selectForm(),
    formState => formState.data
);

export const selectValid = () => createSelector(
    selectForm(),
    formState => formState.valid
);
