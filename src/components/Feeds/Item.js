import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Loader from 'components/Loader/Loader';
import * as selectors from 'views/HomePage/selectors.js';
import {selectFeed, feedDragStart, feedDragEnd} from 'views/HomePage/actions.js';
import classNames from 'classnames';
import Draggable from 'components/Draggable/Draggable';

import './feeds.scss';

class Item extends React.PureComponent {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		count: PropTypes.number.isRequired,
		unread: PropTypes.number.isRequired,
		feedDragStart: PropTypes.func.isRequired,
		feedDragEnd: PropTypes.func.isRequired,
		currentFeedId: PropTypes.string,
		loading: PropTypes.bool
	};

	handleClick = e => {
		this.props.selectFeed(this.props.id);
	}

	render() {
		const {id, title, count, unread, loading, currentFeedId, feedDragStart, feedDragEnd} = this.props;
		const className = classNames('feeds__group__item__title', {'_current': currentFeedId === id});

		return (
			<Draggable id={id} key={id} onStart={feedDragStart} onEnd={feedDragEnd}>
				<div className='feeds__group__item' onClick={this.handleClick}>
					<span className={className}>{title} ({count}/{unread})</span>
					{ loading ? <Loader size={12} className='loader'/> : null }
				</div>
			</Draggable>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentFeedId: selectors.selectCurrentFeedId()
});

export default connect(mapStateToProps, {selectFeed, feedDragStart, feedDragEnd})(Item);
