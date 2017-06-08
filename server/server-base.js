import path from 'path';
import express from 'express';
import session from 'express-session';
import api from './api/1/index';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {googleAuthURL, handleLogin as handleGoogleLogin} from './login/google';
import authenticate from './middlewares/authenticate';
import checkAuth from './middlewares/checkAuth';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({secret: 'keyboard warrior'}));

app.use((req, res, next) => {
	req.initialState = {global: {}};

	if (req.session.auth) {
		req.initialState.global.token = req.session.auth;
	}

	next();
});

app.get('/login', (req, res, next) => {
	req.initialState.global.googleAuthURL = googleAuthURL;
	next();
});

app.get('/login/google', handleGoogleLogin, authenticate);

app.all('/', checkAuth);
app.all('/form*', checkAuth);

app.use('/node_modules', express.static(path.join(__dirname, '/../node_modules')));
app.use('/api/1/', api);

app.all('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

export default app;
