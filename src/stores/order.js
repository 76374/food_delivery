import { observable, action } from 'mobx';

export default class OrderStore {
  @observable
  menuData = [];

  @observable
  orderedItems = [];

  @observable
  orderSentSuccess = false;

  @action
  setMenuData(value) {
    this.menuData = value;
  }

  @action
  setOrderSentSuccess(value) {
    this.orderSentSuccess = value;
  }

  @action
  setOrderedItem(categoryId, itemId, count) {
    const index = this.orderedItems.findIndex(
      (el) => el.categoryId === categoryId && el.itemId === itemId
    );
    if (index === -1 && count === 0) {
      return;
    }
    if (index === -1) {
      this.orderedItems.push({ categoryId, itemId, count });
    } else if (count > 0) {
      this.orderedItems[index] = { categoryId, itemId, count };
    } else {
      this.orderedItems.splice(index, 1);
    }
    this.orderSentSuccess = false;
  }
}
