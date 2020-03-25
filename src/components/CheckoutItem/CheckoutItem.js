import React from 'react';

const CheckoutItem = props => (
    <div>
        <h1>{props.title}</h1>
        <h2>{props.count} шт.</h2>
        <h3>{props.price * props.count} грн.</h3>
    </div>
);

export default CheckoutItem;