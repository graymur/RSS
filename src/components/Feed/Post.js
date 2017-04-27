import React from 'react';
import PropTypes from 'prop-types';
import DateComponent from 'components/Date/Date';
import classNames from 'classnames';

import './feed.scss';

export class Post extends React.Component {
    static propTypes = {
        read: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired,
        isCurrent: PropTypes.bool.isRequired
    };

	shouldComponentUpdate(nextProps) {
		return this.props.read !== nextProps.read || this.props.isCurrent !== nextProps.isCurrent;
	}

    render() {
        const { read, title, date, onSelect, isCurrent } = this.props;

		const className = classNames('feed__item', { '_unread': !read, '_current': isCurrent });

        return (
            <article className={className} onClick={onSelect}>
                <div className='post__date label label-default'>{<DateComponent source={date} format='YYYY-MM-DD HH:mm' />}</div>
                <h5 className='post__title'>{title}</h5>
            </article>
        );
    }
}

export default Post;
