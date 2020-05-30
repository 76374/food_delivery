import React from 'react';
import styles from './MealCard.module.css';
import Locale from '../../../service/Locale';
import LocaleKey from '../../../const/LocaleKey';
import Button from '../../Button/Button';

const item = (props: MealCardProps) => {
  const { orderedCount } = props;
  const buttons: JSX.Element[] = [];
  const getButton = (title: string, key: string, onClick: () => void) => (
    <Button onClick={onClick} key={key} text={title} />
  );
  if (orderedCount > 0) {
    buttons.push(
      getButton(Locale.get(LocaleKey.MEAL_CARD_BT_REMOVE), '#mealCardBtRemove', () => {
        if (orderedCount) {
          props.itemsCountChanged(orderedCount - 1);
        }
      })
    );
  }
  buttons.push(
    getButton(Locale.get(LocaleKey.MEAL_CARD_BT_ADD), '#mealCardBtAdd', () => {
      props.itemsCountChanged(orderedCount ? orderedCount + 1 : 1);
    })
  );

  let itemsAmount: JSX.Element | null = null;
  let className: string = styles.MealCard;
  if (orderedCount > 0) {
    itemsAmount = <b>{Locale.get(LocaleKey.ITEMS_COUNT_FORMAT, orderedCount.toString())}</b>;
    className += ` ${styles.Selected}`;
  }

  return (
    <div className={className}>
      <p>{props.title}</p>
      <p>
        {Locale.get(LocaleKey.CURRENCY_FORMAT_UAH, props.price.toString())} {itemsAmount}
      </p>
      <div className={styles.FlexGrow} />
      <div>{buttons}</div>
    </div>
  );
};

interface MealCardProps {
  orderedCount: number;
  title: string;
  price: number;
  itemsCountChanged(count: number): void;
}

export default item;
