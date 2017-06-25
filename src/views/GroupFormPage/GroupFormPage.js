import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import * as selectors from './selectors';
import Loader from 'components/Loader/Loader';
import ErrorElement from './ErrorElement.js';
import {saveGroup, editGroup, clearGroupData} from './actions';
import idx from 'idx';
import {Link} from 'react-router-dom';

import './group.scss';

const initialState = {
	id: '',
	title: ''
};

export class GroupFormPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...initialState};
	}

	componentWillMount() {
		const {match, data, editGroup, clearGroupData} = this.props;
		const groupId = idx(match, _ => _.params.id);

		/**
		 * User switched from editing feed to creating,
		 * we need to clear previous feed data
		 */
		if (!groupId && data.id) {
			clearGroupData();
			/**
			 * Start editing feed, populate data
			 */
		} else if (groupId) {
			editGroup(groupId);
		}
	}

	componentWillReceiveProps(props) {
		if (props.data && !props.saving) {
			this.setState({...props.data});
		} else if (!props.saving) {
			this.setState({...initialState});
		}
	}

	handleFieldChange = field => event => {
		this.setState({[field]: event.target.value});
	}

	handleTitleChange = event => {
		this.handleFieldChange('title')(event);
	}

	handleSubmit = event => {
		event.preventDefault();
		this.props.saveGroup({...this.state});
	}

	valid() {
		return this.state.title.length > 0;
	}

	render() {
		const {loading, error, saved} = this.props;

		return (
			<div className='form'>
				<form onSubmit={this.handleSubmit}>
					<input type='hidden' name='id' value={this.state.id}/>
					<div className='form-group'>
						<label htmlFor='url'>Group title</label>
						<input className='form-control' id='title' name='title' placeholder='Group title' value={this.state.title} onChange={this.handleTitleChange}/>
					</div>
					<div className='form-group'>
						<button className='button btn btn-default' type='submit' disabled={error || loading || !this.valid()}>Save group</button>
						<Link to='/' className='button btn btn-default'>Cancel</Link>
						{loading ? <Loader size={34}/> : null}
					</div>
					{error ? <ErrorElement error={error}/> : null}
					{saved ? <h6>Group was successfully saved</h6> : null}
				</form>
			</div>
		);
	}
}

GroupFormPage.propTypes = {
	match: PropTypes.any,
	saveGroup: PropTypes.func,
	editGroup: PropTypes.func,
	clearGroupData: PropTypes.func,
	loading: PropTypes.bool,
	saved: PropTypes.bool,
	saving: PropTypes.bool,
	error: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool
	]),
	data: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.bool
	])
};

const mapStateToProps = createStructuredSelector({
	loading: selectors.selectLoading(),
	error: selectors.selectError(),
	data: selectors.selectData(),
	saved: selectors.selectSaved(),
	saving: selectors.selectSaving()
});

export default connect(mapStateToProps, {
	saveGroup,
	editGroup,
	clearGroupData
})(GroupFormPage);
