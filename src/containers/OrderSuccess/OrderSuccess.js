import React from 'react';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';

const OrderSuccess = () => (
    <h1>{locale.get(localeKey.ORDER_SUCCESS_MESSAGE)}</h1>
);

export default OrderSuccess;