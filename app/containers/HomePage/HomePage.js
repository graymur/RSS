import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Feeds from 'components/Feeds/Feeds.js';
import Feed from 'components/Feed/Feed.js';
import Post from 'components/Post/Post.js';

import { fetchFeeds } from './actions.js';

import styles from './home.sass';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    fetchFeeds() {
        this.props.fetchFeeds();
    }

    componentWillMount() {
        this.fetchFeeds();
    }

    render() {
        const feeds = [];
        return (
            <div className={styles.content}>
                <Feeds />
                <Feed />
                <Post />
            </div>
        );
    }
}

//const mapStateToProps = createStructuredSelector({
//    //loading: selectors.selectLoading(),
//    //valid: selectors.selectLoading(),
//    //error: selectors.selectError(),
//    //data: selectors.selectData(),
//    //saved: selectors.selectSaved()
//});

export default connect(() => ({}), {
    fetchFeeds
})(HomePage);