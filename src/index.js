import 'regenerator-runtime/runtime';

import 'react-hot-loader/patch';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './Root.jsx';

// if (process.env.NODE_ENV === 'development') {
// 	const { whyDidYouUpdate } = require('why-did-you-update')
// 	whyDidYouUpdate(React, {
// 		exclude: [/^Route/, /Container$/, /PageLayout/, /Header/]
// 	})
// }

const root = document.getElementById('react-root');

const renderWithHot = Component => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		root
	)
};

renderWithHot(App);

if (module.hot) {
	module.hot.accept('./Root.jsx', () => {
		renderWithHot(require('./Root.jsx').default)
	});
}
