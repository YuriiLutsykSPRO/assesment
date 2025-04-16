type ProductVariant = {
  color: string;
  size: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  variants: ProductVariant[];
};
