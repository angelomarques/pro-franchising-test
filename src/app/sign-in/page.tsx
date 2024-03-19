import Link from "next/link";
import { SignInForm } from "./form";

import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <main className={styles.container}>
      <h1>Entrar na plataforma</h1>

      <SignInForm />

      <p>
        Não tem um cadastro? <Link href="sign-up">Cadastra-se agora!</Link>
      </p>
    </main>
  );
}
