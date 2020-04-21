interface CategoryItem {
  id: string;
  title: string;
  items: MenuItem[]
}

interface MenuItem {
  id: string
  title: string;
  price: number;
}

export type { CategoryItem, MenuItem };
