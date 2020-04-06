import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from 'enzyme';
import { getMenuData } from '../mockState';
import Order from '../../containers/Order/Order';
import reducer from '../../store/reducers';
import Category from '../../components/Category/Category';

describe('<Order />', () => {
  const menuData = getMenuData(1, 2, 3);
  const state = {
    order: {
      menuData,
      orderedItems: [],
    },
  };
  const getWrapper = (mockStore = createStore(reducer, state)) => mount(
    <Provider store={mockStore}>
      <Order />
    </Provider>,
  );

  it('should contain correct number of categories', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(Category)).toHaveLength(3);
  });
});
