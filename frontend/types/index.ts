export interface Product {
  id: number;
  code?: string | null;
  name: string;
  nameEn?: string;
  nameJa?: string;
  description: string;
  descriptionEn?: string;
  descriptionJa?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category?: string;
  subcategory?: string;
  specifications?: Record<string, unknown>;
  features?: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating?: number;
  reviewCount?: number;
  warranty?: string;
  deliveryTime?: string;
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
