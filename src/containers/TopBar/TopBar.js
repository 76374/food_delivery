import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './TopBar.module.css';

const TopBar = () => {
    const navigationItems = [
        { link: '/', text: 'Замовлення'},
        { link: '/checkout', text: 'Оформити'}
    ];

    return (
        <div className={styles.TopBar}>
            <NavigationBar items={navigationItems}/>
        </div>
    );
}

export default TopBar;