import React from 'react';
import styles from './MealCard.module.css';
import locale from '../../../data/locale';
import localeKey from '../../../data/localeKey';

const item = props => {
    const buttons = [];
    const getButton = (title, key, onClick) => {
        return <button onClick={onClick} key={key}>{title}</button>;
    }
    if (props.orderedCount > 0) {
        buttons.push(getButton(locale.get(localeKey.MEAL_CARD_BT_REMOVE), "#mealCardBtRemove", () => {
            if (props.orderedCount) {
                props.itemsCountChanged(props.orderedCount - 1);
            }
        }));
    }
    buttons.push(getButton(locale.get(localeKey.MEAL_CARD_BT_ADD), "#mealCardBtAdd", () => {
        props.itemsCountChanged(props.orderedCount ? props.orderedCount + 1 : 1);
    }));

    return (
        <div className={styles.MealCard}>
            <p>{props.title}</p>
            {props.orderedCount > 0 ? <p>{locale.get(localeKey.ITEMS_COUNT_FORMAT, props.orderedCount)}</p> : null}
            <p>{locale.get(localeKey.CURRENCY_FORMAT_UAH, props.price)}</p>
            {buttons}
        </div>
    )
}

export default item;