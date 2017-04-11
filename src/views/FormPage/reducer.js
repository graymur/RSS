import * as actions from './actions';
import { handleActions } from 'redux-actions';

export const initialState = {
    valid: null,
    loading: false,
    error: false,
    data: {},
    saved: false
};

export default handleActions({
	[actions.checkFeed]: (state) => {
		return { ...state, loading: true, error: false };
	},
	[actions.checkFeedSuccess]: (state, action) => {
		action.payload.realTitle = action.payload.title;
		return { ...state, loading: false, error: false, valid: true, data: action.payload };
	},
	[actions.checkFeedFailure]: (state, action) => {
		return { ...state, loading: false, error: action.payload, valid: false, data: {} };
	},
	[actions.resetFeed]: () => {
		return initialState;
	},
	[actions.saveFeed]: (state) => {
		return { ...state, loading: true };
	},
	[actions.saveFeedSuccess]: (state) => {
		return { ...state, loading: false, saved: true };
	},
	[actions.saveFeedFailure]: (state, action) => {
		return { ...state, loading: false, error: action.payload, saved: false };
	}
}, initialState);
