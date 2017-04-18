import React from 'react';
import PropTypes from 'prop-types';
import DateComponent from 'components/Date/Date';
//import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

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
		console.log('post render');
        // let className = ['feed__item'];
        // if (!read) className.push('_unread');
        // if (isCurrent) className.push('_current');

		const className = classNames('feed__item', { '_unread': !read, '_current': isCurrent });

		// console.log(read);

        return (
            <article className={className} onClick={onSelect}>
                <div className='post__date label label-default'>{<DateComponent source={date} format='YYYY-MM-DD HH:mm' />}</div>
                <h5 className='post__title'>{title}</h5>
            </article>
        );
    }
}

export default Post;
