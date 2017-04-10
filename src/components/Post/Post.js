import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostComponent from './presentational/Post.js';
import GeminiScrollbar from 'react-gemini-scrollbar';
//import { FormattedMessage } from 'react-intl';

import * as selectors from 'views/HomePage/selectors.js';
import { markRead } from 'views/HomePage/actions.js';

import styles from './post.scss';

class Post extends React.Component {
    static propTypes = {
        post: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.bool
        ])
    };

    componentWillReceiveProps(newProps) {
        clearTimeout(this.readTimeout);
        if (newProps.post && !newProps.post.read && !newProps.post.readFailure) {
            this.readTimeout = setTimeout(() => {
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
                <GeminiScrollbar>
                    {post ? <PostComponent {...post} /> : null}
                </GeminiScrollbar>
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
