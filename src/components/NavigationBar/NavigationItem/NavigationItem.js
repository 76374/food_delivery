import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = (props) => (
  <NavLink
    className={styles.NavigationItem}
    activeClassName={styles.NavigationItemActive}
    to={props.link}
  >
    {props.text}
  </NavLink>
);

export default NavigationItem;
