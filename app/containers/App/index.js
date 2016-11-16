import React from 'react';
import Helmet from 'react-helmet';
import Header from 'components/Header';

import styles from './app.sass';

function App(props) {
    return (
        <div className={styles.main}>
            <Helmet
                titleTemplate="%s"
                defaultTitle="RSS"
                meta={[{ name: 'description', content: 'RSS reader build with React.js' }]}
                />
            <Header />
            {React.Children.toArray(props.children)}
        </div>
    );
}

App.propTypes = {
    children: React.PropTypes.node
};

export default App;
