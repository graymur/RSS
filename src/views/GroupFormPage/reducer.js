import * as actions from './actions';
import { handleActions } from 'redux-actions';

export const initialState = {
    valid: null,
    loading: false,
    error: false,
    data: {},
    saved: false,
	saving: false
};

export default handleActions({
	[actions.saveGroup]: (state) => ({ ...state, loading: true, saving: true }),
	[actions.saveGroupSuccess]: (state) => ({ ...state, loading: false, saved: true, saving: false }),
	[actions.saveGroupFailure]: (state, action) => ({ ...state, loading: false, error: action.payload, saved: false, saving: false }),
	[actions.setGroupToEdit]: (state, action) => ({ ...state, data: {...action.payload}, loading: false, error: false }),
	[actions.clearGroupData]: (state) => initialState
}, initialState);
