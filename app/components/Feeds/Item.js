import React from 'react';

import styles from './feeds.sass';

class Item extends React.Component {
    render() {
        const { title } = this.props;
        console.log(this.props);
        return (
            <div className={styles.feeds__group__item}>
                {title}
            </div>
        );
    }
}

export default Item;
