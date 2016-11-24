import React from 'react';
//import { FormattedMessage } from 'react-intl';

import Centered from 'components/Centered/Centered.js';
import Loader from 'components/Loader/Loader.js';
import UpdateMessage from './UpdateMessage.js';

import styles from './feed.sass';

export class Feed extends React.Component {
    render() {
        const { loading, onUpdateFeed, currentFeed, posts } = this.props;

        const showUpdateInfo = Boolean(!loading && currentFeed.id && !posts.length);

        return (
            <div className={styles.feed}>
                { loading ? <Centered><Loader size={100} /></Centered> : null }
                { showUpdateInfo ?  <UpdateMessage onUpdateFeed={() => onUpdateFeed(currentFeed.id, currentFeed.group)} /> : null }
            </div>
        );
    }
}

export default Feed;
