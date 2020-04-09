import React from 'react';
import { Redirect } from 'react-router';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { ORDER_SUCCESS } from '../../data/appPaths';
import AuthPopup from '../../components/Popups/AuthPopup/AuthPopup';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';
import Button from '../../components/Button/Button';

import styles from './Checkout.module.css';
import { useLocalStore, observer } from 'mobx-react';
import useStore from '../../hooks/useStore';
import useSendOrder from '../../hooks/useSendOrder';
import useLocalData from '../../hooks/useLocalData';

const Checkout = () => {
  const { order, appState } = useStore();
  const sendOrder = useSendOrder();
  const localData = useLocalData();

  const localStore = useLocalStore(() => ({
    confirming: false,
    authPending: false
  }));

  const onRemoveClick = (e, orderedItem) => {
    order.setOrderedItem(
      orderedItem.categoryId,
      orderedItem.itemId,
      orderedItem.count - 1
    );
  };

  if (localStore.confirming && order.orderSentSuccess) {
    return <Redirect to={ORDER_SUCCESS} />;
  }

  if (!order.orderedItems || order.orderedItems.length <= 0) {
    return <h1>{locale.get(localeKey.CHECKOUT_MESSAGE_NO_ORDERS)}</h1>;
  }

  const checkoutItems = [];
  let totalPrice = 0;

  order.orderedItems.forEach((orderedItem) => {
    const ctgr = order.menuData.find((c) => c.id === orderedItem.categoryId);
    const item = ctgr.items.find((m) => m.id === orderedItem.itemId);
    checkoutItems.push(
      <CheckoutItem
        key={`#checkout-item-${ctgr.id}__${item.id}`}
        title={item.title}
        price={item.price}
        count={orderedItem.count}
        onRemoveClick={e => onRemoveClick(e, orderedItem)}
      />
    );
    totalPrice += item.price * orderedItem.count;
  });
  checkoutItems.push(
    <CheckoutItem key="#checkout-item-total-price" title="Всього" price={totalPrice} />
  );

  const onSendClick = () => {
    if (appState.authData) {
      localStore.confirming = true;
      sendOrder(order.orderedItems);
    } else {
      localStore.authPending = true;
    }
  };

  const onAuthSubmit = (authData) => {
    localStore.authPending = false;
    localStore.confirming = true;

    localData.setUserData(authData.firstName, authData.lastName);
    sendOrder(order.orderedItems);
  };

  const onAuthCancel = () => {
    localStore.authPending = false;
  };

  let authPopup = null;
  if (localStore.authPending) {
    authPopup = <AuthPopup onSubmit={onAuthSubmit} onCancel={onAuthCancel} />;
  }

  return (
    <>
      <div className={styles.Checkout}>
        {checkoutItems}
        <Button onClick={onSendClick} text={locale.get(localeKey.CHECKOUT_BT_SEND)} />
      </div>
      {authPopup}
    </>
  );
};

export default observer(Checkout);
