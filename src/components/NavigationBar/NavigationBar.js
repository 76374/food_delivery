import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationBar.module.css';

const NavigationBar = props => {
    const navigationItems = props.items.map((item, index) =>
        <NavigationItem text={item.text} link={item.link} key={'#navBarItem' + index} />
    );

    return (
        <div className={styles.NavigationBar}>
            {navigationItems}
        </div>
    );
}

export default NavigationBar;