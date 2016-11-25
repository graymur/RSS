import React from 'react';
import Date from 'components/Date/Date.js';
//import { FormattedMessage } from 'react-intl';

import styles from './feed.sass';

export class Post extends React.PureComponent {
    render() {
        const { id, read, title, date, onSelect, isCurrent } = this.props;
        let className = [styles.post];
        if (!read) className.push(styles.unread);
        if (isCurrent) className.push(styles.current);

        return (
            <article className={className.join(' ')} onClick={onSelect}>
                <div className={styles.post__date + ' label label-default'}><Date source={date} format="YYYY-MM-DD HH:mm" /></div>
                <h5 className={styles.post__title}>{title}</h5>
            </article>
        );
    }
}

export default Post;