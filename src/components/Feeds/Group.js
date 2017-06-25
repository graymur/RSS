import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.js';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import * as selectors from 'views/HomePage/selectors.js';
import {selectGroup, moveFeedToGroup} from 'views/HomePage/actions.js';
import classNames from 'classnames';

import './feeds.scss';

class Group extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		currentGroupId: PropTypes.string,
		feeds: PropTypes.array.isRequired,
		selectGroup: PropTypes.func.isRequired,
		moveFeedToGroup: PropTypes.func.isRequired,
		groupsIdsToBeDroppedOn: PropTypes.array
	};

	handleGroupClick = e => {
		this.props.selectGroup(this.props.id);
	}

	handleDrop = e => {
		this.props.moveFeedToGroup(e.dataTransfer.getData('id'), this.props.id);
	}

	handleDragOver = e => {
		e && e.preventDefault();
	}

	render() {
		const {id, title, feeds, currentGroupId, groupsIdsToBeDroppedOn} = this.props;

		const groupClassName = classNames('feeds__group', {'_highlighted': groupsIdsToBeDroppedOn.includes(id)});
		const titleClassName = classNames('feeds__group__title', {'_current': currentGroupId === id});

		return (
			<div className={groupClassName} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
				<h5 className={titleClassName} onClick={this.handleGroupClick}>{title}</h5>
				{feeds.map((feed, index) => <Item key={index} {...feed} />)}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentGroupId: selectors.selectCurrentGroupId(),
	groupsIdsToBeDroppedOn: selectors.selectGroupsIdsToBeDroppedOn()
});

export default connect(mapStateToProps, {selectGroup, moveFeedToGroup})(Group);
