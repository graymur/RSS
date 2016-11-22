import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Item from './Item.js';

import styles from './feeds.sass';

class Group extends React.Component {
    render() {
        const { title, feeds } = this.props;
        console.log(this.props);
        return (
            <div className={styles.feeds__group}>
                <h5 className={styles.feeds__group__title}>{title}</h5>
                {feeds.map((feed, index) => <Item {...feed} key={index} />)}
            </div>
        );
    }
}

export default Group;
