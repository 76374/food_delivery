import React from 'react';
import { shallow } from 'enzyme';
import MealCard from "../../components/Category/MealCard/MealCard";
import Button from '../../components/Button/Button';

describe('<MealCard/>', () => {
    const wrapper = shallow(<MealCard
        title={'card title'}
        price={5}
        itemsCountChanged={() => {}}
        orderedCount={0}
    />);

    it('should contain 1 button for not ordered', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });

    it('should contain 2 button for ordered', () => {
        wrapper.setProps({ orderedCount: 1 });
        expect(wrapper.find(Button)).toHaveLength(2);
    });

    it('should decrease items count on remove bt click', () => {
        const itemsCountChanged = jest.fn();
        wrapper.setProps({ itemsCountChanged });
        wrapper.find(Button).at(0).simulate('click');
        expect(itemsCountChanged).toHaveBeenCalledWith(0);
    });

    it('should icrease items count on add bt click', () => {
        const itemsCountChanged = jest.fn();
        wrapper.setProps({ itemsCountChanged });
        wrapper.find(Button).at(1).simulate('click');
        expect(itemsCountChanged).toHaveBeenCalledWith(2);
    });
})