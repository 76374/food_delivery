import RequestData from '../../dto/RequestData';
import OrderedItem from '../../dto/OrderedItem';
import Network from './Network';

const query = `
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
    }
  }
`;

const getRequest = (orderedItems: OrderedItem[], token: string): RequestData => {
  return {
    query,
    token,
    variables: {
      input: {
        items: orderedItems.map((i) => ({ itemId: i.itemId, itemsCount: i.count })),
      },
    },
  };
};

interface OrderSentResponse {
  createOrder: {
    id: string;
  };
}

const sendRequest = (orderedItems: OrderedItem[], token: string) =>
  Network.post<OrderSentResponse>(getRequest(orderedItems, token));

export default sendRequest;
