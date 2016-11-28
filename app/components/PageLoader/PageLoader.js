import React from 'react';
import Loader from 'components/Loader/Loader';

import styles from './pageLoader.sass';

export class PageLoader extends React.Component { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        document.querySelector('BODY').classList.add('_loading');
    }

    componentWillUnmount() {
        document.querySelector('BODY').classList.remove('_loading');
    }

    render() {
        return (
            <div className={styles['page-loader']}>
                <Loader size={100} />
            </div>
        );
    }
}

export default PageLoader;
