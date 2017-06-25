import React from 'react';
import { Link } from 'react-router-dom';

export default class Menu extends React.PureComponent {
    render() {
        return (
            <nav className='menu'>
				<Link to='/form' className='menu__item btn btn-default' role='button'>Add new feed</Link>
				<Link to='/group-form' className='menu__item btn btn-default' role='button'>Add new group</Link>
                <a href='#' className='menu__item btn btn-default' role='button'>Logout</a>
            </nav>
        );
    }
}
