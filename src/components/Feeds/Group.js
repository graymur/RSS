import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.js';

import {connect} from 'react-redux';
import {selectGroup} from 'views/HomePage/actions.js';
import {createStructuredSelector} from 'reselect';
import * as selectors from 'views/HomePage/selectors.js';
import classNames from 'classnames';

import './feeds.scss';

class Group extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		currentGroupId: PropTypes.string,
		feeds: PropTypes.array.isRequired,
		selectGroup: PropTypes.func.isRequired
	};

	handleGroupClick = e => {
		this.props.selectGroup(this.props.id);
	}

	render() {
		const {id, title, feeds, currentGroupId} = this.props;
		const className = classNames('feeds__group__title', {'_current': currentGroupId === id});

		return (
			<div className='feeds__group'>
				<h5 className={className} onClick={this.handleGroupClick}>{title}</h5>
				{feeds.map((feed, index) => <Item key={index} {...feed} />)}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentGroupId: selectors.selectCurrentGroupId()
});

export default connect(mapStateToProps, {selectGroup})(Group);
