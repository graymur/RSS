import React from 'react';
import { Link } from 'react-router';

import styles from './header.sass';

class Menu extends React.PureComponent {
    render() {
        return (
            <nav className={styles.menu}>
                <Link to='/form' className={styles.menu__item + ' btn btn-default'} role='button'>Add new feed</Link>
                <a href='#' className={styles.menu__item + ' btn btn-default'} role='button'>Logout</a>
            </nav>
        );
    }
}

export default Menu;
