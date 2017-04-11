import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import * as selectors from './selectors';
import Loader from 'components/Loader/Loader';
import ErrorElement from './ErrorElement.js';
import { checkFeed, resetFeed, saveFeed } from './actions';

import './form.scss';

export class FormPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feedUrl: '',
            feedTitle: ''
        };
    }

    componentWillReceiveProps(props) {
        if (props.data && props.data.title) {
            this.setState({ feedTitle: props.data.title });
        }
    }

    handleUrlChange = event => {
        this.setState({ feedUrl: event.target.value });
        this.props.resetFeed();
    }

    handleTitleChange = event => {
        this.setState({ feedTitle: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.props.saveFeed({
            url: this.state.feedUrl,
            title: this.state.feedTitle,
            realTitle: this.props.data.realTitle
        });
    }

    checkFeed = event => {
		event.preventDefault();
        const url = this.state.feedUrl;
        this.props.checkFeed(url);
    }

    valid() {
        return this.state.feedTitle.length > 0;
    }

    render() {
        const { loading, data, error, saved } = this.props;

        const showStyle = { display: data && data.title ? 'block' : 'none' };
        const hideStyle = { display: data && data.title ? 'none' : 'block' };

        return (
            <div className='form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='feedUrl'>Feed URL</label>
                        <input type='url' className='form-control' id='feedUrl' name='feedUrl' placeholder='Feed URL' value={this.state.feedUrl} onChange={this.handleUrlChange} />
                    </div>
                    <div className='form-group' style={hideStyle}>
                        <button className='button btn btn-default' onClick={this.checkFeed} disabled={loading || !this.state.feedUrl.length}>Check feed</button>
                        {loading ? <Loader size={34} /> : null}
                    </div>
                    <div className='form-group' style={showStyle}>
                        <label htmlFor='feedTitle'>Feed Title</label>
                        <input type='text' className='form-control' id='feedTitle' name='feedTitle' placeholder='Feed title' value={this.state.feedTitle} onChange={this.handleTitleChange} />
                    </div>
                    <div className='form-group' style={showStyle}>
                        <button className='button btn btn-default' type='submit' disabled={error || saved || loading || !this.valid()}>Save feed</button>
                        {loading ? <Loader size={34} /> : null}
                    </div>
                    {error ? <ErrorElement error={error} /> : null}
                    {saved ? <h6>Feed was successfully saved</h6> : null}
                </form>
            </div>
        );
    }
}

FormPage.propTypes = {
    checkFeed: PropTypes.func,
    resetFeed: PropTypes.func,
    saveFeed: PropTypes.func,
    loading: PropTypes.bool,
    // valid: PropTypes.bool,
    saved: PropTypes.bool,
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
    // valid: selectors.selectLoading(),
    error: selectors.selectError(),
    data: selectors.selectData(),
    saved: selectors.selectSaved()
});

export default connect(mapStateToProps, {
    checkFeed,
    resetFeed,
    saveFeed
})(FormPage);
