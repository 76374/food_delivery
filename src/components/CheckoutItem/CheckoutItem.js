import React from 'react';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';

const CheckoutItem = props => {
    const hasCount = props.count !== undefined && props.count !== null;
    const countText = hasCount ? locale.get(localeKey.ITEMS_COUNT_FORMAT, props.count) : null;
    const price = hasCount ? props.price * props.count : props.price;
    return (
        <div>
            <p><b>{props.title}</b> {countText} {locale.get(localeKey.CURRENCY_FORMAT_UAH, price)}</p>
        </div>
    );
};

export default CheckoutItem;