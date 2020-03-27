import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './TopBar.module.css';
import { ORDER, CHECKOUT, AUTH, LOGOUT } from '../../store/AppPaths';
import { useSelector } from 'react-redux';

const TopBar = () => {
    const authData = useSelector(state => state.appState.authData);
    const navigationItems = [
        { link: ORDER, text: 'Замовлення'},
        { link: CHECKOUT, text: 'Оформити'},
        authData ? { link: LOGOUT, text: `Вийти (${authData.firstName})`} : { link: AUTH, text: 'Увiйти'}
    ];

    return (
        <div className={styles.TopBar}>
            <NavigationBar items={navigationItems}/>
        </div>
    );
}

export default TopBar;