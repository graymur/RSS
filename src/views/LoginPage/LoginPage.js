import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './login.scss';

export class LoginPage extends React.Component {
	static propTypes = {
		googleAuthURL: PropTypes.string.isRequired
	};

    render() {
		const { googleAuthURL } = this.props;

        return (
            <div className='login-page'>
                <a href={googleAuthURL} className='login-page__item _google'>
					<span className='login-page__item__logo _google' />
					Login with Google
				</a>
                <a href='' className='login-page__item _facebook _inactive'>
					<span className='login-page__item__logo _google' />
					Login with Facebook
				</a>
                <a href='' className='login-page__item _github _inactive'>
					<span className='login-page__item__logo _google' />
					Login with Github
				</a>
            </div>
        );
    }
}

const mapStateToProps = ({ global }) => ({
	googleAuthURL: global.googleAuthURL
})

export default connect(mapStateToProps, {})(LoginPage);
