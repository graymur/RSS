import React from 'react';
import PropTypes from 'prop-types';

import './feed.scss';

export class UpdatePostsMessage extends React.Component {
    static propTypes = {
        onUpdatePostsClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className='empty-message'>
                <h3 className='empty-message__title'>This feed is empty.</h3>
                <span className='btn btn-default' onClick={this.props.onUpdatePostsClick}>Fetch posts</span>
            </div>
        );
    }
}

export default UpdatePostsMessage;
