"use client";

import { ProductItem } from "@/components/product-item";
import { getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import styles from "./page.module.css";
import { Button } from "@/components/button";
import Link from "next/link";

export default function Pdv() {
  const { data: session, status } = useSession();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });

  if (status === "loading" || isLoading) return <p>Loading...</p>;

  if (!session) return null;

  return (
    <div className={styles.container}>
      <header>
        <h1>Lista de Produtos</h1>

        <div>
          <Link href="/cart">
            <Button>Acessar Carrinho</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Acessar Dashboard</Button>
          </Link>
        </div>
      </header>
      <main>
        {products?.length
          ? products.map((item) => (
              <ProductItem isSalePage product={item} key={item.id} />
            ))
          : "Sem produtos"}
      </main>
    </div>
  );
}
