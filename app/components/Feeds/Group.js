import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Item from './Item.js';

import styles from './feeds.sass';

class Group extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        feeds: React.PropTypes.array.isRequired
    };

    render() {
        const { title, feeds } = this.props;
        return (
            <div className={styles.group}>
                <h5 className={styles.title}>{title}</h5>
                {feeds.map((feed, index) => <Item key={index} {...feed} />)}
            </div>
        );
    }
}

export default Group;
