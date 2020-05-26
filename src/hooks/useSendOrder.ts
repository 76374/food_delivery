import { useCallback } from 'react';
import useStore from './useStore';
import OrderedItem from '../dto/OrderedItem';
import useApiCall from './apiCall';

const query = `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
    }
  }
`;

const useSendOrder = () => {
  const { order } = useStore();
  const apiCall = useApiCall();

  return useCallback(
    (orderItems: OrderedItem[], onSuccess: (() => void) | null = null) => {
      const requestPayload = {
        query,
        items: orderItems.map((i: OrderedItem) => ({ itemId: i.itemId, itemsCount: i.count })),
      };
      apiCall(requestPayload, (data) => {
        order.setOrderSentSuccess(true);
        order.clearOrderItems();
        if (onSuccess) {
          onSuccess();
        }
      });
    },
    [apiCall, order]
  );
};

export default useSendOrder;
