interface OrderRequest {
    [categoryId: string]: MenuItem;
}

interface MenuItem {
    [itemId: string]: number;
}

export type { OrderRequest, MenuItem };