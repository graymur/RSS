import HomePageSagas from 'views/HomePage/sagas/index';
import FormPageSagas from 'views/FormPage/sagas/index';
import GroupFormPageSagas from 'views/GroupFormPage/sagas/index';

export default function * saga() {
	yield [
		...HomePageSagas,
		...FormPageSagas,
		...GroupFormPageSagas
	];
}
