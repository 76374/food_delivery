class BackendPath {
    static readonly SERVER_PATH: string = 'https://food-delivery-14fcc.firebaseio.com';
    static readonly MENU_PATH: string = `${BackendPath.SERVER_PATH}/menu.json`;
    static readonly ORDERS_PATH: string = `${BackendPath.SERVER_PATH}/orders.json`;
}
export default BackendPath;

