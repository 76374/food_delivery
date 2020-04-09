import useStore from './useStore';
import axios from 'axios';
import { MENU_PATH } from '../data/backendPaths';
import { getMenuData } from '../utils/data';
import { useCallback } from 'react';

const useInitMenu = () => {
  const PROCESS_ID = 'init_menu';
  const { appState, order } = useStore();

  return useCallback(() => {
    appState.addProcess(PROCESS_ID);

    axios
      .get(MENU_PATH, { cache: false })
      .then((response) => {
        order.setMenuData(getMenuData(response.data));
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
