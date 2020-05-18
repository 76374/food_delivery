import * as ServerData from '../dto/ServerResponse';
import { CategoryItem } from '../dto/MenuData';
import OrderedItem from '../dto/OrderedItem';
import * as ServerRequest from '../dto/ServerRequest';

export const getMenuData = (serverData: ServerData.MenuResponse) => {
  const result: CategoryItem[] = serverData.menu.map((cat) => ({
    id: cat.title,
    title: cat.title,
    items: [...cat.items],
  }));
  return result;
};

export const getOrderRequest = (orderedItems: OrderedItem[]) => {
  const result: ServerRequest.OrderRequest = {};
  orderedItems.forEach((orderedItem) => {
    const catId = orderedItem.categoryId;
    if (result[catId] === undefined) {
      result[catId] = {};
    }
    result[catId][orderedItem.itemId] = orderedItem.count;
  });
  return result;
};
