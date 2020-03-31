
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStore } from 'redux';

Enzyme.configure({ adapter: new Adapter() });

describe('<Checkout/>', () => {
    //const mockStore = createStore
});