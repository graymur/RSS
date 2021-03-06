import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Helmet from 'react-helmet';
import Header from 'components/Header/Header';
import PageLoader from 'components/PageLoader/PageLoader';

import * as selectors from './selectors.js';

import './app.scss';

export class App extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        loading: PropTypes.bool
    };

    render() {
        const { loading, children } = this.props;

        return (
            <div className='main'>
                <Helmet titleTemplate='%s' defaultTitle='RSS' meta={[{ name: 'description', content: 'RSS reader build with React.js' }]} />
                <Header />
                {React.Children.toArray(children)}
                {loading ? <PageLoader /> : null}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectLoading()
});

export default connect(mapStateToProps)(App);
