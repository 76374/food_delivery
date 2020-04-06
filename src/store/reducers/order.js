import { MENU_RECEIVED, ORDERED_ITEMS_COUNT_CHANGED, ORDER_SENT_SUCCESS } from '../actionTypes';
import { combineObjects } from '../utils';
import { getMenuData } from '../utils/data';

const initialState = {
  menuData: null,
  orderedItems: [],
  orderSentSuccess: false,
};

const menuReceivedState = (state, serverData) => combineObjects(state, getMenuData(serverData));

const orderedItemsCountChanged = (state, categoryId, itemId, count) => {
  const index = state.orderedItems.findIndex(
    (el) => el.categoryId === categoryId && el.itemId === itemId,
  );
  if (index === -1 && count === 0) {
    return state;
  }
  const orderedItems = [...state.orderedItems];
  if (index === -1) {
    orderedItems.push({ categoryId, itemId, count });
  } else if (count > 0) {
    orderedItems[index].count = count;
  } else {
    orderedItems.splice(index, 1);
  }
  return combineObjects(state, {
    orderedItems,
    orderSentSuccess: false,
  });
};

const orderSentSuccess = (state) => combineObjects(state, {
  orderSentSuccess: true,
  orderedItems: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
  case MENU_RECEIVED:
    return menuReceivedState(state, action.payload);
  case ORDERED_ITEMS_COUNT_CHANGED:
    return orderedItemsCountChanged(
      state,
      action.payload.categoryId,
      action.payload.itemId,
      action.payload.count,
    );
  case ORDER_SENT_SUCCESS:
    return orderSentSuccess(state);
  default:
    return state;
  }
};
