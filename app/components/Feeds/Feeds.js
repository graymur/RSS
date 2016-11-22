import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Group from './Group.js';

import styles from './feeds.sass';

class Feeds extends React.Component {
    render() {
        console.log(this.props.feeds);
        return (
            <div className={styles.feeds}>
                {this.props.feeds.map((group, index) => <Group {...group} key={index} />)}
            </div>
        );
    }
}

export default Feeds;
