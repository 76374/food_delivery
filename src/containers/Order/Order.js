import React from 'react';
import Category from '../../components/Category/Category';
import { orderedItemsCountChanged } from '../../store/actions/order';
import { useDispatch, useSelector } from 'react-redux';

const Order = () => {
    const menuData = useSelector(state => state.order.menuData);
    const orderedItems = useSelector(state => state.order.orderedItems);

    const dispatch = useDispatch();

    const onItemsCountChanged = (categoryId, itemId, count) => {
        dispatch(orderedItemsCountChanged(categoryId, itemId, count));
    }

    const categories = menuData.map((category, index) =>
        <Category
            items={category.items}
            title={category.title}
            key={'#category' + index}
            itemsCountChanged={(itemId, count) => { onItemsCountChanged(category.id, itemId, count); }}
            orderedItems={orderedItems.filter(item => item.categoryId === category.id)}
        />
    );
    return (
        <div>
            {categories}
        </div>
    );
}

export default Order;