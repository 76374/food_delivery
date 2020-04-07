import axios from 'axios';
import { MENU_RECEIVED, ORDERED_ITEMS_COUNT_CHANGED, ORDER_SENT_SUCCESS } from '../actionTypes';
import { getOrederRequest, getMenuData } from '../utils/data';
import { processAdded, processRemoved, errorOccured } from './appState';
import useStore from '../../stores/useStore';

const SERVER_PATH = 'https://food-delivery-14fcc.firebaseio.com';
const MENU_PATH = `${SERVER_PATH}/menu.json`;
const ORDERS_PATH = `${SERVER_PATH}/orders.json`;

const menuReceived = (serverData) => ({
  type: MENU_RECEIVED,
  payload: serverData,
});

const orderSentSuccess = () => ({
  type: ORDER_SENT_SUCCESS,
});

export const initMenu = () => (dispatch) => {
  const PROCESS_ID = 'init_menu';
  dispatch(processAdded(PROCESS_ID));
  axios.get(MENU_PATH, { cache: false })
    .then((response) => {

      const { order } = useStore();
      order.setMenuData(getMenuData(response.data));

      dispatch(menuReceived(response.data));
    })
    .catch((error) => {
      dispatch(errorOccured(error.message));
    })
    .then(() => {
      dispatch(processRemoved(PROCESS_ID));
    });
};

export const orderedItemsCountChanged = (categoryId, itemId, count) => ({
  type: ORDERED_ITEMS_COUNT_CHANGED,
  payload: { categoryId, itemId, count },
});

export const orderConfirmed = (orderData) => (dispatch) => {
  const PROCESS_ID = 'order';
  dispatch(processAdded(PROCESS_ID));
  axios.post(ORDERS_PATH, getOrederRequest(orderData))
    .then((/* response */) => {
      dispatch(orderSentSuccess());
    })
    .catch((error) => {
      dispatch(errorOccured(error.message));
    })
    .then(() => {
      dispatch(processRemoved(PROCESS_ID));
    });
};
