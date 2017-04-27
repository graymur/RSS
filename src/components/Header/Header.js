import React from 'react';
import Menu from './Menu.js';
import FeedInfo from '../FeedInfo/FeedInfo.js';

import './header.scss';

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
				<Menu />
                <FeedInfo />
            </div>
        );
    }
}

export default Header;
