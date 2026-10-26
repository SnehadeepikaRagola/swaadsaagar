export type CategoryId =
  | 'starters'
  | 'breads'
  | 'veg-main'
  | 'non-veg-main'
  | 'biryani-rice'
  | 'south-indian'
  | 'indo-chinese'
  | 'desserts'
  | 'beverages';

export interface Category {
  id: CategoryId;
  name: string;
  telugu: string;
  tagline: string;
}

export interface MenuItem {
  id: string;
  name: string;
  telugu: string;
  description: string;
  price: number; // in INR
  category: CategoryId;
  image: string;
  veg: boolean;
  spicy: 0 | 1 | 2 | 3;
  popular?: boolean;
}

export interface CartLine {
  item: MenuItem;
  qty: number;
}
