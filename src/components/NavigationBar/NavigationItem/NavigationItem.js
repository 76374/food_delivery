import React from 'react';
import styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => (
    <NavLink 
        className={styles.NavigationItem} 
        activeClassName={styles.NavigationItemActive}
        to={props.link}>{props.text}
    </NavLink>
)

export default NavigationItem;