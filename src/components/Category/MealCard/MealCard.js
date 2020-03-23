import React from 'react';
import styles from './MealCard.module.css';

const item = props => {
    const buttons = [];
    const getButton = (title, key, onClick) => {
        return <button onClick={onClick} key={key}>{title}</button>;
    }
    if (props.orderedCount > 0) {
        buttons.push(getButton('прибрати', "#mealCardBtRemove", () => {
            if (props.orderedCount) {
                props.itemsCountChanged(props.orderedCount - 1);
            }
        }));
    }
    buttons.push(getButton('додати', "#mealCardBtAdd", () => {
        console.log('onClick');
        props.itemsCountChanged(props.orderedCount ? props.orderedCount + 1 : 1);
    }));

    return (
        <div className={styles.MealCard}>
            <p>{props.title}</p>
            {props.orderedCount > 0 ? <p>{props.orderedCount} шт.</p> : null}
            <p>{props.price} грн</p>
            {buttons}
        </div>
    )
}

export default item;