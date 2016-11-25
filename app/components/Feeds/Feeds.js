import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Group from './Group.js';

import styles from './feeds.sass';

export class Feeds extends React.Component {
    render() {
        return (
            <div className={styles.feeds}>
                {this.props.feeds.map((group, index) => <Group key={index} {...group} />)}
            </div>
        );
    }
}

export default Feeds;


