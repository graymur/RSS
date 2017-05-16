import HomePageSagas from 'views/HomePage/sagas/index';
import FormPageSagas from 'views/FormPage/sagas/index';

export default function * saga() {
	yield [
		...HomePageSagas,
		...FormPageSagas
	];
}
