import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.js';

import './feeds.scss';

class Group extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        feeds: PropTypes.array.isRequired
    };

    render() {
        const { title, feeds } = this.props;
        return (
            <div className='feeds__group'>
                <h5 className='feeds__group__title'>{title}</h5>
                {feeds.map((feed, index) => <Item key={index} {...feed} />)}
            </div>
        );
    }
}

export default Group;
