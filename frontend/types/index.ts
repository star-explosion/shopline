export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  stock: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  orderId: number;
  status: string;
  totalPrice: number;
  items: OrderItem[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}
