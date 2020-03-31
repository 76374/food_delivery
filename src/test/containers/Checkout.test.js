import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../../store/reducers';
import { Provider } from 'react-redux';
import Checkout from '../../containers/Checkout/Checkout';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import Button from '../../components/Button/Button';
import AuthPopup from '../../components/Popups/AuthPopup/AuthPopup';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

describe('<Checkout/>', () => {
    const getState = () => {
        const orderedItems = [
            {
                categoryId: "category",
                itemId: "item",
                count: 1
            }
        ];
        const menuData = [
            {
                id: "category",
                title: "catTitle",
                items: [
                    {
                        id: "item",
                        title: "itemTitle",
                        price: 1,
                        dayAvailable: 1
                    }
                ]
            }
        ];
        return { 
            order: { orderedItems, menuData }
        };
    }
    const getStateWithAuth = () => {
        return {
            ...getState(),
            appState: {
                authData: {
                    firstName: 'first name',
                    lastName: 'last name'
                }
            }
        }
    }
    const getStore = state => (
        createStore(reducer, state, applyMiddleware(thunk))
    );
    const getWrapper = (mockStore = getStore(getState())) => mount(
        <Provider store={mockStore}>
            <Checkout />
        </Provider>
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
        const mockStore = getStore(getStateWithAuth());
        const wrapper = getWrapper(mockStore);
        wrapper.find(Button).last().simulate('click');
        expect(wrapper.exists(AuthPopup)).toBe(false);
    });

    it('should dispatch an action after submit', () => {
        const state = getStateWithAuth();
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