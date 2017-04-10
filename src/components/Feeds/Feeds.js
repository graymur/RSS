import React from 'react';
import PropTypes from 'prop-types';
import GeminiScrollbar from 'react-gemini-scrollbar';

//import { FormattedMessage } from 'react-intl';
import Group from './Group.js';

import styles from './feeds.scss';

export class Feeds extends React.Component {
    static propTypes = {
        feeds: PropTypes.array.isRequired
    };

    render() {
        return (
            <div className={styles.feeds}>
                <GeminiScrollbar>
                    {this.props.feeds.map((group, index) => <Group key={index} {...group} />)}
                </GeminiScrollbar>
            </div>
        );
    }
}

export default Feeds;
