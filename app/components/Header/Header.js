import React from 'react';
//import { FormattedMessage } from 'react-intl';
import Menu from './Menu.js';

import styles from './header.sass';

class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <Menu />
            </div>
        );
    }
}

export default Header;
