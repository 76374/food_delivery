import React from 'react';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';

const OrderSuccess = () => (
  <h1>{Locale.get(LocaleKey.ORDER_SUCCESS_MESSAGE)}</h1>
);

export default OrderSuccess;
