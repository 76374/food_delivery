interface MenuResponse {
  menu: [MenuCategory];
}

interface MenuCategory {
  title: string;
  items: [MenuItem];
}

interface MenuItem {
  id: string;
  title: string;
  price: number;
}

interface Order {
  id: string;
}

export type { MenuResponse, MenuCategory, MenuItem };
