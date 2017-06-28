import addBundleAnalyzerPlugin from './util/add-bundle-analyzer-plugin';
import path from 'path';
import config from '../config/config';
import merge from 'merge-deep';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import htmlPlugin from './util/html-plugin';
import uglifyPlugin from './util/uglify-plugin';
import baseWebpackConfig from './webpack.config.base';
import webpack from 'webpack';

const productionConfig = merge(
	baseWebpackConfig,
	{
		output: {
			chunkFilename: '[name].js'
		},
		plugins: [
			new CopyWebpackPlugin([{
				from: path.join(config.dllDir, `vendors.${process.env.NODE_ENV}.js`),
				to: path.join(config.buildDir, 'vendors.js')
			}]),
			new ExtractTextPlugin('styles.css'),
			htmlPlugin,
			uglifyPlugin,
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	}
);

productionConfig.module.loaders.filter(loader =>
	loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
).forEach(loader => {
	const [fallbackLoader, ...rest] = loader.loaders;
	loader.loader = ExtractTextPlugin.extract({
		fallbackLoader,
		loader: rest.join('!')
	});

	delete loader.loaders;
});

// export default productionConfig

// uncomment to see bundle analyzer report
export default addBundleAnalyzerPlugin(productionConfig);
