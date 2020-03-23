import React from 'react';
import styles from './NavigationItem.module.css';

const NavigationItem = props => (
    <a className={styles.NavigationItem} href={props.link}>{props.text}</a>
)

export default NavigationItem;