import * as ServerData from "../dto/ServerResponse";
import { CategoryItem, MenuItem } from "../dto/MenuData";
import OrderedItem from "../dto/OrderedItem";
import * as ServerRequest from "../dto/ServerRequest";

const getMenuItems = (serverItems: ServerData.CategoryItems) => {
  const result: MenuItem[] = [];
  for (let key in serverItems) {
    result.push({
      id: key,
      title: serverItems[key].title,
      price: serverItems[key].price
    });
  }
  return result;
}

export const getMenuData = (serverData: ServerData.MenuResponse) => {
  const result: CategoryItem[] = [];
  for (let key in serverData) {
    result.push({
      id: key,
      title: serverData[key].title,
      items: getMenuItems(serverData[key].items)
    });
  }
  return result;
}

export const getOrederRequest = (orderedItems: OrderedItem[]) => {
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
