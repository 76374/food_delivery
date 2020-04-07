import { observable, action } from 'mobx';

export default class OrderStore {
  @observable
  menuData = null;

  @observable
  orderedItems = [];

  @observable
  orderSentSuccess = false;

  @action
  setMenuData(value) {
    this.menuData = value;
  }
}
