import React from 'react';
import PropTypes from 'prop-types';
import DateComponent from 'components/Date/Date.js';
//import { FormattedMessage } from 'react-intl';

import './feed.scss';

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
        let className = ['feed__item'];
        if (!read) className.push('_unread');
        if (isCurrent) className.push('_current');

        return (
            <article className={className.join(' ')} onClick={onSelect}>
                <div className='post__date label label-default'>{<DateComponent source={date} format='YYYY-MM-DD HH:mm' />}</div>
                <h5 className='post__title'>{title}</h5>
            </article>
        );
    }
}

export default Post;
