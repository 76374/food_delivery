import { useCallback } from 'react';
import axios from 'axios';
import useStore from './useStore';
import { ORDERS_PATH } from '../data/backendPaths';
import { getOrederRequest } from '../utils/data';

const useSendOrder = () => {
  const { appState, order } = useStore();

  return useCallback(
    (orderData) => {
      const PROCESS_ID = 'order';
      appState.addProcess(PROCESS_ID);
      axios
        .post(ORDERS_PATH, getOrederRequest(orderData))
        .then((/* response */) => {
          order.setOrderSentSuccess(true);
          order.orderedItems = [];
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
