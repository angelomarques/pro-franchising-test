import { CreateProductSchemaType } from "@/lib/schemas/createProduct";
import { UpdateProductSchemaType } from "@/lib/schemas/updateProduct";
import { ProductType } from "@/types/product";
import { api } from "./api";
import { QueryParams } from "@/types/param";

export const getProducts = async (
  params?: QueryParams
): Promise<ProductType[]> => {
  const { data: products } = await api.get<ProductType[]>("/products", {
    params,
  });

  return products;
};

export const getSingleProduct = async (
  productId: string
): Promise<ProductType> => {
  const { data: products } = await api.get<ProductType>(
    `/products/${productId}`
  );

  return products;
};

export const createProduct = async (payload: CreateProductSchemaType) => {
  await api.post("/products", payload);
};

export const updateProduct = async (
  productId: string,
  payload: UpdateProductSchemaType
) => {
  await api.patch(`/products/${productId}`, payload);
};

export const deleteProduct = async (productId: string) => {
  await api.delete(`/products/${productId}`);
};
