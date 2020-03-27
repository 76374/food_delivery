import React from 'react';

const CheckoutItem = props => {
    const hasCount = props.count !== undefined && props.count !== null;
    const countText = hasCount ? props.count + ' шт.' : null;
    const price = hasCount ? props.price * props.count : props.price;
    return (
        <div>
            <p><b>{props.title}</b> {countText} {price} грн.</p>
        </div>
    );
};

export default CheckoutItem;