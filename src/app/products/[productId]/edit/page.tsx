"use client";

import { getSingleProduct } from "@/services/product";

import styles from "./page.module.css";
import { UpdateProductForm } from "./form";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: {
    productId: string;
  };
}

export default function EditProductPage({ params }: Props) {
  const { data: product } = useQuery({
    queryKey: ["products", params.productId],
    queryFn: () => getSingleProduct(params.productId),
  });

  return (
    <main className={styles.container}>
      <h1>Editar Produto</h1>

      {product ? (
        <UpdateProductForm productId={params.productId} product={product} />
      ) : (
        "Loading..."
      )}
    </main>
  );
}
