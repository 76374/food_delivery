import React from 'react';
import styles from './MealCard.module.css';

const item = props => (
    <div className={styles.MealCard}>
        <p>{props.title}</p>
        <p>price: {props.price}</p>
    </div>
)

export default item;