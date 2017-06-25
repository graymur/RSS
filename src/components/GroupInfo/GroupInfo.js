import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import * as selectors from 'views/HomePage/selectors.js';
import {updateFeedPosts} from 'views/HomePage/actions.js';

import {Link} from 'react-router-dom';

import './group-info.scss';

export class GroupInfo extends React.PureComponent {
	static propTypes = {
		group: PropTypes.object
	};

	render() {
		const {group} = this.props;

		if (!group) return null;

		return (
			<div className='group-info'>
				<Link to={`/group-form/${group.id}`} className='item btn btn-default' role='button'>
					Edit group
				</Link>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	group: selectors.selectCurrentGroup()
});

export default connect(mapStateToProps, {updateFeedPosts})(GroupInfo);
