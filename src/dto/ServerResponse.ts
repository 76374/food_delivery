interface MenuResponse {
    [propName: string]: MenuCategory;
}

interface MenuCategory {
    title: string;
    items: CategoryItems;
}

interface CategoryItems {
    [propName: string]: MenuItem;
}

interface MenuItem {
    title: string;
    price: number;
}

export type { MenuResponse, MenuCategory, CategoryItems, MenuItem};