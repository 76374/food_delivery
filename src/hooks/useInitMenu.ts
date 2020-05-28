import useStore from './useStore';
import { useCallback } from 'react';
import { MenuResponse } from '../dto/ServerResponse';
import { CategoryItem } from '../dto/MenuData';
import useApiCall from './apiCall';

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

export const getMenuData = (serverData: MenuResponse) => {
  const result: CategoryItem[] = serverData.menu.map((cat) => ({
    id: cat.title,
    title: cat.title,
    items: [...cat.items],
  }));
  return result;
};

const useInitMenu = () => {
  const { order } = useStore();
  const apiCall = useApiCall();

  return useCallback(() => {
    const requestPayload = {
      query,
    };
    apiCall(requestPayload, false, (data) => {
      order.setMenuData(getMenuData(data));
    });
  }, [order, apiCall]);
};

export default useInitMenu;
