import useStore from './useStore';
import axios from 'axios';
import { useCallback } from 'react';
import BackendPath from '../const/BackendPath';
import { getMenuData } from '../utils/dataConvert';

const query = {
  query: `
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
  `,
};

const useInitMenu = () => {
  const PROCESS_ID: string = 'init_menu';
  const { appState, order } = useStore();

  return useCallback(() => {
    appState.addProcess(PROCESS_ID);

    axios
      .post(BackendPath.MENU_PATH, query)
      .then((response) => {
        if (response.data.errors && response.data.errors.length) {
          appState.setError(response.data.errors[0].message);
        } else {
          order.setMenuData(getMenuData(response.data.data))
        }
      })
      .catch((error) => {
        appState.setError(error.message);
      })
      .then(() => {
        appState.removeProcess(PROCESS_ID);
      });
  }, [appState, order]);
};

export default useInitMenu;
