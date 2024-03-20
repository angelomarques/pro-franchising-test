import { CreateProductForm } from "./form";

import styles from "./page.module.css";

export default function CreateProductPage() {
  return (
    <main className={styles.container}>
      <h1>Criar Novo Produto</h1>

      <CreateProductForm />
    </main>
  );
}
