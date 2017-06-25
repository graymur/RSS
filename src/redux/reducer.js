import { combineReducers } from 'redux';

import global from 'views/App/reducer';
import form from 'views/FormPage/reducer';
import groupForm from 'views/GroupFormPage/reducer';
import home from 'views/HomePage/reducer';

export default combineReducers({
	global,
	form,
	groupForm,
	home
});
