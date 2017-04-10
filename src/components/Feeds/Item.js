import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Loader from 'components/Loader/Loader';
import * as selectors from 'views/HomePage/selectors.js';
import { selectFeed } from 'views/HomePage/actions.js';

import styles from './feeds.scss';

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

    render() {
        const { id, title, count, unread, selectFeed, loading, currentFeedId } = this.props;

        const className = [styles.feeds__group__item__title];

        if (currentFeedId === id) {
            className.push(styles.current);
        }

        return (
            <div className={styles.feeds__group__item} onClick={() => selectFeed(id)}>
                <span className={className.join(' ')}>{title} ({count}/{unread})</span>
                { loading ? <Loader size={12} className={styles.loader} /> : null }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentFeedId: selectors.selectCurrentFeedId()
});

export default connect(mapStateToProps, { selectFeed })(Item);
