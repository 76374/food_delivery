import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { orderConfirmed, orderedItemsCountChanged } from '../../store/actions/order';
import { ORDER_SUCCESS } from '../../data/appPaths';
import AuthPopup from '../../components/Popups/AuthPopup/AuthPopup';
import { authSubmited } from '../../store/actions/appState';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';
import Button from '../../components/Button/Button';

import styles from './Checkout.module.css';

const Checkout = () => {
  const menuData = useSelector((state) => state.order.menuData);
  const orderedItems = useSelector((state) => state.order.orderedItems);
  const orderSentSuccess = useSelector((state) => state.order.orderSentSuccess);
  const authorized = useSelector((state) => Boolean(state.appState.authData));

  const [authPending, setAuthPending] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const dispatch = useDispatch();

  if (confirming && orderSentSuccess) {
    return <Redirect to={ORDER_SUCCESS} />;
  }

  if (!orderedItems || orderedItems.length <= 0) {
    return <h1>{locale.get(localeKey.CHECKOUT_MESSAGE_NO_ORDERS)}</h1>;
  }

  const checkoutItems = [];
  let totalPrice = 0;

  orderedItems.forEach((orderedItem) => {
    const ctgr = menuData.find((c) => c.id === orderedItem.categoryId);
    const item = ctgr.items.find((m) => m.id === orderedItem.itemId);
    checkoutItems.push(
      <CheckoutItem
        key={`#checkout-item-${ctgr.id}__${item.id}`}
        title={item.title}
        price={item.price}
        count={orderedItem.count}
        onRemoveClick={() => {
          dispatch(
            orderedItemsCountChanged(
              orderedItem.categoryId,
              orderedItem.itemId,
              orderedItem.count - 1
            )
          );
        }}
      />
    );
    totalPrice += item.price * orderedItem.count;
  });
  checkoutItems.push(
    <CheckoutItem key="#checkout-item-total-price" title="Всього" price={totalPrice} />
  );

  const onSendClick = () => {
    if (authorized) {
      setConfirming(true);
      dispatch(orderConfirmed(orderedItems));
    } else {
      setAuthPending(true);
    }
  };

  const onAuthSubmit = (authData) => {
    setAuthPending(false);
    setConfirming(true);
    dispatch(authSubmited(authData));
    dispatch(orderConfirmed(orderedItems));
  };

  const onAuthCancel = () => {
    setAuthPending(false);
  };

  let authPopup = null;
  if (authPending) {
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

export default Checkout;
