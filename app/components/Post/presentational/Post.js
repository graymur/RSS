import React from 'react';

import styles from '../post.sass';

export default class Post extends React.PureComponent {
    static propTypes = {
        link: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired
    };

    render() {
        const { link, title, content } = this.props;

        return (
                <div className={styles.post__wr}>
                    <a href={link} target='_blank'><h2>{title}</h2></a>
                    <div className={styles.post__content} dangerouslySetInnerHTML={{ __html: content }} />
                </div>
        );
    }
}