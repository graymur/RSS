import path from 'path';
import express  from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import opener from 'opener';
import webpackConfig from '../webpack/webpack.config.dev.js';
import config from '../config/config';
import api from './api/1/index';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {googleAuthURL, handleLogin as handleGoogleLogin} from './login/google';
import saveOrUpdateUser from './login/saveOrUpdateUser';

// console.log(googleAuthURL);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.all('/*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end()
	} else {
		next()
	}
});

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	stats: {
		colors: true
	}
}));

app.use(webpackHotMiddleware(compiler));
app.use('/node_modules', express.static(path.resolve(__dirname + '/../node_modules')));
app.use('/api/1/', api);
app.use((req, res, next) => {
	req.initialState = {}
	next();
});

app.get('/login', (req, res, next) => {
	req.initialState.global = {googleAuthURL};
	next();
});

app.get('/login/google', async(req, res, next) => {
	try {
		req.authenticatedUser = await handleGoogleLogin(req);
		console.log('google login');
		next();
	} catch (e) {
		res.send(e.getMessage());
	}
});

app.use('*', async(req, res, next) => {
	if (req.authenticatedUser) {
		const user = await saveOrUpdateUser(req.authenticatedUser);
		console.log('saveOrUpdateUser');
		res.send(JSON.stringify(user, null, 4)).end();
	} else {
		next();
	}
})

// make all URLs respond with hot-wired index.html
app.use('*', (req, res, next) => {
	console.log('initialState', req.initialState);
	global.test = 'TEST';

	const filename = path.join(compiler.outputPath, 'index.html');

	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err);
		}

		result = result.toString('utf8').replace('<body>', `<body>\n<script>window.initialState = ${JSON.stringify(req.initialState)}</script>\n`);

		res.set('content-type', 'text/html');
		res.send(result);
		res.end();
	});
});

app.listen(3000, () => {
	console.log(`Listening at ${config.host}:${config.devPort}`);
	// opener(`http://${config.host}:${config.devPort}`);
});
