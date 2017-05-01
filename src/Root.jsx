import 'bootstrap/dist/css/bootstrap.min.css';
import 'style/main.scss';

import {Provider} from 'react-redux';
import createStore from 'redux/createStore';

import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import App from 'views/App/App';
import HomePage from 'views/HomePage/HomePage';
import FormPage from 'views/FormPage/FormPage';
import LoginPage from 'views/LoginPage/LoginPage';

const store = createStore(window.initialState || {});

const routes = [{
	path: '/',
	exact: true,
	component: HomePage,
	auth: true
}, {
	path: '/form',
	component: FormPage,
	auth: true
}, {
	path: '/login',
	component: LoginPage
}];

function isAuthenticated() {
	return false;
}

function renderRoute(config, index) {
	const Comp = config.component;

	return config.auth
		? <AuthenticatedRoute key={index} path={config.path} exact={config.exact} />
		: <Route key={index} path={config.path} exact={config.exact} render={props => <Comp {...props} />} />;
}

export default class RootContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Switch>
						{routes.map(renderRoute)}
					</Switch>
				</BrowserRouter>
			</Provider>
		)
	}
}

const AuthenticatedRoute = ({component: Comp, ...rest}) => ( // eslint-disable-line react/prop-types
	<Route {...rest} render={props => (
    isAuthenticated() ? (
      <App><Comp {...props} /></App>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location} // eslint-disable-line react/prop-types
      }} />
    )
  )} />
)
