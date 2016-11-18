import React from 'react';
//import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

import styles from './header.sass';

class Header extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <nav className={styles.menu}>
                    <Link to="/form" className={styles.menu__item + ' btn btn-default'} role="button">Add new feed</Link>
                    <a href="#" className={styles.menu__item + ' btn btn-default'} role="button">Logout</a>
                </nav>
            </div>
        );
    }
}

export default Header;
