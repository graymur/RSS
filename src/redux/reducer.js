import { combineReducers } from 'redux';

import global from 'views/App/reducer';
import form from 'views/FormPage/reducer';
import home from 'views/HomePage/reducer';

export default combineReducers({
	global,
	form,
	home
});
