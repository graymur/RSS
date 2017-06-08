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
	[actions.checkFeed]: (state) => ({ ...state, loading: true, error: false }),
	[actions.checkFeedSuccess]: (state, action) => {
		action.payload.realTitle = action.payload.title;
		return { ...state, loading: false, error: false, valid: true, data: action.payload };
	},
	[actions.checkFeedFailure]: (state, action) => ({ ...state, loading: false, error: action.payload, valid: false, data: {} }),
	[actions.resetFeed]: () => initialState,
	[actions.saveFeed]: (state) => ({ ...state, loading: true, saving: true }),
	[actions.saveFeedSuccess]: (state) => ({ ...state, loading: false, saved: true, saving: false }),
	[actions.saveFeedFailure]: (state, action) => ({ ...state, loading: false, error: action.payload, saved: false, saving: false }),
	[actions.setFeedToEdit]: (state, action) => ({ ...state, data: {...action.payload}, loading: false, error: false }),
	[actions.clearFeedData]: (state) => initialState
}, initialState);
