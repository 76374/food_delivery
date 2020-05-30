import RequestData from '../../dto/RequestData';
import Network from './Network';

const query = `
  query {
      menu {
      title
      items {
        id
        title
        price
      }
    }
  }
`;

const getRequest = (): RequestData => {
  return { query };
};

interface MenuResponse {
  menu: [
    {
      title: string;
      items: [
        {
          id: string;
          title: string;
          price: number;
        }
      ];
    }
  ];
}

const sendRequest = () => Network.post<MenuResponse>(getRequest());

export default sendRequest;
