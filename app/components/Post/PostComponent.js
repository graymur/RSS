import React from 'react';
import GeminiScrollbar from 'react-gemini-scrollbar';

import styles from './post.sass';

class PostComponent extends React.Component {
    render() {
        const { link, title, content } = this.props;

        return (
            <GeminiScrollbar>
                <div className={styles.post__wr}>
                    <a href={link} target="_blank"><h2>{title}</h2></a>
                    <div className={styles.post__content} dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </GeminiScrollbar>
        );
    }
}

export default PostComponent;