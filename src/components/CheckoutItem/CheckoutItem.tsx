import React from 'react';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../Button/Button';
import styles from './CheckoutItem.module.css';

interface CheckoutItemProps {
  title: string;
  price: number;
  count?: number;
  onRemoveClick?(): void;
}

const CheckoutItem = (props: CheckoutItemProps) => {
  const countText = props.count !== undefined ? Locale.get(LocaleKey.ITEMS_COUNT_FORMAT, props.count.toString()) : null;
  const price = props.count !== undefined ? props.price * props.count : props.price;
  return (
    <div className={styles.CheckoutItem}>
      <div className={styles.ItemText}>{props.title}</div>
      <div className={styles.TextSpace} />
      <div className={styles.ItemsCountText}>{countText}</div>
      <div className={styles.PriceText}>{Locale.get(LocaleKey.CURRENCY_FORMAT_UAH, price.toString())}</div>
      {props.onRemoveClick ? <Button type={1} text="прибрати" onClick={props.onRemoveClick} /> : null}
    </div>
  );
};

export default CheckoutItem;
