import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Helmet from 'react-helmet';
import Header from 'components/Header/Header';
import PageLoader from 'components/PageLoader/PageLoader';

import * as selectors from './selectors.js';

import styles from './app.sass';

export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { loading, children } = this.props;

        return (
            <div className={styles.main}>
                <Helmet
                    titleTemplate="%s"
                    defaultTitle="RSS"
                    meta={[{ name: 'description', content: 'RSS reader build with React.js' }]}
                    />
                <Header />
                {React.Children.toArray(children)}
                {loading ? <PageLoader/> : null}
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    loading: React.PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
    loading: selectors.selectLoading()
});

export default connect(mapStateToProps)(App);
