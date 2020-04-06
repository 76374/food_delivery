import React from 'react';
import { shallow } from 'enzyme';
import Category from '../../components/Category/Category';
import MealCard from '../../components/Category/MealCard/MealCard';
import { getMenuData } from '../mockState';

describe('<Category/>', () => {
  const menuData = getMenuData(5);
  const catData = menuData[0];
  const wrapper = shallow(
    <Category
      items={catData.items}
      title={catData.title}
      orderedItems={[]}
    />,
  );

  it('should contain correct number of the items', () => {
    expect(wrapper.find(MealCard)).toHaveLength(5);
  });

  it('should have correct title', () => {
    expect(wrapper.find('h2').text()).toBe(menuData[0].title);
  });
});
