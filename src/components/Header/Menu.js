import React from 'react';
// import { Link } from 'react-router';

// import styles from './header.scss';

export default class Menu extends React.PureComponent {
    render() {
        return (
            <nav className='menu'>
                <a href='/form' className='menu__item btn btn-default' role='button'>Add new feed</a>
                <a href='#' className='menu__item btn btn-default' role='button'>Logout</a>
            </nav>
        );
    }
}
