import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga.js';

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();
	const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));

	let sagaTask = sagaMiddleware.run(function * () {
		yield saga();
	});

	if (module.hot) {
		module.hot.accept('./reducer', () => {
			const nextRootReducer = require('./reducer').default;
			store.replaceReducer(nextRootReducer);
		});

		module.hot.accept('./saga', () => {
			const getNewSagas = require('./saga').default;
			sagaTask.cancel();
			sagaTask.done.then(() => {
				sagaTask = sagaMiddleware.run(function * replacedSaga(action) {
					yield getNewSagas();
				});
			});
		});
	}

	return store;
}
