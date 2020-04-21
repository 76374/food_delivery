import { observable, action } from 'mobx';
import { CategoryItem } from '../dto/MenuData';
import OrderedItem from '../dto/OrderedItem';

export default class OrderStore {
  @observable
  private _menuData: CategoryItem[] = [];

  @observable
  private _orderedItems: OrderedItem[] = [];

  @observable
  private _orderSentSuccess: boolean = false;

  getCategoryItem(id: string): CategoryItem | null {
    return this._menuData.find((c) => c.id === id) || null;
  }

  get containsMenuData() {
    return this._menuData && this._menuData.length > 0;
  }

  get menuData(): CategoryItem[] {
    return this._menuData;
  }

  @action
  setMenuData(value: CategoryItem[]): void {
    this._menuData = value;
  }

  get orderSentSuccess(): boolean {
    return this._orderSentSuccess;
  }

  @action
  setOrderSentSuccess(value: boolean): void {
    this._orderSentSuccess = value;
  }

  get orderedItems(): OrderedItem[] {
    return this._orderedItems;
  }

  get containsOrderedItems(): boolean {
    return this._orderedItems && this._orderedItems.length > 0;
  }

  getOrderedItemsForCategory(categoryId: string): OrderedItem[] {
    return this._orderedItems.filter((item) => item.categoryId === categoryId);
  }

  getOrderedItemById(id: string): OrderedItem | null {
    return this._orderedItems.find((orderedItem) => orderedItem.itemId === id) || null;
  }

  @action
  clearOrderItems(): void {
    this._orderedItems = [];
  }

  @action
  setOrderedItem(categoryId: string, itemId: string, count: number): void {
    const index: number = this._orderedItems.findIndex(
      (el) => el.categoryId === categoryId && el.itemId === itemId
    );
    if (index === -1 && count === 0) {
      return;
    }
    if (index === -1) {
      this._orderedItems.push({ categoryId, itemId, count });
    } else if (count > 0) {
      this._orderedItems[index] = { categoryId, itemId, count };
    } else {
      this._orderedItems.splice(index, 1);
    }
    this._orderSentSuccess = false;
  }
}
