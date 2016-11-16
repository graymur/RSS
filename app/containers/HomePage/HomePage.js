import React from 'react';
import Helmet from 'react-helmet';

import Feeds from 'components/Feeds';
import Feed from 'components/Feed';
import Post from 'components/Post';

import styles from './home.sass';

export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className={styles.content}>
                <Feeds />
                <Feed />
                <Post />
            </div>
        );
    }
}

export default HomePage;