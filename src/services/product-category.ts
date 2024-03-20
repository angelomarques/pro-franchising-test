import { QueryParams } from "@/types/param";
import { ProductCategory } from "@prisma/client";
import { api } from "./api";

export const getProductCategories = async (
  params?: QueryParams
): Promise<ProductCategory[]> => {
  const { data: products } = await api.get<ProductCategory[]>(
    "/products/categories",
    {
      params,
    }
  );

  return products;
};
