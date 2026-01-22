
export enum Category {
  CUCINA = 'Cucina',
  SOGGIORNO = 'Soggiorno',
  DECORAZIONI = 'Decorazioni',
  ILLUMINAZIONE = 'Illuminazione',
  TESSILI = 'Tessili'
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  description: string;
  image: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  date: string;
}

export type ViewType = 'dashboard' | 'inventory' | 'sales' | 'ai-consultant';
