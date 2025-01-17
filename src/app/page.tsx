"use client";

import { ProductItem } from "@/components/product-item";
import { getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";

import styles from "./page.module.css";
import { Button } from "@/components/button";
import Link from "next/link";

export default function Home() {
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
          <Link href="/products/create">
            <Button variant="outline">Criar Produto</Button>
          </Link>
          <Link href="/pdv">
            <Button>Acessar PDV</Button>
          </Link>
          <Button onClick={() => signOut()}>Sair da plataforma</Button>
        </div>
      </header>
      <main>
        {products?.length
          ? products.map((item) => <ProductItem product={item} key={item.id} />)
          : "Sem produtos"}
      </main>
    </div>
  );
}
