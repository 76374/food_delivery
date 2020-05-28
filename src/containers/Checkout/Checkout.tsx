import React from 'react';
import { RouteComponentProps } from 'react-router';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import AppPath from '../../const/AppPath';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../../components/Button/Button';
import styles from './Checkout.module.css';
import { observer } from 'mobx-react';
import useStore from '../../hooks/useStore';
import useSendOrder from '../../hooks/useSendOrder';
import OrderedItem from '../../dto/OrderedItem';

const Checkout = (props: RouteComponentProps) => {
  const { order, user } = useStore();

  const sendOrder = useSendOrder();

  // TODO: use callbacks
  const onRemoveClick = (orderedItem: OrderedItem) => {
    order.setOrderedItem(orderedItem.categoryId, orderedItem.itemId, orderedItem.count - 1);
  };

  const onSendClick = () => {
    if (user.isSignedIn) {
      sendOrder(() => {
        props.history.push(AppPath.ORDER_SUCCESS);
      });
    } else {
      props.history.push(AppPath.SIGN_IN);
    }
  };

  if (!order.containsOrderedItems) {
    return <h1>{Locale.get(LocaleKey.CHECKOUT_MESSAGE_NO_ORDERS)}</h1>;
  }

  let totalPrice: number = 0;
  const checkoutItems = order.orderedItems.map((orderedItem) => {
    const ctgr = order.getCategoryItem(orderedItem.categoryId);
    if (ctgr === null) {
      console.error(`unexpected data (category ${orderedItem.categoryId})`);
      return null;
    }
    const item = ctgr.items.find((m) => m.id === orderedItem.itemId);
    if (item === undefined) {
      console.error(`unexpected data (item ${orderedItem.itemId})`);
      return null;
    }

    totalPrice += item.price * orderedItem.count;

    return (
      <CheckoutItem
        key={`#checkout-item-${ctgr.id}__${item.id}`}
        title={item.title}
        price={item.price}
        count={orderedItem.count}
        onRemoveClick={() => {
          onRemoveClick(orderedItem);
        }}
      />
    );
  });
  checkoutItems.push(
    <CheckoutItem key="#checkout-item-total-price" title="Всього" price={totalPrice} />
  );

  return (
    <div className={styles.Checkout}>
      {checkoutItems}
      <Button onClick={onSendClick} text={Locale.get(LocaleKey.CHECKOUT_BT_SEND)} />
    </div>
  );
};

export default observer(Checkout);
