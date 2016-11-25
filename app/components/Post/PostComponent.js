import React from 'react';

import styles from './post.sass';

class PostComponent extends React.Component {
    render() {
        const { link, title, content } = this.props;

        return (
            <div className={styles.post__wr}>
                <a href={link} target="_blank"><h2>{title}</h2></a>
                <div className={styles.post__content} dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
        );
    }
}

export default PostComponent;