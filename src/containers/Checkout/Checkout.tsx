import React from 'react';
import { Redirect } from 'react-router';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import AppPath from '../../const/AppPath';
import AuthPopup from '../../components/Popups/AuthPopup/AuthPopup';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../../components/Button/Button';
import styles from './Checkout.module.css';
import { useLocalStore, observer } from 'mobx-react';
import useStore from '../../hooks/useStore';
import useSendOrder from '../../hooks/useSendOrder';
import useLocalData from '../../hooks/useLocalData';
import OrderedItem from '../../dto/OrderedItem';
import AuthData from '../../dto/AuthData';

const Checkout = () => {
  const { order, appState } = useStore();
  const sendOrder = useSendOrder();
  const { setUserData } = useLocalData();

  const localStore = useLocalStore(() => ({
    confirming: false,
    authPending: false,
  }));

  const onRemoveClick = (orderedItem: OrderedItem) => {
    order.setOrderedItem(orderedItem.categoryId, orderedItem.itemId, orderedItem.count - 1);
  };

  if (localStore.confirming && order.orderSentSuccess) {
    return <Redirect to={AppPath.ORDER_SUCCESS} />;
  }

  if (!order.containsOrderedItems) {
    return <h1>{Locale.get(LocaleKey.CHECKOUT_MESSAGE_NO_ORDERS)}</h1>;
  }

  const checkoutItems: JSX.Element[] = [];
  let totalPrice: number = 0;

  order.orderedItems.forEach((orderedItem) => {
    const ctgr = order.getCategoryItem(orderedItem.categoryId);
    if (ctgr === null) {
      console.error(`unexpected data (category ${orderedItem.categoryId})`);
      return;
    }
    const item = ctgr.items.find((m) => m.id === orderedItem.itemId);
    if (item === undefined) {
      console.error(`unexpected data (item ${orderedItem.itemId})`);
      return;
    }
    checkoutItems.push(
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

  const onAuthSubmit = (authData: AuthData) => {
    localStore.authPending = false;
    localStore.confirming = true;

    setUserData(authData.firstName, authData.lastName);
    sendOrder(order.orderedItems);
  };

  const onAuthCancel = () => {
    localStore.authPending = false;
  };

  let authPopup: JSX.Element | null = null;
  if (localStore.authPending) {
    authPopup = <AuthPopup onSubmit={onAuthSubmit} onCancel={onAuthCancel} />;
  }

  return (
    <>
      <div className={styles.Checkout}>
        {checkoutItems}
        <Button onClick={onSendClick} text={Locale.get(LocaleKey.CHECKOUT_BT_SEND)} />
      </div>
      {authPopup}
    </>
  );
};

export default observer(Checkout);
