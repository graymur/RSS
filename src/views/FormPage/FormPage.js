import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import * as selectors from './selectors';
import Loader from 'components/Loader/Loader';
import ErrorElement from 'components/ErrorElement.js';
import {checkFeed, resetFeed, saveFeed, editFeed, clearFeedData} from './actions';
import idx from 'idx';
import {Link} from 'react-router-dom';

import './form.scss';

const initialState = {
	id: '',
	url: '',
	title: ''
};

export class FormPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {...initialState};
	}

	componentWillMount() {
		const {match, data, editFeed, clearFeedData} = this.props;
		const feedId = idx(match, _ => _.params.id);

		/**
		 * User switched from editing feed to creating,
		 * we need to clear previous feed data
		 */
		if (!feedId && data.id) {
			clearFeedData();
			/**
			 * Start editing feed, populate data
			 */
		// } else if ((feedId && !data.id) || feedId !== data.id) {
		} else if (feedId) {
			editFeed(feedId);
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

	handleUrlChange = event => {
		this.handleFieldChange('url')(event);
		this.props.resetFeed();
	}

	handleSubmit = event => {
		event.preventDefault();
		this.props.saveFeed({...this.state, realTitle: this.props.data.title});
	}

	checkFeed = event => {
		event.preventDefault();
		const url = this.state.url;
		this.props.checkFeed(url);
	}

	valid() {
		return this.state.title.length > 0;
	}

	render() {
		const {loading, data, error, saved} = this.props;

		const showStyle = {display: data && data.title ? 'block' : 'none'};
		const hideStyle = {display: data && data.title ? 'none' : 'block'};

		return (
			<div className='form'>
				<form onSubmit={this.handleSubmit}>
					<input type='hidden' name='id' value={this.state.id}/>
					<div className='form-group'>
						<label htmlFor='url'>Feed URL</label>
						<input type='url' className='form-control' id='url' name='url' placeholder='Feed URL' value={this.state.url} onChange={this.handleUrlChange}/>
					</div>
					<div className='form-group' style={hideStyle}>
						<button className='button btn btn-default' onClick={this.checkFeed} disabled={loading || !this.state.url.length}>Check feed</button>
						<Link to='/' className='button btn btn-default'>Cancel</Link>
						{loading ? <Loader size={34}/> : null}
					</div>
					<div className='form-group' style={showStyle}>
						<label htmlFor='title'>Feed Title</label>
						<input type='text' className='form-control' id='title' name='title' placeholder='Feed title' value={this.state.title} onChange={this.handleFieldChange('title')}/>
					</div>
					<div className='form-group' style={showStyle}>
						<button className='button btn btn-default' type='submit' disabled={error || loading || !this.valid()}>Save feed</button>
						<Link to='/' className='button btn btn-default'>Cancel</Link>
						{loading ? <Loader size={34}/> : null}
					</div>
					{error ? <ErrorElement error={error}/> : null}
					{saved ? <h6>Feed was successfully saved</h6> : null}
				</form>
			</div>
		);
	}
}

FormPage.propTypes = {
	match: PropTypes.any,
	checkFeed: PropTypes.func,
	resetFeed: PropTypes.func,
	saveFeed: PropTypes.func,
	editFeed: PropTypes.func,
	clearFeedData: PropTypes.func,
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
	checkFeed,
	resetFeed,
	saveFeed,
	editFeed,
	clearFeedData
})(FormPage);
