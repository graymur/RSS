import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader/Loader';
import * as selectors from 'views/HomePage/selectors.js';
import { selectFeed } from 'views/HomePage/actions.js';

import './feeds.scss';

class Item extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        count: PropTypes.number.isRequired,
        unread: PropTypes.number.isRequired,
        selectFeed: PropTypes.func.isRequired,
        currentFeedId: PropTypes.string.isRequired,
        loading: PropTypes.bool
    };

	handleClick = e => {
		this.props.selectFeed(this.props.id);
	}

    render() {
        const { id, title, count, unread, loading, currentFeedId } = this.props;

        const className = ['feeds__group__item__title'];

        if (currentFeedId === id) {
            className.push('_current');
        }

        return (
            <div className='feeds__group__item' onClick={this.handleClick}>
                <span className={className.join(' ')}>{title} ({count}/{unread})</span>
                { loading ? <Loader size={12} className='loader' /> : null }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentFeedId: selectors.selectCurrentFeedId()
});

export default connect(mapStateToProps, { selectFeed })(Item);
