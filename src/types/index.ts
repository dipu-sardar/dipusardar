export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  video?: string;
  category: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
  documentation?: string;
  technologies?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
