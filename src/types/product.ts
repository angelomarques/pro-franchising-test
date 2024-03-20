import { Product, ProductCategory } from "@prisma/client";

export interface FakeStoreProductType {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ProductType extends Product {
  category: ProductCategory;
}
