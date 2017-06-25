import opener from 'opener';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from '../config/config';
import webpackConfig from '../webpack/webpack.config.dev';
import app from './server-base';

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackConfig.output.publicPath,
	quiet: true,
	stats: {
		colors: true
	},
	serverSideRender: true
}));

app.use(webpackHotMiddleware(compiler));

app.use((req, res) => {
	const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;
	res.render('index', {
		env: process.env.NODE_ENV,
		cssFiles: assetsByChunkName.main.filter(path => path.endsWith('.css')),
		jsFiles: assetsByChunkName.main.filter(path => path.endsWith('.js')),
		initialState: req.initialState
	});
});

app.listen(config.devPort, () => {
	console.log(`Listening at ${config.host}:${config.devPort}`);
	// opener(`http://${config.host}:${config.devPort}`);
});
