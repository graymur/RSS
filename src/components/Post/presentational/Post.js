import React from 'react';
import PropTypes from 'prop-types';

import styles from '../post.scss';

export default class Post extends React.PureComponent {
    static propTypes = {
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
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
