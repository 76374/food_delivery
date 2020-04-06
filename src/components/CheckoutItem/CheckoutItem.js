import React from 'react';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';
import Button from '../Button/Button';
import styles from './CheckoutItem.module.css';

const CheckoutItem = (props) => {
  const hasCount = props.count !== undefined && props.count !== null;
  const countText = hasCount ? locale.get(localeKey.ITEMS_COUNT_FORMAT, props.count) : null;
  const price = hasCount ? props.price * props.count : props.price;
  return (
    <div className={styles.CheckoutItem}>
      <div className={styles.ItemText}>{props.title}</div>
      <div className={styles.TextSpace} />
      <div className={styles.ItemsCountText}>{countText}</div>
      <div className={styles.PriceText}>{locale.get(localeKey.CURRENCY_FORMAT_UAH, price)}</div>
      {props.onRemoveClick ? <Button type={1} text="прибрати" onClick={props.onRemoveClick} /> : null}
    </div>
  );
};

export default CheckoutItem;
