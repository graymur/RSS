import * as actions from './actions';
import { handleActions } from 'redux-actions';

export const initialState = {
    loading: false
};

export default handleActions({
	[actions.loadingStart]: (state) => ({ ...state, loading: true }),
	[actions.loadingEnd]: (state) => ({ ...state, loading: false })
}, initialState);
