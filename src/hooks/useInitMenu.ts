import useStore from './useStore';
import axios from 'axios';
import { getMenuData } from '../utils/dataConvert';
import { useCallback } from 'react';
import BackendPath from '../const/BackendPath';

const useInitMenu = () => {
  const PROCESS_ID: string = 'init_menu';
  const { appState, order } = useStore();

  return useCallback(() => {
    appState.addProcess(PROCESS_ID);

    axios
      .get(BackendPath.MENU_PATH)
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
