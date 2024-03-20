"use client";

import { deleteProduct as deleteProductService } from "@/services/product";
import { ProductType } from "@/types/product";
import { formatToBRLCurrency } from "@/utils/currency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "../button";
import styles from "./product-item.module.css";
import { useCartStore } from "@/stores/cart";

interface Props {
  product: ProductType;
  isSalePage?: boolean;
  hideButtons?: boolean;
}

export const ProductItem = ({
  product,
  isSalePage = false,
  hideButtons = false,
}: Props) => {
  const { title, category, price, id } = product;
  const queryClient = useQueryClient();

  const { addToCart, removeFromCart, products } = useCartStore();

  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductService,
    onSuccess: () => {
      toast.success("Usuário removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Ocorreu um erro! Tente novament mais tarde.");
    },
  });

  const isInCart = Boolean(products.find((item) => item.id === product.id));
  const SalePageButton = isInCart ? (
    <Button variant="outline" onClick={() => removeFromCart(product.id)}>
      Remover do carrinho
    </Button>
  ) : (
    <Button variant="outline" onClick={() => addToCart(product)}>
      Adicionar ao carrinho
    </Button>
  );

  return (
    <article className={styles.container}>
      <picture>
        <Image
          src={product.image}
          layout="fill"
          alt={title}
          objectFit="cover"
        />
      </picture>
      <div className={styles.text}>
        <h2>{title}</h2>
        <p>Categoria: {category.title}</p>
        <p>{formatToBRLCurrency(price)}</p>
        {!hideButtons && (
          <div>
            {isSalePage ? (
              SalePageButton
            ) : (
              <>
                <Link href={`products/${id}/edit`}>
                  <Button variant="outline">
                    <Pencil />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => deleteProduct(id)}>
                  <Trash />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
