import HomePageSagas from 'views/HomePage/sagas/index'

export default function * saga() {
	yield [
		...HomePageSagas
	]
}
