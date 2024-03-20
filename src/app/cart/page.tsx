"use client";

import { ProductItem } from "@/components/product-item";
import { useSession } from "next-auth/react";

import { Button } from "@/components/button";
import { useCartStore } from "@/stores/cart";
import { formatToBRLCurrency } from "@/utils/currency";
import Link from "next/link";
import styles from "./page.module.css";

export default function Cart() {
  const { data: session, status } = useSession();
  const { products } = useCartStore();

  const totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);

  if (status === "loading") return <p>Loading...</p>;

  if (!session) return null;

  return (
    <div className={styles.container}>
      <header>
        <h1>Carrinho</h1>

        <div>
          <p>Subtotal: {formatToBRLCurrency(totalPrice)}</p>
          <Link href="/pdv">
            <Button variant="outline">Voltar ao PDV</Button>
          </Link>
        </div>
      </header>
      <main>
        {products?.length
          ? products.map((item) => (
              <ProductItem hideButtons product={item} key={item.id} />
            ))
          : "Sem produtos"}
      </main>
    </div>
  );
}
