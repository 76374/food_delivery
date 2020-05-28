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
    (onSuccess: (() => void) | null = null) => {
      const orderedItems = order.orderedItems;
      const requestPayload = {
        query,
        input: {
          items: orderedItems.map((i: OrderedItem) => ({ itemId: i.itemId, itemsCount: i.count })),
        },
      };
      apiCall(requestPayload, true, (data) => {
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
