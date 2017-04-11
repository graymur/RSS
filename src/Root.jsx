import 'bootstrap/dist/css/bootstrap.min.css';
import 'style/main.scss';

import {Provider} from 'react-redux';
import createStore from 'redux/createStore';

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import App from 'views/App/App';
import HomePage from 'views/HomePage/HomePage';
import FormPage from 'views/FormPage/FormPage';

const store = createStore({});

const routes = [{
	path: '/',
	exact: true,
	component: HomePage
}, {
	path: '/form',
	component: FormPage
}]

export default class RootContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						{routes.map(({ path, exact, component: Comp }, index) => (
							<Route key={index} path={path} exact={exact} render={props => <App><Comp {...props} /></App>} />
						))}
					</Switch>
				</BrowserRouter>
			</Provider>
		)
	}
}
