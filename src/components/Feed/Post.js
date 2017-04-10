import React from 'react';
import PropTypes from 'prop-types';
import DateComponent from 'components/Date/Date.js';
//import { FormattedMessage } from 'react-intl';

import styles from './feed.scss';

export class Post extends React.PureComponent {
    static propTypes = {
        read: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        isCurrent: PropTypes.bool.isRequired
    };

    render() {
        const { read, title, date, onSelect, isCurrent } = this.props;
        let className = [styles.post];
        if (!read) className.push(styles.unread);
        if (isCurrent) className.push(styles.current);

        return (
            <article className={className.join(' ')} onClick={onSelect}>
                <div className={styles.post__date + ' label label-default'}>{<DateComponent source={date} format='YYYY-MM-DD HH:mm' />}</div>
                <h5 className={styles.post__title}>{title}</h5>
            </article>
        );
    }
}

export default Post;
