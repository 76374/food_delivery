class BackendPath {
    // static readonly SERVER_PATH: string = 'https://food-delivery-14fcc.firebaseio.com';
    static readonly SERVER_PATH: string = 'http://localhost:8080';
    static readonly MENU_PATH: string = `${BackendPath.SERVER_PATH}/api/graphql`;
    static readonly ORDERS_PATH: string = `${BackendPath.SERVER_PATH}/api/graphql`;
}
export default BackendPath;

