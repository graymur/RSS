import 'bootstrap/scss/bootstrap.scss';
import 'style/main.scss';

import { Provider } from 'react-redux';
import createStore from 'redux/create-store';

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'views/App/App';
import HomePage from 'views/HomePage/HomePage';

const store = createStore({});

export default class RootContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App>
					<BrowserRouter>
						<Switch>
							<Route component={HomePage} />
						</Switch>
					</BrowserRouter>
				</App>
			</Provider>
		)
	}
}
