import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

interface NavigationItemProps {
  link: string;
  text: string;
}

const NavigationItem = (props: NavigationItemProps) => (
  <NavLink
    className={styles.NavigationItem}
    activeClassName={styles.NavigationItemActive}
    to={props.link}
  >
    {props.text}
  </NavLink>
);

export default NavigationItem;
