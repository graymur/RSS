import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostComponent from './PostComponent';
//import { FormattedMessage } from 'react-intl';

import * as selectors from 'containers/HomePage/selectors.js';
import { markRead } from 'containers/HomePage/actions.js';

import styles from './post.sass';

class Post extends React.Component {
    componentWillReceiveProps(newProps) {
        clearTimeout(this.readTimeout);
        if (newProps.post && !newProps.post.read && !newProps.post.readFailure) {
            this.readTimeout = setTimeout(() => {
                console.log(newProps.post);
                newProps.markRead(newProps.post.id, newProps.post.feed);
            }, 2000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.readTimeout);
    }

    render() {
        const { post } = this.props;

        return (
            <div className={styles.post}>
                {post ? <PostComponent {...post} /> : null}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    post: selectors.selectCurrentPost(),
    loading: selectors.selectPostsLoading()
});

export default connect(mapStateToProps, {
    markRead
})(Post);
