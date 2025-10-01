export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Transaction {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  paymentMethod: string;
  paymentStatus: string;
}
