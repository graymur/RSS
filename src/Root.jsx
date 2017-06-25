import 'bootstrap/dist/css/bootstrap.min.css';
import 'style/main.scss';

import {Provider} from 'react-redux';
import createStore from 'redux/createStore';

import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import App from 'views/App/App';
import HomePage from 'views/HomePage/HomePage';
import FormPage from 'views/FormPage/FormPage';
import GroupFormPage from 'views/GroupFormPage/GroupFormPage';
import LoginPage from 'views/LoginPage/LoginPage';

const store = createStore(window.initialState || {});

const routes = [{
	path: '/',
	exact: true,
	component: HomePage,
	auth: true
}, {
	path: '/form/:id',
	component: FormPage,
	auth: true
}, {
	path: '/form',
	component: FormPage,
	auth: true
}, {
	path: '/group-form/:id',
	component: GroupFormPage,
	auth: true
}, {
	path: '/group-form',
	component: GroupFormPage,
	auth: true
}, {
	path: '/login',
	component: LoginPage
}];

// const isAuthenticated = () => idx(window, _ => _.initialState.global.token);
const isAuthenticated = () => true;

function renderRoute(config, index) {
	const Comp = config.component;

	return config.auth
		? <AuthenticatedRoute key={index} path={config.path} exact={config.exact} component={Comp} />
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
		);
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
);
