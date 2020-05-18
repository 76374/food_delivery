import { useCallback } from 'react';
import axios from 'axios';
import useStore from './useStore';
import { getOrderRequest } from '../utils/dataConvert';
import BackendPath from '../const/BackendPath';

const useSendOrder = () => {
  const { appState, order } = useStore();

  return useCallback(
    (orderData) => {
      const PROCESS_ID = 'order';
      appState.addProcess(PROCESS_ID);
      axios
        .post(BackendPath.ORDERS_PATH, getOrderRequest(orderData))
        .then((/* response */) => {
          order.setOrderSentSuccess(true);
          order.clearOrderItems();
        })
        .catch((error) => {
          appState.setError(error.message);
        })
        .then(() => {
          appState.removeProcess(PROCESS_ID);
        });
    },
    [order, appState]
  );
};

export default useSendOrder;
