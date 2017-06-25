import { createAction } from 'redux-actions';

export const saveGroup = createAction('GroupFormPage.saveGroup', feed => feed);
export const saveGroupSuccess = createAction('GroupFormPage.saveGroupSuccess', data => data);
export const saveGroupFailure = createAction('GroupFormPage.saveGroupFailure', error => error);
export const editGroup = createAction('GroupFormPage.editGroup', id => id);
export const setGroupToEdit = createAction('GroupFormPage.setGroupToEdit', feed => feed);
export const clearGroupData = createAction('GroupFormPage.clearGroupData', () => {});
