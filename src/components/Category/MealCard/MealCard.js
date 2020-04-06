import React from 'react';
import styles from './MealCard.module.css';
import locale from '../../../data/locale';
import localeKey from '../../../data/localeKey';
import Button from '../../Button/Button';

const item = (props) => {
  const buttons = [];
  const getButton = (title, key, onClick) => <Button onClick={onClick} key={key} text={title} />;
  if (props.orderedCount > 0) {
    buttons.push(getButton(locale.get(localeKey.MEAL_CARD_BT_REMOVE), '#mealCardBtRemove', () => {
      if (props.orderedCount) {
        props.itemsCountChanged(props.orderedCount - 1);
      }
    }));
  }
  buttons.push(getButton(locale.get(localeKey.MEAL_CARD_BT_ADD), '#mealCardBtAdd', () => {
    props.itemsCountChanged(props.orderedCount ? props.orderedCount + 1 : 1);
  }));

  let itemsAmount = null;
  let className = styles.MealCard;
  if (props.orderedCount > 0) {
    itemsAmount = <b>{locale.get(localeKey.ITEMS_COUNT_FORMAT, props.orderedCount)}</b>;
    className += ` ${styles.Selected}`;
  }

  return (
    <div className={className}>
      <p>{props.title}</p>
      <p>
        {locale.get(localeKey.CURRENCY_FORMAT_UAH, props.price)}
        {' '}
        {itemsAmount}
      </p>
      <div className={styles.FlexGrow} />
      <div>{buttons}</div>
    </div>
  );
};

export default item;
