import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from '../../store/reducers';
import Checkout from '../../containers/Checkout/Checkout';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import Button from '../../components/Button/Button';
import AuthPopup from '../../components/Popups/AuthPopup/AuthPopup';
import {
  getMenuData, getOrderedItems, getOrderArgs, addAuth,
} from '../mockState';

describe('<Checkout/>', () => {
  const getState = () => ({
    order: {
      menuData: getMenuData(1),
      orderedItems: getOrderedItems(getOrderArgs(0, 0, 1)),
    },
  });
  const getStore = (state) => (
    createStore(reducer, state, applyMiddleware(thunk))
  );
  const getWrapper = (mockStore = getStore(getState())) => mount(
    <Provider store={mockStore}>
      <Checkout />
    </Provider>,
  );

  it('should contain an item and total price', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(CheckoutItem)).toHaveLength(2);
  });

  it('should show auth popup', () => {
    const wrapper = getWrapper();
    wrapper.find(Button).last().simulate('click');
    expect(wrapper.exists(AuthPopup)).toBe(true);
  });

  it('shouldn\'t show auth popup', () => {
    const state = getState();
    addAuth(state);
    const mockStore = getStore(state);
    const wrapper = getWrapper(mockStore);
    wrapper.find(Button).last().simulate('click');
    expect(wrapper.exists(AuthPopup)).toBe(false);
  });

  it('should dispatch an action after submit', () => {
    const state = getState();
    addAuth(state);
    const mockStore = getStore(state);
    mockStore.dispatch = jest.fn();
    const wrapper = getWrapper(mockStore);
    wrapper.find(Button).last().simulate('click');
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should remove an item and total price', () => {
    const wrapper = getWrapper();
    wrapper.find(Button).first().simulate('click');
    expect(wrapper.exists(CheckoutItem)).toBe(false);
  });

  it('should decrease items count', () => {
    const state = getState();
    state.order.orderedItems[0].count = 2;
    const wrapper = getWrapper(getStore(state));
    wrapper.find(Button).first().simulate('click');
    expect(wrapper.find(CheckoutItem)).toHaveLength(2);
  });
});
