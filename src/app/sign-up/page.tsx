import { SignUpForm } from "./form";

import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={styles.container}>
      <h1>Cadastrar na plataforma</h1>

      <SignUpForm />
    </main>
  );
}
