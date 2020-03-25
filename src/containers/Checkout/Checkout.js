 import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { orderConfirmed } from '../../store/actions/order';
import { ORDER_SUCCESS } from '../../store/AppPaths';

 const Checkout = props => {
    const menuData = useSelector(state => state.order.menuData);
    const orderedItems = useSelector(state => state.order.orderedItems);
    const orderSentSuccess = useSelector(state => state.order.orderSentSuccess);

    const dispatch = useDispatch();

    if (orderSentSuccess) {
        props.history.push(ORDER_SUCCESS);
    }

    if (!orderedItems || orderedItems.length <= 0) {
        return (
            <h1>Ви ще нiчого не замовили</h1>
        );
    }

    const checkoutItems = orderedItems.map(orderedItem => {
        const ctgr = menuData.find(c => c.id === orderedItem.categoryId);
        const item = ctgr.items.find(m => m.id === orderedItem.itemId);
        return (
            <CheckoutItem
                key={ctgr.id + '__' + item.id}
                title={item.title}
                price={item.price}
                count={orderedItem.count}
            />
        );
    });

    const onSendClick = () => {
        dispatch(orderConfirmed(orderedItems));
    }

    return (
        <div>
            {checkoutItems}
            <button onClick={onSendClick}>Вiдправити замовлення</button>
        </div>
    );
 }

 export default Checkout;